import { createContext, useState, useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  const value = {
    user,
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  if (loading) {
    return <p>loading...</p>;
  } else {
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
}
