import React, { useState, useEffect } from "react";
import "./assets/css/index.css";

// Pages
import Experience from "./pages/Experience/Experience";
import Contact from "./pages/Contact/Contact";
import Projects from "./pages/Projects/Projects";
import Header from "./pages/Header/Header";
import Hero from "./pages/Hero/Hero";
import Skills from "./pages/Skills/Skills";
import Education from "./pages/Education/Education";

// Router
import { Route, Routes, useNavigate } from "react-router-dom";

export default function App() {
  const [isOnePage, setIsOnePage] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [question, setQuestion] = useState({ num1: 0, num2: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setQuestion({ num1, num2 });
  }, []);

  const handleVerification = (e) => {
    e.preventDefault();
    const correct = question.num1 + question.num2;
    if (parseInt(userAnswer) === correct) {
      setIsVerified(true);
      navigate("/");
    } else {
      alert("⚠️ Wrong answer. Try again!");
    }
  };

  // Show security question first
  if (!isVerified) {
    return (
      <div style={styles.container} className="security-container">
        <img
          src="@/assets/images/megana.jpg"
          alt="Profile"
          style={styles.profileImage}
          className="profile-pic"
        />
        <h2 style={styles.heading} className="fade-in">
          Security Check: What is {question.num1} + {question.num2}?
        </h2>
        <form onSubmit={handleVerification} className="fade-in">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
            style={styles.input}
            className="animated-input"
          />
          <button type="submit" style={styles.button} className="animated-button">
            Enter to Megana Portfolio
          </button>
        </form>
      </div>
    );
  }

  // Show portfolio after verification
  return (
    <>
      <Header />
      {isOnePage ? (
        <>
          <Hero />
          <Skills />
          <Experience />
          <Education />
          <Projects />
          <Contact />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      )}
    </>
  );
}

// Inline styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    fontFamily: "sans-serif",
    padding: "20px",
    textAlign: "center",
  },
  profileImage: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #ff66b2",
    marginBottom: "20px",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "200px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#ff66b2",
    color: "#fff",
    cursor: "pointer",
  },
  
};
