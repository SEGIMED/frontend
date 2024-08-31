export const isUserUsingMobile = () => {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  const isMobileUA =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  if (isMobileUA) {
    return true;
  }

  const screenWidth = window.screen.width;
  if (screenWidth < 768) {
    return true;
  }

  const hasTouch =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;
  if (hasTouch) {
    return true;
  }

  const matchMediaMobile = window.matchMedia("(max-width: 768px)").matches;
  if (matchMediaMobile) {
    return true;
  }

  return false;
};
