# This acts as a mock database for now

projects = [
    {
        "title": "Heart Disease Predictor",
        "description": "Predicts the risk of heart disease using machine learning.",
        "tags": ["ML", "Healthcare", "Classification"]
    },
    {
        "title": "Credit Card Fraud Detection",
        "description": "Detects fraudulent transactions using anomaly detection.",
        "tags": ["ML", "Fraud", "Finance"]
    }
]

def add_project(data):
    # Data should contain: title, description, tags
    project = {
        "title": data.get("title", "Untitled Project"),
        "description": data.get("description", ""),
        "tags": data.get("tags", [])
    }
    projects.append(project)
    return project
