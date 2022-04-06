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

function templateSettings(pdfPath, departmentName, courseDescription) {
  let pdfElem = document.querySelector("nav a[title='Download PDF']");
  pdfElem.setAttribute("href", pdfPath);
  pdfElem.setAttribute(
    "download",
    `${pdfPath.split("/")[pdfPath.split("/").length - 1].split(".")[0]}`
  );
  document
    .querySelector("nav a[title='Course Descriptions']")
    .setAttribute("href", courseDescription);
  document.documentElement.style.setProperty("--icon-opacity", "100%"); // :root{}
  document.documentElement.style.setProperty("--icon-clickable", "unset");
  document.getElementById("colors").removeAttribute("disabled");

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
  jsonData(path)
    .then((data) => {
      // destructuring js object we got from json file
      // new way of declaring variables
      const { departmentName, fType, courseDescription, pdfPath, years } =
        data.flowchart;
      new Flowchart(departmentName, fType, years);
      templateSettings(pdfPath, departmentName, courseDescription);
    })
    .catch((err) => console.log(err.message));
}
/**
 * (C)
 * Author: Abdulrahman Tawfeeq,
 * email: abdulrahman.tofiqf18@komar.edu.iq
 */
