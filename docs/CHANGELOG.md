# Change Log

## v0.1.0

`v0.1.0` is the first release of awecolor, a CLI tool for colorizing hex color codes in text.

### Hex color visualization

awecolor reads text from files or stdin and renders hex color codes with colored backgrounds. The foreground color is automatically chosen (black or white) based on background luminance for readability.

### Supported formats

All common hex notations are supported: `#RGB`, `#RGBA`, `#RRGGBB`, and `#RRGGBBAA`.

### Extract mode

`--extract` lists all colors found in the text with line:column location and surrounding context, useful for auditing color usage across a codebase.

### Highlights

- Colorize hex codes with actual background colors
- Read from file arguments or stdin pipe
- `--extract` mode with location and auto-truncated context
- `--no-color` for plain text output
- `--force-color` to enable color even when piped
- Automatic foreground color selection based on luminance
