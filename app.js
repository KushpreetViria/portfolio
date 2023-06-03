const allSections = document.querySelectorAll(".section");
const navBtnsContainer = document.querySelector(".nav-btns");
const allNavBtns = document.querySelectorAll(".nav-btn");
const mainBody = document.querySelector(".main");

function sectionTransition() {
  const clearActiveBtns = function () {
    let currActiveBtns = document.querySelectorAll(".active-btn");
    currActiveBtns.forEach((btn) => {
      btn.classList.remove("active-btn");
    });
  };

  const clearActiveSection = function () {
    let currActiveSection = document.querySelector(".section.active");
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
    });
  });
}

sectionTransition();
