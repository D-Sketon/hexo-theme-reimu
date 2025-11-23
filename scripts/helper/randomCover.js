let shuffledCovers = [];
let currentIndex = 0;

// Fisher-Yates
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

hexo.extend.helper.register("randomCover", () => {
  let covers = hexo.locals.get("covers");
  if (!covers || covers.length === 0) {
    return null;
  }

  if (shuffledCovers.length === 0 || currentIndex >= shuffledCovers.length) {
    shuffledCovers = shuffleArray(covers);
    currentIndex = 0;
  }

  const cover = shuffledCovers[currentIndex];
  currentIndex++;
  
  return cover;
});
