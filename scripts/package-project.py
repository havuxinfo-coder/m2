#!/usr/bin/env python3
import os
import zipfile
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
OUTPUT_ZIP = ROOT_DIR / "public" / "miirovelle-hotels-project.zip"

EXCLUDE_DIRS = {
    "node_modules",
    "dist",
    ".git",
    "build",
    "coverage",
    ".cache",
    ".idea",
    ".vscode"
}

EXCLUDE_FILES = {
    ".DS_Store",
    "miirovelle-hotels-project.zip"
}

def package_project():
    OUTPUT_ZIP.parent.mkdir(parents=True, exist_ok=True)
    if OUTPUT_ZIP.exists():
        OUTPUT_ZIP.unlink()

    print(f"Packaging project from {ROOT_DIR} -> {OUTPUT_ZIP}...")
    file_count = 0

    with zipfile.ZipFile(OUTPUT_ZIP, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(ROOT_DIR):
            # Prune excluded directories in-place
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith(".")]

            for file in files:
                if file in EXCLUDE_FILES or file.endswith(".zip") or file.endswith(".log"):
                    continue

                full_path = Path(root) / file
                rel_path = full_path.relative_to(ROOT_DIR)

                zipf.write(full_path, arcname=str(rel_path))
                file_count += 1

    size_mb = OUTPUT_ZIP.stat().st_size / (1024 * 1024)
    print(f"Successfully packaged {file_count} files into {OUTPUT_ZIP.name} ({size_mb:.2f} MB).")

if __name__ == "__main__":
    package_project()
