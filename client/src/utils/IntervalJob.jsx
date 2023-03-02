const DEFAULT_OPTIONS = {
  event: () => {},
  intervalTime: 0,
};
export default class IntervalJob {
  #intervalId = null;
  #options = null;

  constructor(opts = DEFAULT_OPTIONS) {
    this.#options = { ...DEFAULT_OPTIONS, ...opts };
  }

  start = () => {
    if (!this.#options) {
      return;
    }
    this.suspend();
    const { event, intervalTime } = this.#options;
    this.#intervalId = setInterval(event, intervalTime);
  };

  suspend = () => {
    if (this.#intervalId) {
      clearInterval(this.#intervalId);
      this.#intervalId = null;
    }
  };

  stop = () => {
    this.suspend();
    this.#options = null;
  };
}
