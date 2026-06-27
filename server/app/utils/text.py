import re


def normalize_words(text: str) -> set[str]:
    return {word.lower() for word in re.findall(r"[A-Za-z][A-Za-z+#.-]{1,}", text)}


def compact_text(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()

