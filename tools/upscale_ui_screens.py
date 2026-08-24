from pathlib import Path

from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCES = (
    "qa-today.png",
    "qa-client.png",
    "qa-create-inperson.png",
    "qa-task-board.png",
    "qa-message.png",
    "qa-client-search.png",
    "qa-location-list.png",
    "qa-client-unified.png",
)


def upscale(source: Path) -> Path:
    target = source.with_name(f"{source.stem}-hq.png")
    with Image.open(source) as image:
        image = image.convert("RGBA")
        enlarged = image.resize(
            (image.width * 3, image.height * 3),
            Image.Resampling.LANCZOS,
        )
        sharpened = enlarged.filter(
            ImageFilter.UnsharpMask(radius=1.15, percent=105, threshold=2)
        )
        sharpened.save(target, format="PNG", optimize=True, compress_level=7)
    return target


if __name__ == "__main__":
    for filename in SOURCES:
        print(upscale(ROOT / filename).name)
