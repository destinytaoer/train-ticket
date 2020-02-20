export function h0(timestamp = Date.now()) {
  const target = new Date(timestamp);

  target.setHours(0);
  target.setMinutes(0);
  target.setSeconds(0);
  target.setMilliseconds(0);

  return target.getTime();
}

export function debounce(fn, cb, wait = 350) {
  let timer;
  return function(...args) {
    let context = this;

    if (timer) {
      clearTimeout(timer);
      cb.apply(context, args);
    }

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
