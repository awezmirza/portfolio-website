import React from "react";
import styles from "./Intro.module.css";
import { useSheetData } from "../../hooks/useSheetData";

export const Intro = () => {
  const { data, loading } = useSheetData("intro");
  const intro = data?.[0];

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{loading ? "Loading..." : intro?.title}</h1>
        <p className={styles.description}>{intro?.description}</p>
        <a href={intro?.["contact-me-link"]} className={styles.contactBtn}>
          Contact Me
        </a>
      </div>
      {intro?.["intro-img-url"] && (
        <img
          src={intro["intro-img-url"]}
          alt="Intro image of me"
          className={styles.introImg}
        />
      )}
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
