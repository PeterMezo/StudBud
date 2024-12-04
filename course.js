document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes-container');
    const addNoteBtn = document.getElementById('add-note-btn');
    const courseTitle = document.getElementById('course-title');

    const params = new URLSearchParams(window.location.search);
    const courseIndex = params.get('course');
    const courseName = `${courseIndex}`; // Replace with actual course name from storage
    courseTitle.innerText = courseName;

    let notes = [
        { title: "Note 1", type: "Lecture", description: "Short description", course: courseName }
    ]; // Example notes

    // Function to update note cards
   const updateNotes = () => {
    notesContainer.innerHTML = ''; // Clear existing notes

    notes.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.className = 'card my-3';
        noteCard.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                    <!-- Title and Edit Title Button -->
                    <div class="d-flex align-items-center">
                        <h5 class="card-title mb-0 me-3">${note.title}</h5>
                        <button class="btn btn-sm btn-secondary edit-title-btn">Edit Title</button>
                    </div>

                    <!-- Open Button -->
                    <button class="btn btn-primary open-btn">Open</button>
                </div>
                <div class="row align-items-center mt-3">
                    <!-- Note Type -->
                    <div class="col d-flex align-items-center">
                        <p class="mb-0 me-2">${note.type}</p>
                        <button class="btn btn-sm btn-secondary edit-type-btn">Edit Type</button>
                    </div>

                    <!-- Short Description -->
                    <div class="col d-flex align-items-center">
                        <p class="mb-0 me-2">${note.description}</p>
                        <button class="btn btn-sm btn-secondary edit-description-btn">Edit Description</button>
                    </div>

                    <!-- Course Name -->
                    <div class="col">
                        <p class="mb-0"><strong>Course:</strong> ${note.course}</p>
                    </div>
                </div>
            </div>
        `;

        // Append the card to the container
        notesContainer.appendChild(noteCard);

        // Add event listeners for the buttons
        const editTitleBtn = noteCard.querySelector('.edit-title-btn');
        const editTypeBtn = noteCard.querySelector('.edit-type-btn');
        const editDescriptionBtn = noteCard.querySelector('.edit-description-btn');

        editTitleBtn.addEventListener('click', () => editTitle(index));
        editTypeBtn.addEventListener('click', () => editNoteType(index));
        editDescriptionBtn.addEventListener('click', () => editNoteDescription(index));
    });
};

    // Add note button
    addNoteBtn.addEventListener('click', () => {
        const newNote = {
            title: `Note ${notes.length + 1}`,
            type: "Lecture",
            description: "Short description",
            course: courseName
        };
        notes.push(newNote);
        updateNotes();
    });

    // Editable functions
   window.editTitle = (index) => {
    const newTitle = prompt("Enter the new title:", notes[index].title);
    if (newTitle) {
        notes[index].title = newTitle;
        updateNotes();
    }
};

window.editNoteType = (index) => {
    const newType = prompt("Enter the new type of the note:", notes[index].type);
    if (newType) {
        notes[index].type = newType;
        updateNotes();
    }
};

window.editNoteDescription = (index) => {
    const newDescription = prompt("Enter the new description of the note:", notes[index].description);
    if (newDescription) {
        notes[index].description = newDescription;
        updateNotes();
    }
};
    // Initial render
    updateNotes();
});
