export  function throttle(cb: any, delay: any) {
  let wait = false;
  // @ts-ignore
  let storedArgs = null;

  function checkStoredArgs () {
    // @ts-ignore
    if (storedArgs == null) {
      wait = false;
    } else {
      // @ts-ignore
      cb(...storedArgs);
      storedArgs = null;
      setTimeout(checkStoredArgs, delay);
    }
  }

  // @ts-ignore
  return (...args) => {
    if (wait) {
      storedArgs = args;
      return;
    }

    cb(...args);
    wait = true;
    setTimeout(checkStoredArgs, delay);
  }
}
