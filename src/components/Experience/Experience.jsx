// src/components/Experience/Experience.jsx
import React from "react";
import styles from "./Experience.module.css";
import { useSheetData } from "../../hooks/useSheetData";

function parseDuration(start, end) {
  const parseDate = (str) => {
    if (!str) return null;
    const s = str.trim();
    if (s.toLowerCase() === "present") return new Date();
    const d = new Date(s + " 1");
    return isNaN(d) ? null : d;
  };

  const startDate = parseDate(start);
  const endDate = parseDate(end);
  if (!startDate || !endDate) return "";

  let months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  if (months <= 0) months = 1;

  const years = Math.floor(months / 12);
  const rem = months % 12;

  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rem > 0) parts.push(`${rem} mo${rem > 1 ? "s" : ""}`);
  return parts.join(" ");
}

function parseSkills(raw) {
  if (!raw || !raw.trim()) return [];
  return raw
    .split("|")
    .map((s) => s.replace(/^["'\s]+|["'\s]+$/g, "").trim())
    .filter(Boolean);
}

function parseBullets(raw) {
  if (!raw) return [];
  return raw
    .split(/\n|\\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

function CompanyLogo({ url, name }) {
  const [imgFailed, setImgFailed] = React.useState(false);
  const initial = name?.charAt(0).toUpperCase() ?? "?";

  if (url && !imgFailed) {
    return (
      <img
        src={url}
        alt={`${name} logo`}
        className={styles.logo}
        onError={() => setImgFailed(true)}
      />
    );
  }

  return <div className={styles.logoFallback}>{initial}</div>;
}

export const Experience = () => {
  const { data, loading } = useSheetData("experience");

  const experiences = data?.filter((row) => row["company-name"]?.trim()) ?? [];

  return (
    <section className={styles.container} id="experience">
      <h2 className={styles.title}>Experience</h2>
      {loading && <p className={styles.loading}>Loading...</p>}
      <div className={styles.timeline}>
        {experiences.map((exp, i) => {
          const duration = parseDuration(exp["start-time"], exp["end-time"]);
          const skills = parseSkills(exp["skills"]);
          const bullets = parseBullets(exp["description"]);
          const isCurrent =
            exp["end-time"]?.trim().toLowerCase() === "present";

          return (
            <div key={i} className={styles.entry}>
              <div className={styles.marker}>
                <div
                  className={`${styles.dot} ${isCurrent ? styles.dotActive : ""}`}
                />
                {i < experiences.length - 1 && (
                  <div className={styles.line} />
                )}
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.logoWrapper}>
                    <CompanyLogo
                      url={exp["company-logo"]}
                      name={exp["company-name"]}
                    />
                  </div>

                  <div className={styles.cardMain}>
                    <h3 className={styles.role}>{exp["role"]}</h3>
                    <span className={styles.company}>{exp["company-name"]}</span>
                  </div>

                  <div className={styles.cardMeta}>
                    <span className={styles.dates}>
                      {exp["start-time"]} — {exp["end-time"]}
                    </span>
                    {duration && (
                      <span className={styles.duration}>{duration}</span>
                    )}
                    <span className={styles.location}>{exp["location"]}</span>
                  </div>
                </div>

                <ul className={styles.bullets}>
                  {bullets.map((line, j) => (
                    <li key={j} className={styles.bullet}>
                      {line.replace(/^[-•]\s*/, "")}
                    </li>
                  ))}
                </ul>

                {skills.length > 0 && (
                  <div className={styles.skills}>
                    {skills.map((skill, k) => (
                      <span key={k} className={styles.skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};