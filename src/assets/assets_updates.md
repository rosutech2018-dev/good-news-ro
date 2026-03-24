# Assets & Configuration Updates — 2026-03-24

## 1. angular.json — Assets Path Fix

**Problem:** The `src/assets/` directory was not registered in the Angular build configuration. Only the `public/` folder was listed, so all JSON content files were never served by `ng serve` or copied by `ng build`. Every HTTP request to `/assets/content/*.json` returned 404.

**Fix:** Added a second entry to the `assets` array in the `build` options:

```json
{
  "glob": "**/*",
  "input": "src/assets",
  "output": "assets"
}
```

---

## 2. articles.json — JSON Syntax Corruption Fix

The file had multiple corruption issues that prevented it from being parsed.

### 2a. Structural property name corruption
Property names across articles 2–20 were incorrectly escaped:
- **Pattern A:** `\"propertyName":` (opening quote escaped, closing plain)
- **Pattern B:** `\"propertyName\":` (both quotes escaped)

Affected all 20 known fields: `id`, `slug`, `title`, `summary`, `content`, `category`, `categoryLabel`, `region`, `county`, `author`, `date`, `readingTime`, `image`, `imageAlt`, `tags`, `label`, `featured`, `isGoodModel`, `impact`, `source`.

**Fix:** Replaced all corrupted property name patterns with correctly quoted versions.

### 2b. Property value opening corruption
String values were opened with `\"` instead of `"`:
- `"key": \"value"` → `"key": "value"`

**Fix:** 155 value openings corrected.

### 2c. Array element opening corruption
Tag arrays had escaped opening quotes:
- `[\"tag1", \"tag2"]` → `["tag1", "tag2"]`

**Fix:** 10 array opens and 40 array element separators corrected.

### 2d. Unescaped Romanian closing quotes in HTML content
The `content` field (HTML) contained Romanian-style speech quotes (`„text"`) where the closing `"` was a plain ASCII double-quote. This prematurely terminated the JSON string.

**Fix:** Located all 19 unescaped closing quotes using the opening low-9 quote `„` (U+201E) as an anchor, then escaped the matching closing `"` to `\"` within the same content line.

---

## 3. Diacritics Removed — All Content JSON Files

All Romanian diacritics replaced with their base ASCII equivalents across all four content files:

| Character | Replaced with |
|---|---|
| ă, Ă | a, A |
| â, Â | a, A |
| î, Î | i, I |
| ș, Ș (and ş, Ş variants) | s, S |
| ț, Ț (and ţ, Ţ variants) | t, T |

| File | Replacements |
|---|---|
| `articles.json` | 1598 |
| `categories.json` | 50 |
| `counties.json` | 193 |
| `good-models.json` | 255 |

---

## Result

After all fixes:
- `articles.json` is valid JSON with 20 articles across 7 categories
- All content files load correctly in the Angular portal via `ng serve`
- Category pages display filtered articles correctly
- Article detail pages render full content
