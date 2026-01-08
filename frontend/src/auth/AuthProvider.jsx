import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onIdTokenChanged } from "firebase/auth";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fires on login/logout AND whenever Firebase refreshes the token
    const unsub = onIdTokenChanged(auth, async (u) => {
      setUser(u);
      if (!u) {
        setIdToken(null);
        setLoading(false);
        return;
      }
      try {
        const tok = await u.getIdToken(); // latest token for this session
        setIdToken(tok);
      } catch {
        setIdToken(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  return (
    <AuthCtx.Provider value={{ user, idToken, loading }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}
