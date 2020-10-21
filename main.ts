import { Course } from "./course.js";
import { dataCourses } from "./dataCourses.js";
import { Student } from "./student.js";
import { dataStudent } from "./dataStudent.js";


const coursesTbody: HTMLElement = document.getElementById('courses')!; // Nodo tbody que tiene el id="courses"

const studentTbody : HTMLElement = document.getElementById('student')!;

const inputSearchBox = <HTMLInputElement> document.getElementById('search-box');

const minBoundBox = <HTMLInputElement> document.getElementById('min-bound-box');

const maxBoundBox = <HTMLInputElement> document.getElementById('max-bound-box');

const btnfilterByName = <HTMLButtonElement> document.getElementById('button-filterByName')!;

const totalCreditsField : HTMLElement = document.getElementById('total-credits')!;


function renderStudentData(student : Student) : void {
  let trCodigo = document.createElement("tr");
  let trCedula = document.createElement("tr");
  let trEdad = document.createElement("tr");
  let trDireccion = document.createElement("tr");
  let trTelefono = document.createElement("tr");

  trCodigo.innerHTML = `<td>Código</td> <td>${student.codigo}</td>`;
  trCedula.innerHTML = `<td>Cédula</td> <td>${student.cedula}</td>`;
  trEdad.innerHTML = `<td>Edad</td> <td>${student.edad}</td>`;
  trDireccion.innerHTML = `<td>Direccion</td> <td>${student.direccion}</td>`;
  trTelefono.innerHTML = `<td>Telefono</td> <td>${student.telefono}</td>`;

  studentTbody.appendChild(trCodigo);
  studentTbody.appendChild(trCedula);
  studentTbody.appendChild(trEdad);
  studentTbody.appendChild(trDireccion);
  studentTbody.appendChild(trTelefono);
}

renderStudentData(dataStudent);

function renderCoursesInTable(courses: Course[]): void {
  courses.forEach(c => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${c.name}</td>
                           <td>${c.professor}</td>
                           <td>${c.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function getTotalCredits(courses: Course[]): number {
    let totalCredits: number = 0;
    courses.forEach((course) => totalCredits = totalCredits + course.credits);
    return totalCredits;
}

function clearCoursesInTable(): void {
  while (coursesTbody.lastElementChild) {
    coursesTbody.removeChild(coursesTbody.lastElementChild);
  }
}

function updateTotalCredits(totalCredits : number) {
  totalCreditsField.innerHTML = '' + totalCredits
}

function applyFilters() { 
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);

    let minBound = parseInt(minBoundBox.value);
    let maxBound = parseInt(maxBoundBox.value);

    coursesFiltered = searchByCredits(minBound, maxBound, coursesFiltered);

    renderCoursesInTable(coursesFiltered);
    updateTotalCredits(getTotalCredits(coursesFiltered));
}


  
function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter( c => 
      c.name.match(nameKey));
}

function searchByCredits(minBound : number, maxBound : number, courses : Course[]) {
  if (minBound < 0) minBound = 0;
  if (maxBound < 0) maxBound = minBound;
  if (minBound > maxBound) minBound = maxBound;

  return courses.filter(c => c.credits >= minBound && c.credits <= maxBound);
}

btnfilterByName.onclick = () => applyFilters();