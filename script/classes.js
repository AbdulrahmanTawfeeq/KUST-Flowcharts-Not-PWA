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
    return this.yearCredits + this.getInternshipCredit();
  }

  getInternshipCredit() {
    if (this.internship != null) {
      if (this.internship[1].length >= 7) {
        if (Number.isInteger(parseInt(this.internship[1][4]))) {
          return parseInt(this.internship[1][4]);
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    } else {
      return 0;
    }
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
 * (C)
 * Author: Abdulrahman Tawfeeq,
 * email: abdulrahman.tofiqf18@komar.edu.iq
 */
