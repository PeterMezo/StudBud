document.addEventListener('DOMContentLoaded', () => {
    const courseList = document.getElementById('course-list');
    const coursesContainer = document.getElementById('courses-container');
    const addCourseBtn = document.getElementById('add-course-btn');

    let courses = [
     { courseName: "Example"}
]; // Stores course names

    // Function to update UI with courses
    const updateCourseList = () => {
        courseList.innerHTML = '';
        coursesContainer.innerHTML = '';

        courses.forEach((course, index) => {
            // Navbar dropdown
            const courseItem = document.createElement('li');
            courseItem.innerHTML = `<a class="dropdown-item" href="#" data-index="${index}">${course}</a>`;
            courseList.appendChild(courseItem);

            // Main page course cards
            const courseCard = document.createElement('div');
            courseCard.className = 'card my-3';
            courseCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${course.courseName}</h5>
                    <a href="course.html?course=${course.courseName}" class="btn btn-primary">Open Notes</a>
                </div>`;
            coursesContainer.appendChild(courseCard);
        });
    };

    // Add new course
    addCourseBtn.addEventListener('click', () => {
        const courseName = prompt('Enter the course name:');
        if (courseName) {
            courses.push({courseName: courseName});
            updateCourseList();
        }
    });

    // Populate courses initially
    updateCourseList();
});
