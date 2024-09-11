export const timeout = (ms = 50000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
