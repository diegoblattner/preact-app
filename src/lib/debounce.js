function debounce(fn, time = 250) {
  let canRun = true;

  return () => {
    if (canRun) {
      canRun = false;
      setTimeout(() => {
        fn();
        canRun = true;
      }, time);
    }
  };
}

export { debounce };
