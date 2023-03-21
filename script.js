const courseForm = document.querySelector("#course-form");
const courseList = document.querySelector("#course-list");
const addCourseButton = document.querySelector("#add-course-button");
const addCourseModal = document.querySelector("#add-course-modal");
const closeButton = document.querySelector(".close-button");

let courses = [];

function Course(name, currentGrade, goalGrade, examWeight) {
  this.name = name;
  this.currentGrade = currentGrade;
  this.goalGrade = goalGrade;
  this.examWeight = examWeight;
  this.finalWeight = 1 - (examWeight / 100);
  this.finalGradeNeeded = calculateGradeNeeded(currentGrade, goalGrade, examWeight);
  this.finalGradeNeeded = Math.round(this.finalGradeNeeded * 100) / 100;
  this.displayGrade = function () {
    return `${this.finalGradeNeeded}%`;
  };
}


function addCourseToList(course) {
  const courseItem = document.createElement("div");
  courseItem.classList.add("course-item");
  courseItem.innerHTML = `
    <h3>${course.name}</h3>
    <p>Current grade: ${course.currentGrade}%</p>
    <p>Goal grade: ${course.goalGrade}%</p>
    <p>Exam weight: ${course.examWeight}%</p>
    <p>Final grade needed: ${course.displayGrade()}</p>
    <button class="delete-button">Delete</button>
  `;
  courseList.appendChild(courseItem);

  const deleteButton = courseItem.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    courseList.removeChild(courseItem);
  });
}

function updateCourses() {
  courseList.innerHTML = "";
  for (let i = 0; i < courses.length; i++) {
    addCourseToList(courses[i]);
  }
}

addCourseButton.addEventListener("click", () => {
  addCourseModal.style.display = "block";
});

closeButton.addEventListener("click", () => {
  addCourseModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target == addCourseModal) {
    addCourseModal.style.display = "none";
  }
});

courseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#course-name-input").value;
  const currentGrade = document.querySelector("#current-grade-input").valueAsNumber;
  const goalGrade = document.querySelector("#goal-grade-input").valueAsNumber;
  const examWeight = document.querySelector("#exam-weight-input").valueAsNumber;

  const course = new Course(name, currentGrade, goalGrade, examWeight);
  courses.push(course);
  addCourseModal.style.display = "none";
  updateCourses();
  courseForm.reset();
});

function calculateGradeNeeded(currentGrade, goalGrade, examWeight) {
  const currentPercentage = currentGrade / 100;
  const remainingWeight = 1 - (examWeight / 100);
  const gradeNeeded = ((goalGrade/100) - (currentPercentage * remainingWeight)) / (examWeight/100);
  return (gradeNeeded * 100).toFixed(2);
}
