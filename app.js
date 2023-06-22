const allSections = document.querySelectorAll(".section");
const navBtnsContainer = document.querySelector(".nav-btns");
const allNavBtns = document.querySelectorAll(".nav-btn");
const mainBody = document.querySelector(".main");
const pdfContainer = document.getElementById("pdfContainer");
const progressBars = document.querySelectorAll(".progress-bar");

// ------------------ Data population -------------------//
// To avoid constantly updating the HTML, just save static info here.

let UserData = {
  about_role: "Junior Software Developer",
  about_description: `Innovative and detail-oriented software developer with a passion for writing clean code. Actively seeking new opportunities as junior software developer to apply my skills and contribute to impactful projects.`,
  about_me_summary: `Hello, I'm Kushpreet, and I'm passionate about building things through software. My journey as a developer began when I took computer science classes in high school. It was during 
  this time that I discovered my love for creating games and exploring the various possibilities that coding offers. Throughout the years, I have refined my skills and expanded my knowledge by working 
  on small projects and developing games. Currently, I am a computer science graduate with approximately one year of professional experience and a total of five years of experience in the field. Through 
  my professional experiences, I have developed a strong interest in web development and working with graphics. I am now seeking a junior developer position to kick-start my career and learn from seasoned 
  professionals. I am open to any industry as I am still eager to grow and learn.`,
  my_address: "Winnipeg, Manitoba, Canada",
  my_phone_number: "+1 (431) 996 6587",
  my_email: "kviria27@gmail.com",
  linkedin_link: "https://www.linkedin.com/in/kushpreet-viria/",
  github_link: "https://github.com/KushpreetViria",
  leetcode_link: "https://leetcode.com/MushyBear/",
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
      img: "img/shopping-site.png",
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
  const populateElement = function (key) {
    let element = document.getElementById(key);
    if (element) element.textContent = UserData[key];
  };

  const attachClickListener = function (key) {
    let element = document.getElementById(key);
    if (element) element.addEventListener("click", () => window.open(UserData[key], "_blank"));
  };

  populateElement("about_role");
  populateElement("about_description");
  populateElement("about_me_summary");
  populateElement("my_address");
  populateElement("my_phone_number");
  populateElement("my_email");

  attachClickListener("linkedin_link");
  attachClickListener("github_link");
  attachClickListener("leetcode_link");

  document.querySelectorAll(".progress-percentage").forEach((ele) => {
    ele.textContent = UserData.skills[ele.dataset.id] + "%";
  });

  let contactBtn = document.getElementById("about-contact-btn");
  contactBtn?.addEventListener("click", (e) => {
    allNavBtns[3].click();
  });
}

// ------------------ section functions -------------------//

// add listeners for transition between sections
function sectionTransition() {
  const clearActiveBtns = function () {
    let currActiveBtn = document.querySelector(".active-btn");
    currActiveBtn?.classList.remove("active-btn");
  };

  const clearActiveSection = function () {
    let currActiveSection = document.querySelector(".section.active");
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

      window.scrollTo(0, 0);
      e.preventDefault();
    });
  });
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

// ---------- project section populate ----------
function appendProjects() {
  const createProjectCardElement = function (title, text, img_path, project_link) {
    const card = document.createElement("div");
    card.classList.add("card", "project-card");

    const card_img = document.createElement("img");
    card_img.alt = "Image";
    card_img.classList.add("img-fluid", "img-thumbnail", "zoom-hover");
    card_img.src = img_path;

    const image_link = document.createElement("a");
    image_link.classList.add("image-wrapper");
    image_link.href = project_link;
    image_link.target = "_blank";
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
  };

  const projectContainer = document.querySelector(".projects-container");
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

// ------------------ run -------------------//

window.onload = populateUserData();
sectionTransition();
allNavBtns[0].click(); //begin at about section
setupScrollSkillAnimations();
appendProjects();
