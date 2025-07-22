import throttle from 'lodash/throttle';

export default function ExitIntent(options = {}) {
  const defaultOptions = {
    threshold: 25,
    maxDisplays: 1,
    eventThrottle: 200,
    onExitIntent: () => {},
  };

  return (function () {
    const config = { ...defaultOptions, ...options };
    const eventListeners = new Map();
    let displays = 0;
    let lastPoint = { y: null };

    const addEvent = (eventName, callback) => {
      document.addEventListener(eventName, callback, false);
      eventListeners.set(`document:${eventName}`, { eventName, callback });
    };

    const removeEvent = (key) => {
      const { eventName, callback } = eventListeners.get(key);
      document.removeEventListener(eventName, callback);
      eventListeners.delete(key);
    };

    const mouseDidMove = (event) => {
      if (
        event.clientY < lastPoint.y &&
        event.clientY <= config.threshold &&
        displays < config.maxDisplays
      ) {
        displays++;
        config.onExitIntent();
        if (displays >= config.maxDisplays) {
          removeEvents();
        }
      }
      lastPoint.y = event.clientY;
    };

    const removeEvents = () => {
      eventListeners.forEach((value, key, map) => removeEvent(key));
    };

    addEvent('mousemove', throttle(mouseDidMove, config.eventThrottle));

    return removeEvents;
  })();
}
