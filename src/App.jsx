import { useEffect } from "react";
import styles from "./App.module.css";
import { About } from "./components/About/About";
import { Contact } from "./components/Contact/Contact";
import { Skills } from "./components/Skills/Skills";
import { Intro } from "./components/Intro/Intro";
import { Navbar } from "./components/Navbar/Navbar";
import { Projects } from "./components/Projects/Projects";
import { DSA } from "./components/DSA/DSA";
import { Experience } from "./components/Experience/Experience";

function App() {
  useEffect(() => {
    document.querySelectorAll("a").forEach((link) => {
      if (!link.getAttribute("target")) {
        link.setAttribute("target", "_blank");
      }
    });
  }, []);

  return (
    <div className={styles.App}>
      <Navbar />
      <Intro />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <DSA />
      <Contact />
    </div>
  );
}

export default App;
