from dataclasses import dataclass, field
from typing import List

# System prompt uses one breakpoint; reserve the rest for conversation turns.
_MAX_CACHED_TURNS = 3


@dataclass
class ConversationSession:
    messages: List[dict] = field(default_factory=list)

    def add_user(self, content: str) -> None:
        self.messages.append({"role": "user", "content": content})

    def add_assistant(self, content: str) -> None:
        self.messages.append({"role": "assistant", "content": content})

    def clear(self) -> None:
        self.messages.clear()

    @property
    def is_empty(self) -> bool:
        return not self.messages

    @property
    def turn_count(self) -> int:
        return sum(1 for m in self.messages if m["role"] == "user")

    def to_api_messages(self) -> List[dict]:
        """Return messages formatted for the API.

        Adds cache_control to the last _MAX_CACHED_TURNS user turns so that
        successive requests can reuse the growing conversation prefix from cache.
        """
        user_indices = [i for i, m in enumerate(self.messages) if m["role"] == "user"]
        cached_set = set(user_indices[-_MAX_CACHED_TURNS:])

        result = []
        for i, msg in enumerate(self.messages):
            if msg["role"] == "user" and i in cached_set:
                result.append({
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": msg["content"],
                            "cache_control": {"type": "ephemeral"},
                        }
                    ],
                })
            else:
                result.append(msg)

        return result
