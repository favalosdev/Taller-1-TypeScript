import { dataCourses } from "./dataCourses.js";
import { dataStudent } from "./dataStudent.js";
var coursesTbody = document.getElementById('courses'); // Nodo tbody que tiene el id="courses"
var studentTbody = document.getElementById('student');
var inputSearchBox = document.getElementById('search-box');
var minBoundBox = document.getElementById('min-bound-box');
var maxBoundBox = document.getElementById('max-bound-box');
var btnfilterByName = document.getElementById('button-filterByName');
var totalCreditsField = document.getElementById('total-credits');
function renderStudentData(student) {
    var trCodigo = document.createElement("tr");
    var trCedula = document.createElement("tr");
    var trEdad = document.createElement("tr");
    var trDireccion = document.createElement("tr");
    var trTelefono = document.createElement("tr");
    trCodigo.innerHTML = "<td>C\u00F3digo</td> <td>" + student.codigo + "</td>";
    trCedula.innerHTML = "<td>C\u00E9dula</td> <td>" + student.cedula + "</td>";
    trEdad.innerHTML = "<td>Edad</td> <td>" + student.edad + "</td>";
    trDireccion.innerHTML = "<td>Direccion</td> <td>" + student.direccion + "</td>";
    trTelefono.innerHTML = "<td>Telefono</td> <td>" + student.telefono + "</td>";
    studentTbody.appendChild(trCodigo);
    studentTbody.appendChild(trCedula);
    studentTbody.appendChild(trEdad);
    studentTbody.appendChild(trDireccion);
    studentTbody.appendChild(trTelefono);
}
renderStudentData(dataStudent);
function renderCoursesInTable(courses) {
    courses.forEach(function (c) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + c.name + "</td>\n                           <td>" + c.professor + "</td>\n                           <td>" + c.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.lastElementChild) {
        coursesTbody.removeChild(coursesTbody.lastElementChild);
    }
}
function updateTotalCredits(totalCredits) {
    totalCreditsField.innerHTML = '' + totalCredits;
}
function applyFilters() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    var minBound = parseInt(minBoundBox.value);
    var maxBound = parseInt(maxBoundBox.value);
    coursesFiltered = searchByCredits(minBound, maxBound, coursesFiltered);
    renderCoursesInTable(coursesFiltered);
    updateTotalCredits(getTotalCredits(coursesFiltered));
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchByCredits(minBound, maxBound, courses) {
    if (minBound < 0)
        minBound = 0;
    if (maxBound < 0)
        maxBound = minBound;
    if (minBound > maxBound)
        minBound = maxBound;
    return courses.filter(function (c) { return c.credits >= minBound && c.credits <= maxBound; });
}
btnfilterByName.onclick = function () { return applyFilters(); };
