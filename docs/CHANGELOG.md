# Changelog

## v0.1.0

Initial release. A CLI tool that finds hex color codes in text and renders them with colored backgrounds in the terminal.

### Highlights

- Match hex color formats: `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`
- Colorize output with auto-selected foreground (black/white) based on luminance
- Read from file arguments or stdin pipe
- `--extract` mode lists colors with line:column location and context
- `--no-color` for plain text output, `--force-color` to override TTY detection
- `-v` / `--version` and `-h` / `--help` flags
