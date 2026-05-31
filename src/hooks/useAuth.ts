import { GoogleAuthProvider, User, UserCredential, getRedirectResult, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { STORAGE_KEYS } from "../utils/storage";

let redirectHandled = false;
let redirectResultPending = false;

const googleProvider = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return provider;
};

const setRedirectPending = () => {
  try {
    localStorage.setItem(STORAGE_KEYS.pendingGoogleRedirect, "true");
  } catch {
    // localStorage can be unavailable in private contexts.
  }
};

const clearRedirectPending = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.pendingGoogleRedirect);
  } catch {
    // localStorage can be unavailable in private contexts.
  }
};

const isRedirectPending = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEYS.pendingGoogleRedirect) === "true";
  } catch {
    return false;
  }
};

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

    if (!redirectHandled) {
      redirectHandled = true;
      redirectResultPending = true;

      void getRedirectResult(auth)
        .then((result) => {
          redirectResultPending = false;
          if (result?.user) {
            clearRedirectPending();
            setUser(result.user);
          } else {
            clearRedirectPending();
          }
        })
        .catch((caught) => {
          redirectResultPending = false;
          clearRedirectPending();
          setError(caught instanceof Error ? caught.message : "Não foi possível concluir o login.");
        })
        .finally(() => {
          window.clearTimeout(timeout);
          setLoading(false);
        });
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (nextUser) => {
        if (!nextUser && (isRedirectPending() || redirectResultPending)) return;
        window.clearTimeout(timeout);
        if (nextUser) {
          clearRedirectPending();
        }
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

  const signInWithGoogle = useCallback(async (): Promise<UserCredential | undefined> => {
    setError(null);
    if (!auth) {
      setError("Configure o Firebase no arquivo .env para autenticar.");
      return undefined;
    }

    try {
      setRedirectPending();
      await signInWithRedirect(auth, googleProvider());
      return undefined;
    } catch (caught) {
      clearRedirectPending();
      setError(caught instanceof Error ? caught.message : "Não foi possível autenticar.");
      return undefined;
    }
  }, []);

  const logout = useCallback(() => runAuthAction(() => signOut(auth!)), [runAuthAction]);

  return { user, loading, error, signInWithGoogle, logout };
}
