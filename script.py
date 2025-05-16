import os
from pathlib import Path

# Define the folder and file structure
structure = {
    "backend": ["app.py"],
    "frontend": {
        "public": [],
        "src": {
            "components": [],
            "pages": [],
            "App.js": "",
            "index.js": ""
        },
        "tailwind.config.js": ""
    },
    "README.md": ""
}

# Function to create the structure recursively
def create_structure(base_path, structure):
    for name, content in structure.items():
        current_path = Path(base_path) / name
        if isinstance(content, dict):
            current_path.mkdir(parents=True, exist_ok=True)
            create_structure(current_path, content)
        elif isinstance(content, list):
            current_path.mkdir(parents=True, exist_ok=True)
            for file in content:
                (current_path / file).touch()
        else:
            # It's a single file
            current_path.parent.mkdir(parents=True, exist_ok=True)
            current_path.touch()

# Run the script
if __name__ == "__main__":
    create_structure(".", structure)
    print("Directory structure created successfully.")
