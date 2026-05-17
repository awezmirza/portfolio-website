// src/components/Contact/Contact.jsx
import React from "react";
import styles from "./Contact.module.css";
import { useSheetData } from "../../hooks/useSheetData";

// Map contact type -> icon image path (still local, rarely changes)
const ICON_MAP = {
  mail: "contact/emailIcon.png",
  linkedin: "contact/linkedinIcon.png",
  github: "contact/githubIcon.png",
};

export const Contact = () => {
  const { data, loading } = useSheetData("contact");

  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out!</p>
      </div>
      <ul className={styles.links}>
        {loading && <li>Loading...</li>}
        {data?.map((item, i) => (
          <li key={i} className={styles.link}>
            {ICON_MAP[item.type] && (
              <img
                src={`/assets/${ICON_MAP[item.type]}`}
                alt={`${item.type} icon`}
              />
            )}
            <a href={item.link}>{item["link-text"]}</a>
          </li>
        ))}
      </ul>
    </footer>
  );
};
