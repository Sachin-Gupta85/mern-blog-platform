from markdown_tools import slugify, reading_time, excerpt


def test_slugify_matches_server_rules():
    assert slugify("Hello, World!") == "hello-world"
    assert slugify("  Multiple   Spaces  ") == "multiple-spaces"
    assert slugify("Already-a-slug") == "already-a-slug"


def test_reading_time():
    assert reading_time("") == 0
    assert reading_time("word " * 10) == 1          # < 1 min rounds up to 1
    assert reading_time("w " * 450, wpm=200) == 3   # 450/200 -> ceil 3


def test_excerpt_truncates_on_word_boundary():
    assert excerpt("short text") == "short text"
    long = "alpha beta gamma delta " * 20
    ex = excerpt(long, 20)
    assert ex.endswith("…") and len(ex) <= 21 and " " in ex
