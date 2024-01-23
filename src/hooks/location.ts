import { useEffect, useState } from "react";

export const useLocationUrl = () => {
  const [url, setUrl] = useState(new URL(window.location.href));
  useEffect(() => {
    let oldHref = document.location.href;
    const body = document.querySelector("body")!;
    const observer = new MutationObserver(() => {
      if (oldHref !== document.location.href) {
        oldHref = document.location.href;
        setUrl(new URL(document.location.href));
      }
    });
    observer.observe(body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
  }, []);
  return url;
};
