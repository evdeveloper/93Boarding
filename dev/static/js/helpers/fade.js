export const fadeIn = (element, display = "block", duration = 500) => {
  return new Promise((resolve) => {
    element.style.opacity = 0;
    element.style.display = display;
    const startTime = performance.now();

    function animateFadeIn(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      element.style.opacity = progress;

      if (progress < 1) {
        requestAnimationFrame(animateFadeIn);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(animateFadeIn);
  });
};


export const fadeOut = (element, duration = 500) => {
  return new Promise((resolve) => {
    const startTime = performance.now();

    function animateFadeOut(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      element.style.opacity = 1 - progress;

      if (progress < 1) {
        requestAnimationFrame(animateFadeOut);
      } else {
        element.style.display = "none";
        resolve(); // Анимация завершена, выполняем Promise
      }
    }

    requestAnimationFrame(animateFadeOut);
  });
};
