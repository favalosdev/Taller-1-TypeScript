import { Course } from "./course.js";
import { dataCourses } from "./dataCourses.js";

const coursesTbody: HTMLElement = document.getElementById('courses')!; // Nodo tbody que tiene el id="courses"

const inputSearchBox = <HTMLInputElement> document.getElementById('search-box');

const btnfilterByName = <HTMLButtonElement> document.getElementById('button-filterByName')!;

const totalCreditsField : HTMLElement = document.getElementById('total-credits')!;

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

function applyFilterByName() { 
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
    updateTotalCredits(getTotalCredits(coursesFiltered));
  }
  
  function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter( c => 
      c.name.match(nameKey));
}

btnfilterByName.onclick = () => applyFilterByName();