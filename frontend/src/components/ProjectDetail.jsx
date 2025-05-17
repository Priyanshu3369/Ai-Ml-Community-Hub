import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/projects")
      .then((res) => res.json())
      .then((data) => {
        const selected = data[parseInt(id)];
        if (selected) {
          setProject(selected);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="p-6 text-center text-gray-500">Loading project...</p>
      </>
    );
  }

  if (notFound || !project) {
    return (
      <>
        <Navbar />
        <div className="p-6 text-center text-red-500">Project not found.</div>
        <div className="text-center mt-2">
          <Link to="/projects" className="text-blue-600 hover:underline">
            ← Back to Projects
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-2xl mx-auto">
        <Link to="/projects" className="text-blue-600 hover:underline text-sm">
          ← Back to Projects
        </Link>
        <h2 className="text-3xl font-bold mt-4">{project.title}</h2>
        <p className="mt-2 text-gray-700">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-800 px-2 py-1 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
