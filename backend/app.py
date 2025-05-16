from flask import Flask, request, jsonify
from flask_cors import CORS
from projects import projects, add_project

app = Flask(__name__)
CORS(app)  # Allow requests from frontend (CORS)

@app.route("/projects", methods=["GET"])
def get_projects():
    return jsonify(projects)

@app.route("/projects", methods=["POST"])
def post_project():
    data = request.get_json()
    project = add_project(data)
    return jsonify({"message": "Project added", "project": project}), 201

if __name__ == "__main__":
    app.run(debug=True)
