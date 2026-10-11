import type Lenis from "lenis";

/** Module-level handle so any client component can pause/resume smooth scroll. */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;
