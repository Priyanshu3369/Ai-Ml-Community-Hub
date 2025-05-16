import uuid

projects = []

def add_project(data):
    project = {
        "id": str(uuid.uuid4()),
        "title": data["title"],
        "description": data["description"],
        "github": data["github"],
        "tags": data.get("tags", [])
    }
    projects.append(project)
    return project
