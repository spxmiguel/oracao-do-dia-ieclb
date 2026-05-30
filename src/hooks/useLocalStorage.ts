import { useCallback, useState } from "react";

type SetValue<T> = T | ((previous: T) => T);

export function useLocalStorage<T>(key: string, initialValue: T) {
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [initialValue, key]);

  const [value, setValue] = useState<T>(readValue);

  const setStoredValue = useCallback(
    (nextValue: SetValue<T>) => {
      setValue((previous) => {
        const resolved = nextValue instanceof Function ? nextValue(previous) : nextValue;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // localStorage may be unavailable in private contexts.
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, setStoredValue] as const;
}
