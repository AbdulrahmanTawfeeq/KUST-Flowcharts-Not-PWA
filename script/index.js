window.onload = () => {
  document
    .querySelectorAll("#departments .menu-items :not(h3)")
    .forEach((department) => {
      document
        .querySelector("#flowchart>div")
        .appendChild(department.cloneNode(true));
      if (department.tagName != "HR") {
        addSpecificListeners(department);
        addSpecificListeners(
          document.querySelector("#flowchart>div :last-child")
        );
      }
    });

  document
    .querySelector("nav button[title='Scale-in']")
    .addEventListener("click", () => scale("in"));

  document
    .querySelector("nav button[title='Scale-out']")
    .addEventListener("click", () => scale("out"));

  document.querySelectorAll(".menu").forEach((menu) => {
    menu.addEventListener("click", (event) => {
      menuItems = menu.lastElementChild;
      if (menuItems.style.display == "flex" && event.target == menu) {
        menuItems.style.display = "none";
      } else {
        document.querySelectorAll(".menu").forEach((eachMenu) => {
          eachMenu.lastElementChild.style.display = "none";
        });
        menuItems.style.display = "flex";
      }
    });

    menu.addEventListener("mouseenter", (event) => {
      window
        .getComputedStyle(document.querySelector("button.icon.bars"), null)
        .getPropertyValue("display") == "none"
        ? setTimeout(() => {
            //because there is no mouse in touchscreen, the touch will be considered as mouseenter then click both together
            event.target.lastElementChild.style.display = "flex";
          }, 1)
        : "";
    });

    menu.addEventListener("mouseleave", (event) =>
      window
        .getComputedStyle(document.querySelector(".bars"), null)
        .getPropertyValue("display") == "none"
        ? (event.target.lastElementChild.style.display = "none")
        : ""
    );
  });

  document.querySelector(".bars").addEventListener("click", () => {
    document.querySelector(".cover") != null
      ? document.querySelector(".cover").remove()
      : "";
    document.querySelector("nav").style.display = "flex";
    let cover = document.createElement("div");
    cover.className = "cover";
    document.body.appendChild(cover);
  });

  document.querySelector("nav .close").addEventListener("click", () => {
    document.querySelector("nav").style.display = "";
    document.body.querySelector("div.cover").remove();
  });

  document.addEventListener("click", (e) => {
    if (e.target == document.querySelector("div.cover")) {
      document.querySelector("nav").style.display = "";
      e.target.remove();
    }
  });

  document.getElementsByTagName(
    "head"
  )[0].innerHTML += `<meta name="author" content="name: AbdulrahmanTawfeeq, email: abdulrahman.tofiqf18@komar.edu.iq">`;
};

function addSpecificListeners(elem) {
  elem.addEventListener("click", () =>
    setTemplate(`data/${elem.textContent}.json`)
  );

  elem.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      setTemplate(`data/${elem.textContent}.json`);
    }
  });
}

let allColoredPreToAndCoCourses;
let allColoredPreForCourses;

function setColors(courseDiv) {
  resetColors();
  let courseUpperCode = courseDiv.firstElementChild.textContent
    .trim()
    .toLowerCase();
  let courseBottomCode = courseDiv.lastElementChild.textContent
    .trim()
    .toLowerCase();

  let coursesTopCodes = document.querySelectorAll(
    ".flowchart main section div .semester div span:first-child"
  );

  let coursesButtomCodes = document.querySelectorAll(
    ".flowchart main section div .semester div span:last-child, .flowchart main .internship span:last-child"
  );

  allColoredPreToAndCoCourses = preToAndCo(
    coursesButtomCodes,
    courseUpperCode,
    "#9081ec",
    "#a1877b"
  ); //prerequesite to, co req
  allColoredPreForCourses = preFor(
    coursesTopCodes,
    courseBottomCode,
    "#E97474"
  ); //prerequesite for
}

function preToAndCo(allCoursesPosCode, thisPosCode, preToColor, coColor) {
  let filteredElements = Array.from(allCoursesPosCode).filter((codeElem) => {
    codeText = codeElem.textContent.trim().toLowerCase();
    if (thisPosCode.indexOf(",") != -1) {
      return (
        codeText === thisPosCode.split(",")[0].trim() ||
        codeText === thisPosCode.split(",")[1].trim()
      );
    } else if (thisPosCode.indexOf("|") != -1) {
      return (
        codeText === thisPosCode.split("|")[0].trim() ||
        codeText === thisPosCode.split("|")[1].trim()
      );
    } else {
      return codeText === thisPosCode;
    }
  });
  filteredElements.map((codeElem) => {
    let parentOfCode = codeElem.parentNode;
    if (thisPosCode.indexOf("|") != -1) {
      if (
        codeElem.textContent.trim().toLowerCase() ===
        thisPosCode.split("|")[1].trim()
      ) {
        parentOfCode.style.backgroundColor = coColor;
      } else if (
        codeElem.textContent.trim().toLowerCase() ===
        thisPosCode.split("|")[0].trim()
      ) {
        parentOfCode.style.backgroundColor = preToColor;
      }
    } else {
      parentOfCode.style.backgroundColor = preToColor;
    }
  });
  return filteredElements;
}

function preFor(allCoursesPosCode, thisPosCode, preForColor) {
  let filteredElements = Array.from(allCoursesPosCode).filter((codeElem) => {
    codeText = codeElem.textContent.trim().toLowerCase();
    if (codeText.indexOf(",") != -1) {
      return (
        thisPosCode === codeText.split(",")[0].trim() ||
        thisPosCode === codeText.split(",")[1].trim()
      );
    } else if (codeText.indexOf("|") != -1) {
      return thisPosCode === codeText.split("|")[0].trim();
    } else {
      return codeText === thisPosCode;
    }
  });
  filteredElements.map(
    (codeElem) => (codeElem.parentNode.style.backgroundColor = preForColor)
  );
  return filteredElements;
}

function resetColors() {
  if (allColoredPreToAndCoCourses != undefined) {
    let allColored = Array.from(allColoredPreToAndCoCourses).concat(
      Array.from(allColoredPreForCourses)
    );
    allColored.forEach((codeElem) => {
      codeElem.parentNode.style.backgroundColor = "";
    });
  }
}

function scale(action) {
  var element = document.querySelector(".flowchart");
  var style = window.getComputedStyle(element);
  var transform = String(style.transform);
  // alert(); //matrix(1  0  0  1  0  0)
  var scale = parseFloat(transform.split(",")[0].split("(")[1]);
  if (action == "in" && scale < 1.25 && scale + 0.1 <= 1.25) {
    element.style.transform = "scale(" + (scale + 0.1) + ")";
  } else if (action == "out" && scale > 0.6 && scale - 0.1 >= 0.6) {
    element.style.transform = "scale(" + (scale - 0.1) + ")";
  }
}
/**
 * (C)
 * Author: Abdulrahman Tawfeeq,
 * email: abdulrahman.tofiqf18@komar.edu.iq
 */
