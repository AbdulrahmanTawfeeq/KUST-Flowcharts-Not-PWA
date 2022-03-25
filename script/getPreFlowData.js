let s1 = [];
let s2 = [];
let s3 = [];
let s4 = [];
let s5 = [];
let s6 = [];
let s7 = [];
let s8 = [];
let s9 = [];
let s10 = [];
let row = 1;
let col = 1;
document.querySelectorAll(".practical").forEach((prac) => {
  prac.remove();
});
document
  .querySelectorAll(
    "#table1 tbody tr:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3))"
  )
  .forEach((row) => {
    Array.from(row.children).forEach((cell) => {
      let course = null;
      if (cell.textContent != undefined && cell.textContent != "") {
        course = Array.from(new Set(cell.textContent.trim().split("\t")))
          .map((value) => {
            if (value.trim() != "") {
              return value.trim();
            }
          })
          .filter((value) => {
            return value != undefined;
          });
        // collage
        // university
        // departmental
        // optional
        cell.className == "cyan"
          ? course.push("collage")
          : cell.className == "green"
          ? course.push("departmental")
          : cell.className == "purple" 
          ? course.push("optional")
          :cell.className == "yellow" ? course.push("university"):"";
      }
      switch (col) {
        case 1:
          if (course != null) s1.push(course);
          break;
        case 2:
          if (course != null) s2.push(course);
          break;
        case 3:
          if (course != null) s3.push(course);
          break;
        case 4:
          if (course != null) s4.push(course);
          break;
        case 5:
          if (course != null) s5.push(course);
          break;
        case 6:
          if (course != null) s6.push(course);
          break;
        case 7:
          if (course != null) s7.push(course);
          break;
        case 8:
          if (course != null) s8.push(course);
          break;
        case 9:
          if (course != null) s9.push(course);
          break;
        case 10:
          if (course != null) s10.push(course);
          break;

        default:
          break;
      }
      col++;
    });
    col = 1;
    row++;
  });

console.log("semester1: ", s1);
console.log("semester2: ", s2);
console.log("semester3: ", s3);
console.log("semester4: ", s4);
console.log("semester5: ", s5);
console.log("semester6: ", s6);
console.log("semester7: ", s7);
console.log("semester8: ", s8);
console.log("semester9: ", s9);
console.log("semester10: ", s10);
