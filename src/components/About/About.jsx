import React from "react";
import styles from "./About.module.css";
import { useSheetData } from "../../hooks/useSheetData";

export const About = () => {
  const { data, loading } = useSheetData("about");

  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <ul className={styles.aboutItems}>
          {loading && <li>Loading...</li>}
          {data?.map((item, i) => (
            <li key={i} className={styles.aboutItem}>
              {item.Icon && (
                <img src={item.Icon} alt={`${item.Heading} icon`} className={styles.aboutIcon} />
              )}
              <div className={styles.aboutItemText}>
                <h3>{item.Heading}</h3>
                <p>{item.Paragraph}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
