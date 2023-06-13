const allSections = document.querySelectorAll(".section");
const navBtnsContainer = document.querySelector(".nav-btns");
const allNavBtns = document.querySelectorAll(".nav-btn");
const mainBody = document.querySelector(".main");
const pdfContainer = document.getElementById("pdfContainer");
const progressBars = document.querySelectorAll(".progress-bar");

// To avoid constantly updating the HTML, just save static info here.
let UserData = {
  about_role: "Junior Software Developer",
  about_description: `Innovative and detail-oriented software developer with a passion for clean code, actively seeking new opportunities to apply my skills and contribute to impactful projects.`,
  skills: {
    HTML_CSS: 70,
    Javascript: 70,
    Python: 55,
    Java: 85,
    "C#": 80,
    "C++": 95,
    Angular: 70,
    DOT_NET: 90,
    Vue_Js: 75,
  },
  projects: [
    {
      title: "Shopping Site",
      text: `ASP.Net and Angular web application that accurately replicates a shopping website.
    Implemented essential features like DTO mapping, Tokenization services, and utilized Angular guards and
    interceptors for enhanced security.
    `,
      img: "#",
      link: "https://github.com/KushpreetViria/Shop-Site",
    },
    {
      title: "Pathfinding Visualization",
      text: `Interactive UI application using C/C++ and GLSL, showcasing various path-finding algorithms through
    the OpenGL graphics API. Employed different data structures to efficiently store algorithm information for visual
    display`,
      img: "img/pathfinding-visualization.png",
      link: "https://github.com/KushpreetViria/PathfindingVisualization",
    },
    {
      title: "3D/2D Platformer",
      text: `A platformer that can swap between 3D perspective and 2D orthogonal views. Written in opengl intermediate mode.`,
      img: "img/platformer.png",
      link: "https://github.com/KushpreetViria/3D-platformer",
    },
  ],
};

function populateUserData() {
  let element = document.getElementById("about_role");
  if (element) element.textContent = UserData["about_role"];

  element = document.getElementById("about_description");
  if (element) element.textContent = UserData["about_description"];

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

  window.scrollTo(0, 0);

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

function createProjectCardElement(title, text, img_path, project_link) {
  const card = document.createElement("div");
  card.classList.add("card", "project-card");

  const card_img = document.createElement("img");
  card_img.alt = "Image";
  card_img.classList.add("img-fluid", "img-thumbnail", "zoom-hover");
  card_img.src = img_path;

  const image_link = document.createElement("a");
  image_link.classList.add("image-wrapper");
  image_link.href = project_link;
  image_link.appendChild(card_img);
  card.appendChild(image_link);

  const card_title = document.createElement("h4");
  card_title.classList.add("card-title");
  card_title.appendChild(document.createTextNode(title));

  const card_text = document.createElement("p");
  card_text.classList.add("card-text");
  card_text.appendChild(document.createTextNode(text));

  const card_body = document.createElement("div");
  card_body.classList.add("card-body");
  card_body.appendChild(card_title);
  card_body.appendChild(card_text);
  card.appendChild(card_body);

  return card;
}

function appendProjects() {
  const projectContainer = document.querySelector(".projects-container");
  console.log("projectContainer", projectContainer);
  let last_child = null;

  UserData.projects.forEach((project) => {
    const childNodes = Array.from(projectContainer.childNodes).filter((e) => e.nodeName == "DIV"); //holds the div/row children
    last_child = childNodes[childNodes.length - 1];
    // if only title row exists, or last row is full, append new empty row
    if (childNodes.length == 1 || last_child.childNodes.length >= 3) {
      const row_div = document.createElement("div");
      row_div.classList.add("row", "mb-5", "h-100");
      projectContainer.appendChild(row_div);
      last_child = row_div;
    }
    const column_div = document.createElement("div");
    column_div.classList.add("col-sm");
    column_div.appendChild(createProjectCardElement(project.title, project.text, project.img, project.link));
    last_child.appendChild(column_div);
  });

  // fill up last row child with empty cards to align properly
  while (last_child.childNodes.length < 3) {
    const column_div = document.createElement("div");
    column_div.classList.add("col-sm");
    last_child.appendChild(column_div);
  }
}

window.onload = populateUserData();
sectionTransition();
allNavBtns[0].click(); //begin at about section
setupScrollSkillAnimations();
appendProjects();
