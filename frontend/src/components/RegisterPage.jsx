import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/app/home");
    } catch (e2) {
      setErr(e2.message);
    }
  };

  return (
    <div className="home">
      <h2>Register</h2>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10, maxWidth: 320, margin: "0 auto" }}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>

      {err && <p style={{ color: "crimson" }}>{err}</p>}

      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>

      <div style={{ marginTop: 12 }}>
        <Link to="/"><button>Home</button></Link>
      </div>
    </div>
  );
}
