import { useState } from "react";

export default function ProjectForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProject = {
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    const response = await fetch("http://127.0.0.1:5000/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    });

    if (response.ok) {
      const data = await response.json();
      onAdd(data.project); // Update project list in parent
      setTitle("");
      setDescription("");
      setTags("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
      <h3 className="text-xl font-semibold mb-4">Submit a New Project</h3>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="w-full border rounded p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Tags (comma-separated)</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Project
      </button>
    </form>
  );
}
