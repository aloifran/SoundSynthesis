import { useEffect, useRef } from "react";

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

// Tracks whether `ref`'s element is on screen, stored in a ref so updates don't
// trigger re-renders. A p5 draw loop can read `.current` each frame and skip
// its work (and the underlying audio analysis) while scrolled off screen.
export function useIsVisibleRef(ref: React.RefObject<Element>) {
  const visible = useRef(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return visible;
}
