import {useNavigation} from '@react-navigation/native';
import {useRef, useEffect, useMemo} from 'react';

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void | null>();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });
  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback?.current !== 'undefined') {
        savedCallback?.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useIsFocused(callback: () => void, delay: number | null) {
  // const savedCallback = useRef<() => void |
  const navigation = useNavigation();
  const isFocused = useMemo(() => navigation.isFocused(), []);
  useEffect(() => {
    if (isFocused) {
      callback();
    }
  }, [isFocused]);
}
export default useInterval;
