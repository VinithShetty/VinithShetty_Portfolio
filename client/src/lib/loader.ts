// Shared "page is ready" signal. The loader resolves it as it lifts away, so the hero entrance
// (and anything else that should wait) starts as the page is revealed, not behind the loading screen.
let resolve!: () => void;
export const whenReady = new Promise<void>((r) => (resolve = r));
export const loaderState = { done: false };
/** Resolves once the loading screen has fully left (scrolling is unlocked again). */
let gone!: () => void;
export const whenGone = new Promise<void>((r) => (gone = r));
export const loaderGone = () => gone();
export const finishLoader = () => {
  loaderState.done = true;
  resolve();
};
