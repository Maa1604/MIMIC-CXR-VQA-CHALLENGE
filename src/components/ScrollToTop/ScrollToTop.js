import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // 1. Force manual scroll restoration so browser doesn't fight us
    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }

    // Function to perform the scrolling
    const performScroll = () => {
        // A. Scroll the main window
        window.scrollTo(0, 0);

        // B. Scroll the ".page-content" div just in case IT is the scrollable one
        // (Since you use this class in App.js as the main wrapper)
        const contentDiv = document.querySelector('.page-content');
        if (contentDiv) {
            contentDiv.scrollTo(0, 0);
        }
    };

    // 2. Run immediately
    performScroll();

    // 3. Run again after a tiny delay (50ms)
    // This fixes the "sometimes works" issue caused by large pages/images loading slightly slower
    const timer = setTimeout(() => {
        performScroll();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}