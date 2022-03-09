/**
 * Author: Abdulrahman Tawfeeq,
 * email: abdulrahman.tofiqf18@komar.edu.iq
 */

window.onload = () => {
  document
    .querySelectorAll("#departments .menu-items div")
    .forEach((department) => {
      document
        .querySelector("#flowchart>div")
        .appendChild(department.cloneNode(true));
      addSpecificListeners(department);
      addSpecificListeners(
        document.querySelector("#flowchart>div :last-child")
      );
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
            //because there is no mouse in touchscreen, the touch will be considered as mouseenten then click both together
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
    document.querySelector("nav").style.display = "flex";
  });

  document.querySelector("nav .close").addEventListener("click", () => {
    document.querySelector("nav").style.display = "";
  });
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
  let allColored = Array.from(allColoredPreToAndCoCourses).concat(
    Array.from(allColoredPreForCourses)
  );
  allColored.forEach((codeElem) => {
    codeElem.parentNode.style.backgroundColor = "";
  });
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
 * Third Method
 */
// adding async keyword makes the function works asyncrounously (wont be blocking), will let the
// other code be executed as it takes time to be done and it returns a Promise
async function jsonData(path) {
  // using await instead of then() to let the Promise fetch() done then to assign to the const response
  const response = await fetch(path);
  if (response.status !== 200) {
    throw new Error("Could not fetch the data!"); // in case of any problems with the url
  }
  // json() to convert the json into js object
  const data = await response.json(); // we use await here as well as json() returns a promise too
  return data;
}

function setTemSettings(pdfPath, departmentName, courseDescription) {
  let pdfElem = document.querySelector("nav a[title='Download PDF']");
  pdfElem.setAttribute("href", pdfPath);
  pdfElem.setAttribute("download", `${departmentName}`);
  document
    .querySelector("nav a[title='Course Descriptions']")
    .setAttribute("href", courseDescription);
  document.documentElement.style.setProperty("--icon-opacity", "100%"); // :root{}
  document.documentElement.style.setProperty("--icon-clickable", "unset");

  let value = "105px";
  if (
    departmentName.indexOf("Pharmacy") != -1 ||
    departmentName.indexOf("Dentistry") != -1
  ) {
    value = "84px";
  }
  document.documentElement.style.setProperty("--flowchart-size", value);
}

function setTemplate(path) {
  setTimeout(() => {
    jsonData(path)
      .then((data) => {
        // destructuring js object we got from json file
        // new way of declaring variables
        const { departmentName, fType, courseDescription, pdfPath, years } =
          data.flowchart;
        new Flowchart(departmentName, fType, years);
        setTemSettings(pdfPath, departmentName, courseDescription);
      })
      .catch((err) => console.log(err.message));
  }, 200);
}

class Flowchart {
  constructor(departmentName, fType, years) {
    this.departmentName = departmentName.trim();
    this.totalCredits = 0;
    this.fType = fType.trim();
    this.years = years;
    this.flowchart = ``;
    this.setFlowchart();
  }

  setFlowchart() {
    const yearsTemplate = this.getYears();
    const flowchart = `
            <header>
                <img alt="Komar Logo" src="/images/komar.png">
                <div>
                    <h3>Komar University of Science and Technology</h3>
                    <h3 id='departmentName'>${this.departmentName}</h3>
                    <h3>(${this.totalCredits} Credit Hours) ${this.fType}</h3>
                </div>
            </header>

            <main>
                ${yearsTemplate}
            </main>
        `;
    this.flowchart = flowchart;
    document.querySelector(".flowchart").innerHTML = this.flowchart;
  }

  getFlowchart() {
    return this.flowchart;
  }

  getYears() {
    var yearsTemplate = "";
    for (let i = 0; i < this.years.length; i++) {
      const { yearName, semesters, internship } = this.years[i]; // years is array of objects
      const year = new Year(yearName, semesters, internship);
      yearsTemplate = yearsTemplate.concat(year.getYear());
      this.totalCredits += year.getYearCredits();
    }
    return yearsTemplate;
  }
}

class Year {
  constructor(yearName, semesters, internship) {
    this.yearName = yearName.trim();
    this.yearCredits = 0;
    this.semesters = semesters;
    this.internship = internship;
    this.year = ``;
    this.setYear();
  }

  setYear() {
    const semestersTemplate = this.getSemesters();
    const year = `
            <section>
                <h4>${this.yearName} (${this.yearCredits}CH)</h4>
                <div>
                    ${semestersTemplate}
                </div>
            </section>
            ${
              this.internship !== null
                ? `<div tabindex="0" onfocus="setColors(this)" onblur="resetColors()" onmouseenter="setColors(this)" onmouseleave="resetColors()" class="internship green">
                    <span></span>
                    <span title="${this.internship[0]}">${this.internship[0]}</span>
                    <span>${this.internship[1]}</span>
                </div>`
                : `
                <div class="internship"></div>
                `
            }
        `;
    this.year = year;
  }

  getYear() {
    return this.year;
  }

  getSemesters() {
    var semestersTemplate = "";
    for (let i = 0; i < this.semesters.length; i++) {
      const { semesterName, courses } = this.semesters[i];
      const semester = new Semester(semesterName, courses);
      semestersTemplate = semestersTemplate.concat(semester.getSemester());
      this.yearCredits += semester.getSemesterCredits();
    }
    return semestersTemplate;
  }

  getYearCredits() {
    return this.yearCredits;
  }
}

class Semester {
  constructor(semesterName, courses) {
    this.semesterName = semesterName.trim();
    this.semesterCredits = 0;
    this.courses = courses;
    this.semester = ``;
    this.setSemester();
  }

  setSemester() {
    const coursesTemplate = this.getCourses(); // call here to update the semesterCredits
    const semester = `
            <div class="semester">
            <h4>${this.semesterName} (${this.semesterCredits}CH)</h4>
            ${coursesTemplate}
            </div>
        `;
    this.semester = semester;
  }

  getSemester() {
    return this.semester;
  }

  getCourses() {
    var coursesTemplate = "";
    for (let i = 0; i < this.courses.length; i++) {
      const course = new Course(
        this.courses[i][0],
        this.courses[i][1],
        this.courses[i][2],
        this.courses[i][3]
      );
      coursesTemplate = coursesTemplate.concat(course.getCourse());
      this.semesterCredits += course.getCourseCredit();
    }
    return coursesTemplate;
  }

  getSemesterCredits() {
    return this.semesterCredits;
  }
}

class Course {
  constructor(preTo, courseName, preFor, courseType) {
    this.preTo = preTo.trim();
    this.courseName = courseName.trim();
    this.preFor = preFor.trim();
    this.courseType = courseType.trim();
    this.getCourseCredit();
  }

  getCourse() {
    return `
            <div tabindex="0" onfocus="setColors(this)" onblur="resetColors()" onmouseenter="setColors(this)" onmouseleave="resetColors()" class="${
              this.courseType === "collage"
                ? "cyan"
                : this.courseType === "university"
                ? "yellow"
                : this.courseType === "rotations"
                ? "rotations green"
                : this.courseType === "optional"
                ? "lavender-gray"
                : "green"
            }">
                <span title='${this.preTo.length > 17 ? this.preTo : ""}'>${
      this.preTo
    }</span>
                <span>${this.courseName}</span>
                <span>${this.preFor}</span>
            </div>
        `;
  }

  getCourseCredit() {
    if (this.preFor.length >= 7) {
      if (Number.isInteger(parseInt(this.preFor[4]))) {
        return parseInt(this.preFor[4]);
      } else if (this.preFor[4].toLowerCase() === "x") {
        return 10;
      } else {
        return 0;
      }
    } else if (this.preFor[0] === "(") {
      if (Number.isInteger(parseInt(this.preFor[1]))) {
        return parseInt(this.preFor[1]);
      } else {
        return 0;
      }
    }
  }
}
/**
 * Author: Abdulrahman Tawfeeq,
 * email: abdulrahman.tofiqf18@komar.edu.iq
 */
