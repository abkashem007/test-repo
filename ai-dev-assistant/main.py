#!/usr/bin/env python3
"""AI Dev Assistant — a Claude-powered CLI for developers."""

import argparse
import sys

from assistant import DevAssistant
from config import get_api_key


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="ai-dev-assistant",
        description="AI-powered developer assistant using Claude Opus 4.7",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "examples:\n"
            "  ai-dev-assistant                         # interactive mode\n"
            "  ai-dev-assistant review src/app.py       # review a file\n"
            "  ai-dev-assistant generate 'REST API in FastAPI'\n"
            "  ai-dev-assistant generate -l go 'binary search'\n"
            "  ai-dev-assistant debug 'TypeError: ...' -f buggy.py\n"
            "  ai-dev-assistant ask 'When should I use Redis over Postgres?'"
        ),
    )

    sub = parser.add_subparsers(dest="command")

    # --- review ---
    r = sub.add_parser("review", help="Review a source file for issues")
    r.add_argument("file", help="Path to the file to review")

    # --- generate ---
    g = sub.add_parser("generate", help="Generate code from a description")
    g.add_argument("description", help="What to build")
    g.add_argument("-l", "--lang", metavar="LANG", help="Target programming language")

    # --- debug ---
    d = sub.add_parser("debug", help="Debug an error message or traceback")
    d.add_argument("error", help="Error message or description of the problem")
    d.add_argument("-f", "--file", metavar="FILE", help="Source file containing the buggy code")

    # --- ask ---
    a = sub.add_parser("ask", help="Ask a developer question")
    a.add_argument("question", help="Your question")

    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    try:
        get_api_key()  # fail fast with a clear message before instantiating
        assistant = DevAssistant()
    except ValueError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1)

    if args.command == "review":
        try:
            with open(args.file) as f:
                code = f.read()
        except FileNotFoundError:
            print(f"Error: '{args.file}' not found.", file=sys.stderr)
            sys.exit(1)
        print(f"Reviewing {args.file} ...\n")
        assistant.review_code(code, args.file)

    elif args.command == "generate":
        print("Generating code ...\n")
        assistant.generate_code(args.description, args.lang)

    elif args.command == "debug":
        code: str | None = None
        if args.file:
            try:
                with open(args.file) as f:
                    code = f.read()
            except FileNotFoundError:
                print(f"Warning: '{args.file}' not found — proceeding without code context.")
        print("Analyzing error ...\n")
        assistant.debug(args.error, code)

    elif args.command == "ask":
        assistant.ask(args.question)

    else:
        # No subcommand → interactive REPL
        assistant.run_interactive()


if __name__ == "__main__":
    main()
