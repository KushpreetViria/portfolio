const allSections = document.querySelectorAll(".section");
const navBtnsContainer = document.querySelector(".nav-btns");
const allNavBtns = document.querySelectorAll(".nav-btn");
const mainBody = document.querySelector(".main");
const pdfContainer = document.getElementById("pdfContainer");
const progressBars = document.querySelectorAll(".progress-bar");

// To avoid constantly updating the HTML, just save static info here.
let UserData = {
  about_role: "Junior Software Developer",
  about_description: `As a recent computer science graduate with a deep understanding of SOLID principles and strong technical skills in
  multiple programming languages, I am passionate about programming and problem-solving. My experience collaborating to
  develop web applications using VueJS, Dot Net frameworks, and Cloud-based AWS services has equipped me with the ability to
  create efficient, scalable solutions that meet real-world business needs. I am particularly interested in the intricacies
  of low-level programming and enjoy uncovering the inner workings of languages and libraries. Very eager to explore new
  opportunities that allow me to continue pursuing my passions.`,
  skills: {
    HTML_CSS: 70,
    Javascript: 60,
    Python: 55,
    Java: 85,
    "C#": 80,
    "C++": 95,
  },
};

function populateUserData() {
  for (const id in UserData) {
    if (Object.hasOwnProperty.call(UserData, id)) {
      const data = UserData[id];
      const element = document.getElementById(id);
      if (element) element.textContent = data;
    }
  }
  document.querySelectorAll(".progress-percentage").forEach((ele) => {
    ele.textContent = UserData.skills[ele.dataset.id] + "%";
  });
}

// ------------------ section functions -------------------//

let setup_section1 = false;

// add listeners for transition between sections
function sectionTransition() {
  const clearActiveBtns = function () {
    let currActiveBtn = document.querySelector(".active-btn");
    currActiveBtn?.classList.remove("active-btn");
  };

  const clearActiveSection = function () {
    let currActiveSection = document.querySelector(".section.active");
    destroy_section(currActiveSection);
    currActiveSection?.classList.remove("active");
  };

  allNavBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      clearActiveBtns();
      btn.classList.add("active-btn");

      clearActiveSection();
      const dataid = btn.dataset.id;
      const target = document.getElementById(dataid);
      target.classList.add("active");

      setup_section(target);
      e.preventDefault();
    });
  });
}

// section destructor
function destroy_section(section) {
  if (!section) return;
}

// section constructor
function setup_section(section) {
  if (!section) return;
  if (!setup_section1 && section.classList.contains("section1") && section.classList.contains("about")) {
    let contactBtn = document.getElementById("about-contact-btn");
    contactBtn.addEventListener("click", (e) => {
      allNavBtns[3].click();
    });
    setup_section1 = true;
  }
}

// skill section animation
function setupScrollSkillAnimations() {
  const animateSkills = function () {
    progressBars.forEach((bar) => {
      const animation = bar.animate(
        [
          {
            width: "0%",
          },
          {
            width: UserData.skills[bar.dataset.id] + "%",
          },
        ],
        1500
      );
      animation.finished.then((e) => {
        bar.style.width = UserData.skills[bar.dataset.id] + "%";
      });
    });
  };

  // if the progress bars come into viewport, trigger animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) animateSkills();
    });
  });

  observer.observe(document.getElementById("skill-progress-box"));
}

window.onload = populateUserData();
sectionTransition();
allNavBtns[0].click(); //begin at about section
setupScrollSkillAnimations();
