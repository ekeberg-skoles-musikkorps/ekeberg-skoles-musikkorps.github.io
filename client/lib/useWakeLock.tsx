import { useEffect, useState } from "react";

export function useWakeLock() {
  const [wakeLockSentinel, setWakeLockSentinel] = useState<WakeLockSentinel>();
  useEffect(() => {
    navigator.wakeLock.request("screen").then((s) => {
      setWakeLockSentinel(s);
    });
    return () => {
      wakeLockSentinel?.release().then();
    };
  }, []);
}
