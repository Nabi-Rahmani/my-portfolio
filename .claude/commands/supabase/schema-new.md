---
description: Generate Supabase PostgreSQL schema with RLS policies, triggers, and enums
model: claude-sonnet-4-5
---

Create a clean, production-ready Supabase database schema following best practices.

## Schema Specification

$ARGUMENTS

---

## 1. Schema File Structure

```
supabase/
├── setup.sql              # Core tables, RLS, triggers (run first)
├── dashboard-setup.sql    # Admin roles, permissions (optional)
├── seed.sql               # Test data for local development
└── migrations/            # Incremental changes (supabase db diff)
```

---

## 2. Core Table Template

Every table should follow this structure:

```sql
-- ================================================
-- TABLE: <table_name>
-- ================================================
CREATE TABLE public.<table_name> (
  -- Primary key
  id uuid NOT NULL DEFAULT gen_random_uuid(),

  -- Foreign key to user (if user-owned)
  user_id uuid NOT NULL,

  -- Timestamps
  creation_date timestamp with time zone NOT NULL DEFAULT now(),
  last_update_date timestamp with time zone NOT NULL DEFAULT now(),

  -- Table-specific columns
  -- ...

  -- Constraints
  CONSTRAINT <table_name>_pkey PRIMARY KEY (id),
  CONSTRAINT <table_name>_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES auth.users (id) ON UPDATE CASCADE ON DELETE CASCADE
) TABLESPACE pg_default;
```

---

## 3. Enums (Define Before Tables)

```sql
-- ================================================
-- ENUMS
-- ================================================

-- Subscription status
CREATE TYPE sub_status AS ENUM ('ACTIVE', 'PAUSED', 'EXPIRED', 'LIFETIME');

-- Store type (for IAP)
CREATE TYPE store_type AS ENUM ('PLAY_STORE', 'APPLE_STORE');

-- Notification status
CREATE TYPE notification_status AS ENUM ('scheduled', 'sent', 'failed');

-- App roles (for admin)
CREATE TYPE app_role AS ENUM ('admin', 'moderator');
CREATE TYPE app_permission AS ENUM ('admin_all', 'read_only');
```

---

## 4. Row Level Security (RLS) Patterns

### Pattern A: User Owns Data

```sql
-- Enable RLS
ALTER TABLE public.<table_name> ENABLE ROW LEVEL SECURITY;

-- SELECT: User can read own data
CREATE POLICY "Users can select own <table_name>"
ON public.<table_name>
FOR SELECT USING (auth.uid() = user_id);

-- INSERT: User can insert own data
CREATE POLICY "Users can insert own <table_name>"
ON public.<table_name>
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- UPDATE: User can update own data
CREATE POLICY "Users can update own <table_name>"
ON public.<table_name>
FOR UPDATE USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- DELETE: User can delete own data
CREATE POLICY "Users can delete own <table_name>"
ON public.<table_name>
FOR DELETE USING (auth.uid() = user_id);
```

### Pattern B: Public Read, Owner Write

```sql
ALTER TABLE public.<table_name> ENABLE ROW LEVEL SECURITY;

-- Anyone can read
CREATE POLICY "Public read access"
ON public.<table_name>
FOR SELECT USING (true);

-- Only owner can write
CREATE POLICY "Owner can insert"
ON public.<table_name>
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owner can update"
ON public.<table_name>
FOR UPDATE USING (auth.uid() = user_id);
```

### Pattern C: User + Admin Access

```sql
-- First, create authorize function (see Admin Setup section)

ALTER TABLE public.<table_name> ENABLE ROW LEVEL SECURITY;

-- User or admin can select
CREATE POLICY "Users or admin can select"
ON public.<table_name>
FOR SELECT USING (
  auth.uid() = user_id
  OR (SELECT authorize('admin_all'))
);

-- Only admin can insert
CREATE POLICY "Admin can insert"
ON public.<table_name>
FOR INSERT WITH CHECK ((SELECT authorize('admin_all')));
```

---

## 5. Auth Triggers (User Profile Sync)

```sql
-- ================================================
-- AUTO-CREATE USER PROFILE
-- ================================================

-- Users table
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  creation_date timestamp with time zone NOT NULL DEFAULT now(),
  last_update_date timestamp without time zone NULL,
  name varchar NULL,
  email varchar NULL,
  avatar_url text NULL,
  onboarded boolean NOT NULL DEFAULT false,

  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_id_key UNIQUE (id)
) TABLESPACE pg_default;

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users are viewable by everyone"
ON public.users FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile"
ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.users FOR UPDATE USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Trigger: Create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, name, avatar_url, email)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'avatar_url',
    new.email
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Trigger: Sync email changes
CREATE OR REPLACE FUNCTION public.handle_update_user()
RETURNS trigger AS $$
BEGIN
  UPDATE public.users
  SET email = NEW.email,
      last_update_date = now()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_update_user();
```

---

## 6. Admin Role System

```sql
-- ================================================
-- ADMIN ROLE SETUP (dashboard-setup.sql)
-- ================================================

-- Role tables
CREATE TABLE public.user_roles (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
COMMENT ON TABLE public.user_roles IS 'Application roles for each user.';

CREATE TABLE public.role_permissions (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  role app_role NOT NULL,
  permission app_permission NOT NULL,
  UNIQUE (role, permission)
);
COMMENT ON TABLE public.role_permissions IS 'Application permissions for each role.';

-- Seed admin permission
INSERT INTO public.role_permissions (role, permission)
VALUES ('admin', 'admin_all');

-- JWT Claims Hook (adds user_role to token)
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql STABLE AS $$
DECLARE
  claims jsonb;
  user_role public.app_role;
BEGIN
  SELECT role INTO user_role
  FROM public.user_roles
  WHERE user_id = (event->>'user_id')::uuid;

  claims := event->'claims';

  IF user_role IS NOT NULL THEN
    claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
  ELSE
    claims := jsonb_set(claims, '{user_role}', 'null');
  END IF;

  event := jsonb_set(event, '{claims}', claims);
  RETURN event;
END;
$$;

-- Grant permissions for auth hook
GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;
REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook FROM authenticated, anon, public;
GRANT ALL ON TABLE public.user_roles TO supabase_auth_admin;
REVOKE ALL ON TABLE public.user_roles FROM authenticated, anon, public;

CREATE POLICY "Allow auth admin to read user roles"
ON public.user_roles
AS PERMISSIVE FOR SELECT
TO supabase_auth_admin
USING (true);

-- Authorization helper function
CREATE OR REPLACE FUNCTION public.authorize(requested_permission app_permission)
RETURNS boolean AS $$
DECLARE
  bind_permissions int;
  user_role public.app_role;
BEGIN
  SELECT (auth.jwt() ->> 'user_role')::public.app_role INTO user_role;

  SELECT count(*) INTO bind_permissions
  FROM public.role_permissions
  WHERE role_permissions.permission = requested_permission
    AND role_permissions.role = user_role;

  RETURN bind_permissions > 0;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = '';
```

---

## 7. Storage Buckets

```sql
-- ================================================
-- STORAGE SETUP
-- ================================================

-- Create bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', false);

-- Public read
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Authenticated upload
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- Owner update
CREATE POLICY "Users can update own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars')
WITH CHECK (auth.uid()::text = owner_id);

-- Owner delete
CREATE POLICY "Users can delete own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = owner_id);
```

---

## 8. Counter Triggers (Voting Example)

```sql
-- ================================================
-- FEATURE VOTING WITH AUTO-INCREMENT
-- ================================================

CREATE TABLE public.feature_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creation_date timestamp with time zone NOT NULL DEFAULT now(),
  title jsonb NOT NULL,  -- {en: "title", fr: "titre"}
  description jsonb NOT NULL,
  votes smallint NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true
) TABLESPACE pg_default;

CREATE TABLE public.feature_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creation_date timestamp with time zone NOT NULL DEFAULT now(),
  user_uid uuid NOT NULL,
  feature_id uuid NOT NULL,

  CONSTRAINT user_uid_fkey FOREIGN KEY (user_uid)
    REFERENCES auth.users (id) ON DELETE CASCADE,
  CONSTRAINT feature_id_fkey FOREIGN KEY (feature_id)
    REFERENCES public.feature_requests (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Increment on vote insert
CREATE OR REPLACE FUNCTION increment_feature_request_value()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE feature_requests
  SET votes = votes + 1
  WHERE id = NEW.feature_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER after_feature_vote_insert
AFTER INSERT ON feature_votes
FOR EACH ROW EXECUTE FUNCTION increment_feature_request_value();

-- Decrement on vote delete
CREATE OR REPLACE FUNCTION decrement_feature_request_value()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE feature_requests
  SET votes = votes - 1
  WHERE id = OLD.feature_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER after_feature_vote_delete
AFTER DELETE ON feature_votes
FOR EACH ROW EXECUTE FUNCTION decrement_feature_request_value();

-- RLS
ALTER TABLE public.feature_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view features"
ON public.feature_requests FOR SELECT USING (true);

CREATE POLICY "Users can vote"
ON public.feature_votes FOR INSERT
WITH CHECK (auth.uid() = user_uid);

CREATE POLICY "Users can remove vote"
ON public.feature_votes FOR DELETE
USING (auth.uid() = user_uid);

CREATE POLICY "Users can see own votes"
ON public.feature_votes FOR SELECT
USING (auth.uid() = user_uid);
```

---

## 9. Common Tables

### Devices (Push Notifications)

```sql
CREATE TABLE public.devices (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  creation_date timestamp with time zone NOT NULL DEFAULT now(),
  last_update_date timestamp with time zone NOT NULL DEFAULT now(),
  installation_id text NOT NULL,
  token text NOT NULL,
  operating_system text NOT NULL,

  CONSTRAINT devices_pkey PRIMARY KEY (id),
  CONSTRAINT devices_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES auth.users (id) ON DELETE CASCADE
) TABLESPACE pg_default;
```

### Notifications

```sql
CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  body text NOT NULL,
  data jsonb NULL,
  type text NULL,
  creation_date timestamp with time zone NOT NULL DEFAULT now(),
  read_date timestamp with time zone NULL,

  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES auth.users (id) ON DELETE CASCADE
) TABLESPACE pg_default;
```

### Subscriptions

```sql
CREATE TABLE public.subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  creation_date timestamp with time zone NOT NULL DEFAULT now(),
  last_update_date timestamp with time zone NOT NULL,
  period_end_date timestamp with time zone NULL,
  status sub_status NOT NULL,
  store store_type NULL,
  sku_id text NOT NULL,

  CONSTRAINT subscriptions_pkey PRIMARY KEY (id),
  CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES auth.users (id) ON DELETE CASCADE
) TABLESPACE pg_default;
```

---

## 10. Deployment Commands

```bash
# Local development
supabase start
supabase db reset  # Runs setup.sql + seed.sql

# Apply to remote
supabase db push

# Generate migration from changes
supabase db diff -f <migration_name>

# Run specific SQL file
psql -h localhost -p 54322 -U postgres -d postgres -f setup.sql
```

---

## Key Rules

### ✅ DO:
1. Always enable RLS on user-facing tables
2. Use `gen_random_uuid()` for IDs
3. Include `creation_date` and `last_update_date`
4. Use `ON DELETE CASCADE` for user references
5. Use `SECURITY DEFINER` for trigger functions
6. Comment complex tables/functions
7. Use enums for fixed value sets

### ❌ DON'T:
1. Skip RLS on any table
2. Use `serial` for IDs (use uuid)
3. Hardcode user IDs
4. Forget foreign key constraints
5. Use raw SQL strings in app code
