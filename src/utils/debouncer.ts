export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let debounceTimer: number | NodeJS.Timeout;

  return function (this: any, ...args: any[]) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
};
