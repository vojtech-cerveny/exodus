import { useEffect, useState } from 'react';

export const useScreenDetector = () => {
  // Initialize width with a default value for SSR or initial render
  const [width, setWidth] = useState(1000);

  useEffect(() => {
    // Set width to actual window width once the component has mounted
    setWidth(window.innerWidth);

    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowSizeChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []); // Empty dependency array ensures this effect only runs once on mount

  const isMobile = width <= 768;
  const isTablet = width > 768 && width <= 1024;
  const isDesktop = width > 1024;

  return { isMobile, isTablet, isDesktop };
};
