import { GoogleAuthProvider, User, UserCredential, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { auth } from "../config/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      setUser(null);
      setLoading(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      setLoading(false);
    }, 4500);

    const unsubscribe = onAuthStateChanged(
      auth,
      (nextUser) => {
        window.clearTimeout(timeout);
        setUser(nextUser);
        setLoading(false);
      },
      (caught) => {
        window.clearTimeout(timeout);
        setError(caught.message);
        setUser(null);
        setLoading(false);
      }
    );

    return () => {
      window.clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const runAuthAction = useCallback(async <T,>(action: () => Promise<T>): Promise<T | undefined> => {
    setError(null);
    setLoading(true);
    try {
      if (!auth) {
        throw new Error("Configure o Firebase no arquivo .env para autenticar.");
      }
      return await action();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível autenticar.");
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = useCallback(
    (): Promise<UserCredential | undefined> => runAuthAction(() => signInWithPopup(auth!, new GoogleAuthProvider())),
    [runAuthAction]
  );

  const logout = useCallback(() => runAuthAction(() => signOut(auth!)), [runAuthAction]);

  return { user, loading, error, signInWithGoogle, logout };
}
