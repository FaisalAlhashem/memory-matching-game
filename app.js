//getting dom elements
const unassignedPads = [...document.querySelectorAll(".pad")];
const scoreSpan = document.querySelector(".score");
const winMessage = document.querySelector(".congrats");
const assignedPads = [];
const solvedPads = [];
let options = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
];
let select1 = null,
  select2 = null,
  score = 30,
  on = true;
scoreSpan.textContent = `score: ${score}`;

const getUnassignedPad = () => {
  const rand = Math.floor(Math.random() * unassignedPads.length);
  pad = unassignedPads[rand];
  if (pad === undefined) return null;
  unassignedPads.splice(unassignedPads.indexOf(pad), 1);
  return pad;
};

for (let i = 0; i < 8; i++) {
  const hiddenElement = options[Math.floor(Math.random() * options.length)];
  const index = options.indexOf(hiddenElement);
  if (index > -1) {
    options.splice(index, 1);
    for (let j = 0; j < 2; j++) {
      const pad = getUnassignedPad();
      if (pad === null) {
        console.log(`pad nulled`);
        continue;
      }
      pad.textContent = hiddenElement;
      assignedPads.push(pad);
    }
  }
}
const failed = () => {
  on = false;
  select1.classList.toggle("show");
  select1.classList.toggle("hidden");
  select2.classList.toggle("show");
  select2.classList.toggle("hidden");
  select1.style.color = select1.classList.contains("show") ? "#000000" : "";
  select2.style.color = select2.classList.contains("show") ? "#000000" : "";
  select1 = null;
  select2 = null;
  on = true;
};

// adding event listeners
for (const pod of assignedPads) {
  pod.addEventListener("click", function (e) {
    if (score <= 0) {
      alert("you lost the game");
      return;
    }
    const curPad = e.target;
    if (curPad.classList.contains("show")) return;
    if (!on) return;
    curPad.classList.toggle("show");
    curPad.classList.toggle("hidden");
    curPad.style.color = curPad.classList.contains("show") ? "#000000" : "";
    if (select1) {
      select2 = curPad;
      if (select1.textContent === select2.textContent) {
        scoreSpan.textContent = `score: ${score}`;
        solvedPads.push(select1);
        solvedPads.push(select2);
        select1 = null;
        select2 = null;
      } else {
        on = false;
        score--;
        scoreSpan.textContent = `score: ${score}`;
        setTimeout(failed, 500);
      }
    } else select1 = curPad;
    if (solvedPads.length >= 16) {
      winMessage.classList.toggle("hide");
      on = !on;
    }
  });
}
