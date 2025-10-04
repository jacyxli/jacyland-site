import type { Transition } from "framer-motion";

export const defaultTransition: Transition = {
  duration: 0.5,
  ease: [0.2, 0.8, 0.2, 1],
};

export const slowTransition: Transition = {
  duration: 0.8,
  ease: [0.2, 0.8, 0.2, 1],
};

export const fastTransition: Transition = {
  duration: 0.25,
  ease: [0.2, 0.8, 0.2, 1],
};

export const footerTransition: Transition = {
  duration: 0.3,
  ease: "easeInOut",
};
