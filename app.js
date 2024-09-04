document.addEventListener("DOMContentLoaded", () => {
  animationLogic();
});

function getRandomNumber(start, end) {
  const randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;
  return randomNumber;
}

function getUniqueRandomNumbers(count) {
  const uniqueNumbers = new Set();
  while (uniqueNumbers.size < count) {
    const randomNumber = getRandomNumber(0, "avenged sevenfold".length);
    uniqueNumbers.add(randomNumber);
  }
  return uniqueNumbers;
}

function animationLogic() {
  const textContainer = document.getElementById("animatedText");
  const text = textContainer.textContent;
  textContainer.textContent = "";

  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    if (char !== "") {
      span.classList.add("animated");
    }
    textContainer.appendChild(span);
  });

  const spans = textContainer.querySelectorAll("span");
  const transitioning = new Set();
  setInterval(() => {
    const ITERATIONS = getUniqueRandomNumbers(3);
    for (let i = 0; i < spans.length; i++) {
      if (ITERATIONS.has(i) && !transitioning.has(i)) {
        if (spans[i].innerText !== "") {
          spans[i].classList.add("animated");
          transitioning.add(i);
          setTimeout(() => {
            spans[i].style.opacity = "0";
            spans[i].style.filter = "blur(1rem)";
            spans[i].style.transform = "matrix(1,0,0,2,0,-200)";
          }, 0);

          spans[i].addEventListener("transitionend", () => {
            spans[i].classList.remove("animated");
            spans[i].style.opacity = "0";
            spans[i].style.filter = "blur(1rem)";
            spans[i].style.transform = "matrix(1,0,0,2,0,0)";
            transitioning.delete(i);
          });
        }
      }
    }
  }, 1000);
}
