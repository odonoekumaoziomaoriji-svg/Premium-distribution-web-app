const reviewWrap = document.getElementById("reviewWrap");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const imgDiv = document.getElementById("imgDiv");
const personName = document.getElementById("personName");
const profession = document.getElementById("profession");
const description = document.getElementById("description");
// const surpriseMeBtn = document.getElementById("surpriseMeBtn");
// const chicken = document.querySelector(".chicken");

// let isChickenVisible;

let people = [
  {
    photo:
      'url("https://upload.wikimedia.org/wikipedia/commons/a/ab/Gtco_logo-generic.png")',
    name: "GTBANK GHANA",
    profession: "Commercial Bank",
    description: "Web Application Firewall",
  },

  {
    photo:
      "url('./assets/images/ecowas400.jpg')",
    name: "ECOWAS",
    profession: "Regional Economic Union",
    description: "Network Monitoring Solution",
  },

  {
    photo:
      "url('./assets/images/bodiva.jpg')",
    name: "BODIVA",
    profession: "Stock Exchange Company",
    description: "Patch Management Solution",
  },

  {
    photo:
      "url('https://thenationonlineng.net/wp-content/uploads/2020/05/TAJBank.png')",
    name: "TAJ BANK",
    profession: "Commercial Bank",
    description:
      "Privilege Access Management Solution",
  },

  {
    photo:
      "url('./assets/images/optimus-white.jpg')",
    name: "OPTIMUS BANK",
    profession: "Commercial Bank",
    description:
      "Privilege Access Management Solution",
  },

  {
    photo:
      "url('./assets/images/iita-removebg-preview.png')",
    name: "IITA",
    profession: "Government Institute",
    description:
      "Storage Solution",
  },
];

imgDiv.style.backgroundImage = people[0].photo;
personName.innerText = people[0].name;
profession.innerText = people[0].profession;
description.innerText = people[0].description;
let currentPerson = 0;

//Select the side where you want to slide
function slide(whichSide, personNumber) {
  let reviewWrapWidth = reviewWrap.offsetWidth + "px";
  let descriptionHeight = description.offsetHeight + "px";
  //(+ or -)
  let side1symbol = whichSide === "left" ? "" : "-";
  let side2symbol = whichSide === "left" ? "-" : "";

  let tl = gsap.timeline();

  // if (isChickenVisible) {
  // 	tl.to(chicken, {
  // 		duration: 0.4,
  // 		opacity: 0
  // 	});
  // }

  tl.to(reviewWrap, {
    duration: 0.9,
    opacity: 0,
    translateX: `${side1symbol + reviewWrapWidth}`,
  });

  tl.to(reviewWrap, {
    duration: 0,
    translateX: `${side2symbol + reviewWrapWidth}`,
  });

  setTimeout(() => {
    imgDiv.style.backgroundImage = people[personNumber].photo;
  }, 400);
  setTimeout(() => {
    description.style.height = descriptionHeight;
  }, 400);
  setTimeout(() => {
    personName.innerText = people[personNumber].name;
  }, 400);
  setTimeout(() => {
    profession.innerText = people[personNumber].profession;
  }, 400);
  setTimeout(() => {
    description.innerText = people[personNumber].description;
  }, 400);

  tl.to(reviewWrap, {
    duration: 0.9,
    opacity: 1,
    translateX: 0,
  });

  // if (isChickenVisible) {
  // 	tl.to(chicken, {
  // 		duration: 0.4,
  // 		opacity: 1
  // 	});
  // }
}

function setNextCardLeft() {
  if (currentPerson === 5) {
    currentPerson = 0;
    slide("left", currentPerson);
  } else {
    currentPerson++;
  }

  slide("left", currentPerson);
}

function setNextCardRight() {
  if (currentPerson === 0) {
    currentPerson = 5;
    slide("right", currentPerson);
  } else {
    currentPerson--;
  }

  slide("right", currentPerson);
}

leftArrow.addEventListener("click", setNextCardLeft);
rightArrow.addEventListener("click", setNextCardRight);

window.addEventListener("resize", () => {
  description.style.height = "100%";
});
