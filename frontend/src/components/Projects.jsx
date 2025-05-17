import { useEffect, useState } from "react";
import ProjectForm from "./ProjectForm";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const handleAddProject = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <>
      <Navbar />
      <section className="py-12 px-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Community Projects</h3>
        <ProjectForm onAdd={handleAddProject} />
        {projects.length === 0 ? (
          <div className="border rounded p-4 text-center text-gray-500">
            No projects to show yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-4">
                <Link to={`/projects/${index}`}>
                  <h4 className="text-xl font-bold text-blue-700 hover:underline">
                    {project.title}
                  </h4>
                </Link>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
