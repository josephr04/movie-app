import { useEffect } from "react";

export function UseInfiniteScroll(callback: () => void) {
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100;

      if (bottom) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback]);
}
