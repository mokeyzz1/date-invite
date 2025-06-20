window.onload = () => {
  setTimeout(() => {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('screen').style.display = 'flex';
  }, 2500);
};

let currentScreen = 1;
let answers = {};

function handleYes() {
  if (currentScreen === 1) {
    createHearts();
    fireCupid();
    setTimeout(() => goToScreen2(), 900);
  } else if (currentScreen === 3) {
    goToScreen4();
  }
}

function handleNo() {
  if (currentScreen === 1) {
    const text = document.getElementById('text');
    const buttons = document.getElementById('buttons');
    text.innerText = "Are you gonna make me ask again? 😏";
    buttons.innerHTML = "";
    setTimeout(() => {
      text.innerText = "Ready for a little adventure? 😉";
      buttons.innerHTML = `
        <button onclick="handleYes()">YES</button>
        <button onclick="handleNo()">NO</button>
      `;
    }, 2500);
  }
}

function goToScreen2() {
  currentScreen = 2;
  document.getElementById('text').innerText =
    "Let’s pick dinner!\nDon’t worry, no Mexican or Indian, I promise 😅";
  const buttons = document.getElementById('buttons');
  buttons.classList.remove("button-row");
  buttons.innerHTML = `
    <button onclick="selectDinner('🍝 Italian Wine & Pasta Night')">🍝 Italian Wine & Pasta Night</button>
    <button onclick="selectDinner('🥩 Steakhouse Energy')">🥩 Steakhouse Energy</button>
    <button onclick="selectDinner('🥂 Surprise Me 😉')">🥂 Surprise Me 😉</button>
  `;
}

function selectDinner(choice) {
  answers["Dinner"] = choice;
  document.getElementById('text').innerText =
    `Perfect. I’ll make it special. ✨\n\n(${choice})`;
  document.getElementById('buttons').innerHTML = `
    <button onclick="goToScreen3()">What about dessert? 😋</button>
  `;
}

function goToScreen3() {
  currentScreen = 3;
  document.getElementById('text').innerText =
    "Oh, and one more thing…\nDress code: look good, feel good.";
  document.getElementById('buttons').innerHTML = `
    <button onclick="goToScreen4()">Lock it in 💌</button>
  `;
}

function goToScreen4() {
  currentScreen = 4;
  answers["Confirmed"] = "Yes";

  document.getElementById('text').innerText =
    "All set.\nDon’t be late… unless you want me to come find you 😏";

  document.getElementById('buttons').innerHTML = `
    <button onclick="finish()">I’ll be ready 💃🏽</button>
  `;

  // Send to Google Sheet
  fetch("https://script.google.com/macros/s/AKfycbwkSe6SEOWI4BCs3F0cTTCB2jt9nxYOREPt984tcRME1f8U0n374nKjbNVfBUtYSz2C/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answers),
  });
}

function finish() {
  alert("See you soon 💃🏽");
}

function createHearts() {
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = "❤️";
    heart.style.left = `${Math.random() * window.innerWidth}px`;
    heart.style.top = `${window.innerHeight - 50}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2500);
  }
}

function fireCupid() {
  const cupid = document.getElementById('cupid');
  const arrow = document.getElementById('arrow');

  cupid.classList.remove('hidden');
  cupid.style.left = 'calc(50vw - 100px)';

  setTimeout(() => {
    arrow.style.left = '120vw';
  }, 1500);

  setTimeout(() => {
    cupid.classList.add('hidden');
    arrow.style.left = '24px';
  }, 4000);
}

const data = {
  Dinner: selectedDinner,
  Dessert: "Yes 🍰",
  Outfit: "Locked in 💌",
  FinalClicked: "💃🏽"
};

fetch("https://script.google.com/macros/s/AKfycbwkSe6SEOWI4BCs3F0cTTCB2jt9nxYOREPt984tcRME1f8U0n374nKjbNVfBUtYSz2C/exec", {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  }
});
