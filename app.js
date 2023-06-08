const allSections = document.querySelectorAll(".section");
const navBtnsContainer = document.querySelector(".nav-btns");
const allNavBtns = document.querySelectorAll(".nav-btn");
const mainBody = document.querySelector(".main");
const pdfContainer = document.getElementById("pdfContainer");

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.107/pdf.worker.js";

// To avoid constantly updating the HTML, just save static info here.
let UserData = {
  "about-role": "Junior Software Developer",
  "about-description": `As a recent computer science graduate with a deep understanding of SOLID principles and strong technical skills in
  multiple programming languages, I am passionate about programming and problem-solving. My experience collaborating to
  develop web applications using VueJS, Dot Net frameworks, and Cloud-based AWS services has equipped me with the ability to
  create efficient, scalable solutions that meet real-world business needs. I am particularly interested in the intricacies
  of low-level programming and enjoy uncovering the inner workings of languages and libraries. Very eager to explore new
  opportunities that allow me to continue pursuing my passions.`,
};
function populateUserData() {
  for (const id in UserData) {
    if (Object.hasOwnProperty.call(UserData, id)) {
      const data = UserData[id];
      const element = document.getElementById(id);
      if (element) element.textContent = data;
    }
  }
}
window.onload = populateUserData();

// add listeners for transition between sections
function sectionTransition() {
  const clearActiveBtns = function () {
    let currActiveBtns = document.querySelectorAll(".active-btn");
    currActiveBtns.forEach((btn) => {
      btn.classList.remove("active-btn");
    });
  };

  const clearActiveSection = function () {
    let currActiveSection = document.querySelector(".section.active");
    destroy_section(currActiveSection);
    currActiveSection.classList.remove("active");
  };

  allNavBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      clearActiveBtns();
      btn.classList.add("active-btn");

      clearActiveSection();
      const dataid = btn.dataset.id;
      const target = document.getElementById(dataid);
      target.classList.add("active");

      console.log(document.getElementById("pdfContainer"));
      setup_section(target);
    });
  });
}
sectionTransition();

function destroy_section(section) {
  if (section.classList.contains("section2") && section.classList.contains("resume")) {
    console.log("destroying...");
    const canvas = pdfContainer.querySelector("canvas");
    if (canvas) canvas.remove();
  }
}

function setup_section(section) {
  console.log("setting up...");

  if (section.classList.contains("section2") && section.classList.contains("resume")) {
    pdfjsLib.getDocument("docs/resume.pdf").promise.then((pdf) => {
      pdf.getPage(1).then((page) => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        pdfContainer.appendChild(canvas);
        page.render({
          canvasContext: context,
          viewport: viewport,
        });
      });
    });
  }
}
