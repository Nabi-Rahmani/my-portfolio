---
description: Create a new Supabase Edge Function with Deno following CodeWithNabi standards
model: claude-sonnet-4-5
---

Create a new Supabase Edge Function using the modular "Core" pattern and modern Deno.serve syntax.

## Function Specification

$ARGUMENTS

## Architecture Overview

```
supabase/functions/
├── _core/                      # Shared logic across all functions
│    ├── models/                # Domain models (logic)
│    ├── repositories/          # Supabase-js data access
│    ├── entities/              # DB row definitions (interfaces)
│    ├── services/              # Third-party API wrappers (FCM, Stripe, etc.)
│    └── utils/                 # Helpers, validation
├── <function_name>/
│    └── index.ts               # Deno.serve entry point
└── import_map.json             # Global dependency management
```

## Common Flutter Use Cases

Edge Functions are perfect for:
- **Push Notifications** - Send FCM/APNs from server
- **Webhooks** - RevenueCat, Stripe, payment providers
- **Scheduled Jobs** - Daily reports, cleanup tasks
- **Sensitive Operations** - Keep API keys server-side
- **Data Aggregation** - Complex queries, analytics
- **Third-Party APIs** - Wrap external services

## 1. Initialize Function

```bash
# Create new function
npx supabase functions new <function_name>

# Local development
npx supabase functions serve <function_name> --env-file .env.local
```

## 2. Function Templates

### Basic Function (index.ts)

```typescript
// supabase/functions/<function_name>/index.ts
import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get auth user from JWT (passed from Flutter)
    const authHeader = req.headers.get("Authorization");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader ?? "" } } }
    );

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    const body = await req.json();

    // Business logic here...

    return new Response(
      JSON.stringify({ success: true, data: {} }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
```

### Webhook Handler (RevenueCat Example)

```typescript
// supabase/functions/revenuecat-webhook/index.ts
import { createClient } from "@supabase/supabase-js";

Deno.serve(async (req) => {
  try {
    // Verify webhook signature
    const authHeader = req.headers.get("Authorization");
    const expectedToken = Deno.env.get("REVENUECAT_WEBHOOK_TOKEN");

    if (authHeader !== `Bearer ${expectedToken}`) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Use service role to bypass RLS
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const event = await req.json();

    // Handle subscription events
    switch (event.event.type) {
      case "INITIAL_PURCHASE":
      case "RENEWAL":
        await supabase
          .from("subscriptions")
          .upsert({
            user_id: event.event.app_user_id,
            product_id: event.event.product_id,
            expires_at: event.event.expiration_at_ms,
            is_active: true,
          });
        break;

      case "CANCELLATION":
      case "EXPIRATION":
        await supabase
          .from("subscriptions")
          .update({ is_active: false })
          .eq("user_id", event.event.app_user_id);
        break;
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
```

### Push Notification Function (FCM)

```typescript
// supabase/functions/send-push/index.ts
import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PushPayload {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { userId, title, body, data }: PushPayload = await req.json();

    // Get user's FCM token from database
    const { data: userData } = await supabase
      .from("user_devices")
      .select("fcm_token")
      .eq("user_id", userId)
      .single();

    if (!userData?.fcm_token) {
      return new Response(
        JSON.stringify({ error: "No FCM token found" }),
        { status: 404, headers: corsHeaders }
      );
    }

    // Send via FCM HTTP v1 API
    const fcmResponse = await fetch(
      `https://fcm.googleapis.com/v1/projects/${Deno.env.get("FIREBASE_PROJECT_ID")}/messages:send`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${await getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            token: userData.fcm_token,
            notification: { title, body },
            data: data ?? {},
          },
        }),
      }
    );

    return new Response(
      JSON.stringify({ success: fcmResponse.ok }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});

// Helper to get Firebase access token
async function getAccessToken(): Promise<string> {
  // Use service account credentials
  // Implementation depends on your auth setup
}
```

### Database Trigger Function

```typescript
// supabase/functions/on-new-sale/index.ts
// Called via Database Webhook when new sale is inserted

import { createClient } from "@supabase/supabase-js";

Deno.serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Payload from database webhook
    const { record, old_record, type } = await req.json();

    if (type === "INSERT") {
      // Update inventory
      for (const item of record.items) {
        await supabase.rpc("decrement_stock", {
          product_id: item.product_id,
          quantity: item.quantity,
        });
      }

      // Send notification to owner
      await supabase.functions.invoke("send-push", {
        body: {
          userId: record.user_id,
          title: "New Sale!",
          body: `Sale #${record.id} completed`,
        },
      });
    }

    return new Response(JSON.stringify({ processed: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
```

## 3. Calling from Flutter

### Service Layer Pattern

```dart
// lib/src/feature/notifications/data/remote/push_notification_service.dart
class PushNotificationService {
  final SupabaseClient _supabase;

  PushNotificationService(this._supabase);

  Future<void> sendPushToUser({
    required String userId,
    required String title,
    required String body,
    Map<String, String>? data,
  }) async {
    final response = await _supabase.functions.invoke(
      'send-push',
      body: {
        'userId': userId,
        'title': title,
        'body': body,
        'data': data,
      },
    );

    if (response.status != 200) {
      throw EdgeFunctionException(
        'Failed to send push notification: ${response.data}',
      );
    }
  }
}
```

### Provider Wiring

```dart
@riverpod
PushNotificationService pushNotificationService(PushNotificationServiceRef ref) {
  return PushNotificationService(ref.watch(supabaseProvider));
}
```

## 4. Shared Core Pattern (_core/)

### Repository

```typescript
// supabase/functions/_core/repositories/user_repository.ts
import { SupabaseClient } from "@supabase/supabase-js";
import { User } from "../entities/user.ts";

export class UserRepository {
  constructor(private client: SupabaseClient) {}

  async getById(id: string): Promise<User | null> {
    const { data, error } = await this.client
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  async updateSubscription(userId: string, isActive: boolean): Promise<void> {
    const { error } = await this.client
      .from("subscriptions")
      .update({ is_active: isActive, updated_at: new Date().toISOString() })
      .eq("user_id", userId);

    if (error) throw error;
  }
}
```

### Entity Interface

```typescript
// supabase/functions/_core/entities/user.ts
export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  product_id: string;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}
```

### Service (Third-Party Wrapper)

```typescript
// supabase/functions/_core/services/fcm_service.ts
export class FCMService {
  private projectId: string;
  private accessToken: string;

  constructor(projectId: string, accessToken: string) {
    this.projectId = projectId;
    this.accessToken = accessToken;
  }

  async sendNotification(
    token: string,
    title: string,
    body: string,
    data?: Record<string, string>
  ): Promise<boolean> {
    const response = await fetch(
      `https://fcm.googleapis.com/v1/projects/${this.projectId}/messages:send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            token,
            notification: { title, body },
            data: data ?? {},
          },
        }),
      }
    );

    return response.ok;
  }
}
```

## 5. Import Map

```json
// supabase/functions/import_map.json
{
  "imports": {
    "@supabase/supabase-js": "https://esm.sh/@supabase/supabase-js@2",
    "stripe": "https://esm.sh/stripe@14?target=deno"
  }
}
```

## 6. Local Development

```bash
# Start local Supabase
npx supabase start

# Serve functions locally
npx supabase functions serve --env-file .env.local

# Test with curl
curl -X POST http://localhost:54321/functions/v1/my-function \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```

## 7. Deployment

```bash
# Deploy single function
npx supabase functions deploy <function_name>

# Deploy all functions
npx supabase functions deploy

# Set secrets
npx supabase secrets set REVENUECAT_WEBHOOK_TOKEN=xxx
npx supabase secrets set FIREBASE_PROJECT_ID=xxx
npx supabase secrets set FCM_SERVER_KEY=xxx

# List secrets
npx supabase secrets list
```

## Key Rules

### ✅ DO:
1. Use `Deno.serve` for entry point
2. Abstract logic into `_core/` repositories/services
3. Use `Deno.env.get()` for all secrets
4. Handle CORS for Flutter web calls
5. Verify webhook signatures
6. Use service role key only when bypassing RLS
7. Return proper HTTP status codes

### ❌ DON'T:
1. Put business logic in `index.ts` directly
2. Hardcode API keys or credentials
3. Skip error handling
4. Use `any` types
5. Expose service role key to client
6. Forget to handle OPTIONS for CORS
