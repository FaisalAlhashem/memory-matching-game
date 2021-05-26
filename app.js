//getting dom elements
const pads = document.querySelectorAll(".pad");
const scoreSpan = document.querySelector(".score");
const unassignedPads = [...pads];
const assignedPads = [];
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
  score = 0;

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
  select1.classList.toggle("show");
  select1.classList.toggle("hidden");
  select2.classList.toggle("show");
  select2.classList.toggle("hidden");
  select1.style.color = select1.classList.contains("show") ? "#000000" : "";
  select2.style.color = select2.classList.contains("show") ? "#000000" : "";
  select1 = null;
  select2 = null;
};

// adding event listeners
for (const pod of pads) {
  pod.addEventListener("click", function (e) {
    const curPad = e.target;
    curPad.classList.toggle("show");
    curPad.classList.toggle("hidden");
    curPad.style.color = curPad.classList.contains("show") ? "#000000" : "";
    if (select1) {
      select2 = curPad;
      if (select1.textContent === select2.textContent) {
        score++;
      } else setTimeout(failed(), 100);
    } else select1 = curPad;
    console.log(select1, select2);
  });
}
