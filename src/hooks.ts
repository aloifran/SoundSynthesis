import { useRef } from "react";

// Creates a value exactly once and returns the same instance for the
// component's whole lifetime.
//
// Unlike `useRef(factory())`, the factory runs only on the first render — so
// it's safe for expensive/stateful objects (like Tone.js audio nodes) that
// must not be re-created, and leaked, on every re-render.
export function useConstant<T>(factory: () => T): React.MutableRefObject<T> {
  const ref = useRef<T | null>(null);
  if (ref.current === null) {
    ref.current = factory();
  }
  return ref as React.MutableRefObject<T>;
}
