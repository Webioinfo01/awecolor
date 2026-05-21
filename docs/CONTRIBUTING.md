# Contributing to awecolor

## Setup

```bash
git clone <repo>
cd awecolor
npm install
```

## Development

Run directly:

```bash
echo '#FF0000' | node awecolor.mjs
```

Test with a file:

```bash
node awecolor.mjs test.css
```

## Code Style

- ESM (`type: "module"` in package.json)
- Single file: `awecolor.mjs` contains CLI wiring and business logic
- No classes, plain exported functions
- No external dependencies beyond chalk
- Functions are pure where possible (colorize, extractColors)

## Design

### Color Formats

awecolor matches these hex formats only:

- `#RGB` — 3-digit shorthand, expanded to `#RRGGBB`
- `#RGBA` — 4-digit shorthand, expanded to `#RRGGBB` (alpha ignored)
- `#RRGGBB` — standard 6-digit
- `#RRGGBBAA` — 8-digit with alpha, rendered as `#RRGGBB` (alpha ignored)

Matching rules:
- Only full hex codes are matched (not substrings of longer hex sequences)
- The character after the hex code must not be a hex digit (prevents matching `#AABBCC` inside `#AABBCCDD`)
- The regex uses alternation in descending length order with a negative lookahead

### Rendering

Each matched color is rendered as ` <color> ` (padded with spaces) using chalk:
- Background: the color's RGB value
- Foreground: auto-selected black (`#111111`) or white (`#ffffff`) based on perceived luminance

Luminance formula: `0.299 * R + 0.587 * G + 0.114 * B`. Threshold: 160.

### Extract Mode

`--extract` outputs one line per matched color:

```
#RRGGBB  line:col  context
```

Context is the full line containing the color. If the line exceeds terminal width, it is truncated with `...` ellipsis, keeping the color visible.

### Input Sources

1. **File arguments**: each file is read and processed independently
2. **Stdin pipe**: when no file arguments and stdin is not a TTY
3. **Interactive (TTY, no args)**: prints help and exits

### Color Detection

Color output is enabled when:
- stdout is a TTY, OR
- `--force-color` flag is set, OR
- `FORCE_COLOR` or `COLORTERM` env vars are set

Color output is disabled when:
- `--no-color` flag is set (overrides all other signals)

### Error Handling

- Unknown options: print error + usage hint, exit 1
- Missing files: print "file not found", exit 1
- No input (interactive TTY, no args): print help, exit 0
- Empty stdin: exit 0

### Dependencies

- **chalk v5**: ESM-only, used for terminal color rendering
- **Node.js >= 18**: required for ESM and modern APIs

## Testing

```bash
npm test
```

## Release

1. Update `version` in `package.json`
2. Commit and tag: `git tag v0.1.0`
3. Publish: `npm publish`
