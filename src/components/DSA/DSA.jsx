// src/components/DSA/DSA.jsx
import React from "react";
import styles from "./DSA.module.css";
import { useSheetData } from "../../hooks/useSheetData";
import { getImageUrl } from "../../utils";

export const DSA = () => {
  const { data, loading } = useSheetData("dsa");
  const dsa = data?.[0];

  // Parse bullet points JSON array stored in the sheet
 const bulletPoints = dsa
  ? Object.entries(dsa)
      .filter(([key]) => key.startsWith("bullet-"))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, val]) => val)
      .filter(Boolean)
  : [];

  return (
    <section className={styles.container} id="dsa">
      <h2 className={styles.title}>Data Structures and Algorithms</h2>
      {loading && <p>Loading...</p>}
      {dsa && (

        <div className={styles.content}>
          <img
            className={styles.heatmap}
            src={dsa["heatmap-link"]}
            alt="LeetCode Heatmap"
          />
          <div className={styles.otherContent}>
            <a className={styles.leetcodeLink} href={dsa["profile-link"]}>
  <img
    className={styles.leetcodeLogo}
    src={getImageUrl("dsa/leetcode.png")}
    alt="Leetcode Logo"
  />
  <div className={styles.leetcodeURLText}>{dsa["profile-url-text"]}</div>
</a>
            <div className={styles.leetcodeDetailsList}>
              {bulletPoints.map((point, i) => (
                <div key={i} className={styles.leetcodeDetailsListItem}>
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
