// src/components/Skills/Skills.jsx
import React from "react";
import styles from "./Skills.module.css";
import { useSheetData } from "../../hooks/useSheetData";

export const Skills = () => {
  const { data, loading } = useSheetData("skills");

  return (
    <section className={styles.container} id="skills">
      <h2 className={styles.title}>Skills</h2>
      <div className={styles.content}>
        <div className={styles.skills}>
          {loading && <p>Loading...</p>}
          {data?.map((skill, id) => (
            <div key={id} className={styles.skill}>
              <div className={styles.skillImageContainer}>
                <img src={skill.imageLink} alt={skill.title} />
              </div>
              <p>{skill.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
