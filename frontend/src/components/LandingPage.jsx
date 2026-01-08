import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="home">
      <h2>Welcome</h2>
      <p>Register or login to access your notes.</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </div>
    </div>
  );
}
