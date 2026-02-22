---
description: Run Dart analyzer and fix code quality issues
model: claude-sonnet-4-5
---

# Run Dart Analyzer and Fix Issues

Run linting and fix code quality issues in your Flutter/Dart codebase.

## Target

$ARGUMENTS

## Lint Strategy

### 1. Run Analysis Commands

```bash
# Run Dart analyzer
dart analyze

# Run with all infos and warnings
dart analyze --fatal-infos --fatal-warnings

# Run Flutter analyzer (includes additional Flutter-specific rules)
flutter analyze

# Auto-fix issues where possible
dart fix --apply

# Preview fixes without applying
dart fix --dry-run
```

### 2. Common Dart/Flutter Issues

**Type Issues**
- Missing type annotations
- Implicit dynamic types
- Incorrect nullable types
- Missing return types

**Code Quality**
- Unused imports
- Unused variables
- Dead code
- Unnecessary containers

**Flutter-Specific**
- Missing `const` constructors
- Unnecessary rebuilds
- Missing keys in lists
- Deprecated API usage

**Architecture Issues**
- Business logic in widgets
- Importing Flutter in domain layer
- Using `ref.read` for reactive state

### 3. Analysis Options Setup

```yaml
# analysis_options.yaml
include: package:flutter_lints/flutter.yaml

analyzer:
  errors:
    missing_return: error
    dead_code: warning
    unused_import: warning
    unused_local_variable: warning
  exclude:
    - "**/*.g.dart"
    - "**/*.freezed.dart"
    - "**/generated_plugin_registrant.dart"

linter:
  rules:
    # Error prevention
    - always_declare_return_types
    - avoid_dynamic_calls
    - avoid_returning_null_for_void
    - cancel_subscriptions
    - close_sinks

    # Style
    - always_put_required_named_parameters_first
    - avoid_bool_literals_in_conditional_expressions
    - avoid_catches_without_on_clauses
    - avoid_catching_errors
    - avoid_print
    - avoid_redundant_argument_values
    - avoid_unnecessary_containers
    - avoid_unused_constructor_parameters

    # Flutter specific
    - prefer_const_constructors
    - prefer_const_constructors_in_immutables
    - prefer_const_declarations
    - prefer_const_literals_to_create_immutables
    - sized_box_for_whitespace
    - sort_child_properties_last
    - use_colored_box
    - use_decorated_box

    # Dart best practices
    - prefer_final_fields
    - prefer_final_in_for_each
    - prefer_final_locals
    - prefer_if_null_operators
    - prefer_null_aware_operators
    - prefer_single_quotes
    - require_trailing_commas
    - unnecessary_await_in_return
    - unnecessary_null_checks
    - use_if_null_to_convert_nulls_to_bools
```

### 4. Priority Fixes

**High Priority** (fix immediately)
- Type errors blocking build
- Null safety violations
- Missing return statements
- Deprecated API usage with no replacement

**Medium Priority** (fix before commit)
- Missing type annotations
- Unused imports/variables
- Missing `const` constructors
- Code style violations

**Low Priority** (fix when convenient)
- Minor formatting
- Optional lints
- Documentation warnings

### 5. Auto-Fix What You Can

```bash
# Apply all safe fixes
dart fix --apply

# Common fixes applied:
# - Add missing const
# - Remove unused imports
# - Convert to null-aware operators
# - Add trailing commas
# - Sort imports
```

### 6. Manual Fixes Required

Some issues require manual intervention:

**Add Type Annotations**
```dart
// Before (implicit dynamic)
var items = [];

// After (explicit type)
List<Product> items = [];
```

**Add Return Types**
```dart
// Before
getData() async {
  return await service.fetchData();
}

// After
Future<List<Product>> getData() async {
  return await service.fetchData();
}
```

**Remove Unused Code**
```dart
// Remove unused imports at top of file
// Remove unused methods
// Remove dead code branches
```

**Fix Architecture Violations**
```dart
// BAD: Flutter import in domain
import 'package:flutter/material.dart'; // Remove this!

class Product {
  // Domain entity should be pure Dart
}

// BAD: Business logic in widget
class ProductScreen extends StatelessWidget {
  Widget build(context) {
    if (name.isEmpty) throw Exception(); // Move to service!
  }
}
```

### 7. VSCode Integration

```json
// .vscode/settings.json
{
  "dart.analysisExcludedFolders": [
    ".dart_tool",
    "build"
  ],
  "dart.showTodos": true,
  "dart.lineLength": 80,
  "editor.formatOnSave": true,
  "[dart]": {
    "editor.defaultFormatter": "Dart-Code.dart-code",
    "editor.formatOnSave": true,
    "editor.selectionHighlight": false,
    "editor.suggestSelection": "first",
    "editor.tabCompletion": "onlySnippets",
    "editor.wordBasedSuggestions": "off"
  }
}
```

### 8. Pre-Commit Hook (Optional)

```bash
# .husky/pre-commit or .git/hooks/pre-commit
#!/bin/sh

echo "Running Dart analyzer..."
dart analyze --fatal-infos
if [ $? -ne 0 ]; then
  echo "Analyzer found issues. Please fix them before committing."
  exit 1
fi

echo "Running dart fix --dry-run..."
dart fix --dry-run
```

## What to Generate

1. **Lint Report** - All issues found by analyzer
2. **Auto-Fix Results** - What was automatically fixed
3. **Manual Fix Suggestions** - Issues requiring manual intervention
4. **Priority List** - Ordered by severity
5. **Configuration Recommendations** - Improve analysis_options.yaml

## Common Fixes

**Remove Unused Imports**
```dart
// Before
import 'package:flutter/material.dart';
import 'package:some_unused_package/unused.dart'; // Remove

// After
import 'package:flutter/material.dart';
```

**Add const Constructors**
```dart
// Before
return Container(
  padding: EdgeInsets.all(16),
  child: Text('Hello'),
);

// After
return const Padding(
  padding: EdgeInsets.all(16),
  child: Text('Hello'),
);
```

**Use Null-Aware Operators**
```dart
// Before
final name = user != null ? user.name : 'Guest';

// After
final name = user?.name ?? 'Guest';
```

**Add Trailing Commas**
```dart
// Before
Widget build(BuildContext context) {
  return Column(children: [Text('A'), Text('B')]);
}

// After (better formatting)
Widget build(BuildContext context) {
  return Column(
    children: [
      Text('A'),
      Text('B'),
    ],
  );
}
```

Focus on fixes that improve code quality and prevent runtime errors. Run analyzer before every commit.
