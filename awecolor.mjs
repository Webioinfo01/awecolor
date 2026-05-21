#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { argv, stdin, stdout, stderr, exit } from "node:process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { version: VERSION } = require("./package.json");

const HELP = `Usage: awecolor [OPTIONS] [FILE...]

  Colorize hex color codes in text.

Options:
  --extract     List colors with location and context instead of colorizing.
  --no-color    Output plain text (no ANSI codes).
  --force-color Force color output even when stdout is not a TTY.
  -h, --help    Show this message and exit.
  -v, --version Show the version and exit.`;

const HEX_RE = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b(?![0-9a-fA-F])/g;

// --- Pure logic ---

function expandHex(hex) {
  const h = hex.slice(1);
  if (h.length === 8 || h.length === 6) return "#" + h.slice(0, 6);
  if (h.length === 4) return "#" + h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  return "#" + h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
}

function hexToRgb(hex) {
  const h = hex.slice(1);
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function luminance(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function foregroundColor(hex) {
  const [r, g, b] = hexToRgb(hex);
  return luminance(r, g, b) > 160 ? "#111111" : "#ffffff";
}

function colorize(text, chalk) {
  return text.replace(HEX_RE, (match) => {
    const bg = expandHex(match);
    const fg = foregroundColor(bg);
    return chalk.bgHex(bg).hex(fg)(` ${match} `);
  });
}

function extractColors(text) {
  const results = [];
  const lines = text.split("\n");
  const termWidth = stdout.columns || 80;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let match;
    HEX_RE.lastIndex = 0;
    while ((match = HEX_RE.exec(line)) !== null) {
      const col = match.index + 1;
      const meta = `${match[0]}  ${i + 1}:${col}`;
      const maxContext = termWidth - meta.length - 2;
      let context = line;
      if (context.length > maxContext && maxContext > 10) {
        const start = Math.max(0, match.index - Math.floor(maxContext / 3));
        const end = Math.min(line.length, start + maxContext);
        context = (start > 0 ? "..." : "") + line.slice(start, end) + (end < line.length ? "..." : "");
      }
      results.push(`${meta}  ${context}`);
    }
  }
  return results;
}

// --- CLI wiring ---

function parseArgs(args) {
  const opts = { files: [], extract: false, noColor: false, forceColor: false };
  let i = 0;
  while (i < args.length) {
    const a = args[i];
    if (a === "--extract")      { opts.extract = true; i++; }
    else if (a === "--no-color")    { opts.noColor = true; i++; }
    else if (a === "--force-color") { opts.forceColor = true; i++; }
    else if (a === "-h" || a === "--help")    { stdout.write(HELP + "\n"); exit(0); }
    else if (a === "-v" || a === "--version") { stdout.write(`awecolor ${VERSION}\n`); exit(0); }
    else if (a === "--")            { opts.files = args.slice(i + 1); break; }
    else if (a.startsWith("-"))     { stderr.write(`Unknown option: ${a}\nRun "awecolor --help" for usage.\n`); exit(1); }
    else                            { opts.files.push(a); i++; }
  }
  return opts;
}

function isInteractive() {
  return stdin.isTTY && stdout.isTTY;
}

function hasAnsiSupport() {
  return stdout.isTTY || !!process.env.FORCE_COLOR || !!process.env.COLORTERM;
}

async function readStdin() {
  let data = "";
  for await (const chunk of stdin) data += chunk;
  return data;
}

async function main() {
  const args = argv.slice(2);
  const opts = parseArgs(args);

  const useColor = !opts.noColor && (opts.forceColor || hasAnsiSupport());

  let Chalk;
  if (useColor) {
    const { Chalk: C } = await import("chalk");
    Chalk = new C({ level: 3 });
  }

  if (opts.files.length === 0) {
    if (isInteractive()) { stdout.write(HELP + "\n"); exit(0); }
    const text = await readStdin();
    if (!text) { exit(0); }
    if (opts.extract) {
      const results = extractColors(text);
      stdout.write(results.join("\n") + "\n");
    } else if (useColor) {
      stdout.write(colorize(text, Chalk));
    } else {
      stdout.write(text);
    }
    return;
  }

  for (const file of opts.files) {
    let text;
    try {
      text = await readFile(file, "utf-8");
    } catch (err) {
      stderr.write(`Cannot read "${file}": ${err.code === "ENOENT" ? "file not found" : err.message}\n`);
      exit(1);
    }
    if (opts.extract) {
      const results = extractColors(text);
      stdout.write(results.join("\n") + "\n");
    } else if (useColor) {
      stdout.write(colorize(text, Chalk));
    } else {
      stdout.write(text);
    }
  }
}

main();
