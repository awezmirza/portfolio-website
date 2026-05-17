// src/components/Projects/Projects.jsx
import React from "react";
import styles from "./Projects.module.css";
import { useSheetData } from "../../hooks/useSheetData";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const { data, loading } = useSheetData("projects"); 

  const parseSkills = (raw) => {
  if (!raw) return [];
  
  // Remove CSV quoting artifacts and normalize
  let cleaned = raw
    .replace(/^"+|"+$/g, "")   // strip wrapping double-quotes added by CSV
    .replace(/""/g, '"')        // unescape CSV double-quote escaping
    .trim();

  // Try JSON parse first
  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) return parsed;
  } catch {}

  // Fallback: extract quoted strings manually
  const matches = cleaned.match(/"([^"]+)"/g);
  if (matches) return matches.map((s) => s.replace(/"/g, "").trim());

  // Last resort: split by comma
  return cleaned.split(",").map((s) => s.trim()).filter(Boolean);
};

const projects = data?.map((row) => ({
  ...row,
  skills: parseSkills(row.skills),
}));

  return (
    <section className={styles.container} id="projects">
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.projects}>
        {loading && <p>Loading...</p>}
        {projects?.map((project, id) => (
          <ProjectCard key={id} project={project} />
        ))}
      </div>
    </section>
  );
};
