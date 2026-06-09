from typing import Optional

import anthropic

from config import MAX_TOKENS, MODEL, SYSTEM_PROMPT, get_api_key
from session import ConversationSession

_SYSTEM_BLOCKS = [
    {
        "type": "text",
        "text": SYSTEM_PROMPT,
        "cache_control": {"type": "ephemeral"},
    }
]


class DevAssistant:
    def __init__(self) -> None:
        self.client = anthropic.Anthropic(api_key=get_api_key())
        self.session = ConversationSession()

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------

    def _stream(self) -> str:
        """Stream the next response from Claude and return the full text."""
        chunks: list[str] = []

        with self.client.messages.stream(
            model=MODEL,
            max_tokens=MAX_TOKENS,
            thinking={"type": "adaptive"},
            system=_SYSTEM_BLOCKS,
            messages=self.session.to_api_messages(),
        ) as stream:
            for text in stream.text_stream:
                print(text, end="", flush=True)
                chunks.append(text)

        print()  # ensure the cursor moves to a new line
        return "".join(chunks)

    def _send(self, user_content: str) -> str:
        """Append a user message, stream the response, and record it."""
        self.session.add_user(user_content)
        response = self._stream()
        self.session.add_assistant(response)
        return response

    # ------------------------------------------------------------------
    # Public command methods
    # ------------------------------------------------------------------

    def review_code(self, code: str, filename: str = "snippet") -> str:
        prompt = (
            f"Review the following code from `{filename}`:\n\n"
            f"```\n{code}\n```\n\n"
            "Provide a structured review: bugs/errors, security, performance, "
            "code quality, and a summary of priority fixes."
        )
        return self._send(prompt)

    def generate_code(self, description: str, language: Optional[str] = None) -> str:
        lang_hint = f" in {language}" if language else ""
        prompt = (
            f"Generate code{lang_hint} for the following:\n\n"
            f"{description}\n\n"
            "Provide the complete implementation, a brief explanation of the approach, "
            "and example usage."
        )
        return self._send(prompt)

    def debug(self, error: str, code: Optional[str] = None) -> str:
        if code:
            prompt = (
                f"Help me debug this error:\n\n```\n{error}\n```\n\n"
                f"In this code:\n\n```\n{code}\n```\n\n"
                "Explain the root cause, provide the corrected code, "
                "and flag any related issues to watch for."
            )
        else:
            prompt = (
                f"Help me debug this error:\n\n```\n{error}\n```\n\n"
                "Explain the root cause, common fixes, and how to prevent it."
            )
        return self._send(prompt)

    def ask(self, question: str) -> str:
        return self._send(question)

    def clear_session(self) -> None:
        self.session.clear()
        print("Conversation history cleared.")

    # ------------------------------------------------------------------
    # Interactive REPL
    # ------------------------------------------------------------------

    def run_interactive(self) -> None:
        _DIVIDER = "─" * 44
        print("AI Dev Assistant  •  Interactive Mode")
        print(_DIVIDER)
        print("  /review <file>      Review a source file")
        print("  /generate <desc>    Generate code")
        print("  /debug <error>      Debug an error message")
        print("  /clear              Clear conversation history")
        print("  /exit               Quit")
        print("  <anything else>     Ask a dev question")
        print(_DIVIDER + "\n")

        while True:
            try:
                raw = input("You: ").strip()
            except (EOFError, KeyboardInterrupt):
                print("\nGoodbye!")
                break

            if not raw:
                continue

            lower = raw.lower()

            if lower in ("/exit", "/quit"):
                print("Goodbye!")
                break

            if lower == "/clear":
                self.clear_session()
                print()
                continue

            print("\nAssistant: ", end="")

            if raw.startswith("/review "):
                filepath = raw[8:].strip()
                try:
                    with open(filepath) as f:
                        code = f.read()
                    self.review_code(code, filepath)
                except FileNotFoundError:
                    print(f"Error: '{filepath}' not found.")
                print()
                continue

            if raw.startswith("/generate "):
                self.generate_code(raw[10:].strip())
                print()
                continue

            if raw.startswith("/debug "):
                self.debug(raw[7:].strip())
                print()
                continue

            self.ask(raw)
            print()
