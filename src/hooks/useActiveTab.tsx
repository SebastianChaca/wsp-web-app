import { useEffect, useState } from 'react';

const useActiveTab = (): boolean => {
  const [isTabActive, setIsTabActive] = useState(true);

  const [isBrowserActive, setIsBrowserActive] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    const handleWindowFocus = () => {
      setIsBrowserActive(true);
    };

    const handleWindowBlur = () => {
      setIsBrowserActive(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  return isTabActive && isBrowserActive;
};

export default useActiveTab;
