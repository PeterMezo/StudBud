document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes-container');
    const addNoteBtn = document.getElementById('add-note-btn');
    const courseTitle = document.getElementById('course-title');

    const params = new URLSearchParams(window.location.search);
    const courseIndex = params.get('course');
    const courseName = `Course ${courseIndex}`; // Replace with actual course name from storage
    courseTitle.innerText = courseName;

    let notes = [
        { title: "Note 1", type: "Lecture", description: "Short description", course: courseName }
    ]; // Example notes

    // Function to update note cards
    const updateNotes = () => {
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteCard = document.createElement('div');
            noteCard.className = 'card my-3';
            noteCard.innerHTML = `
                <div class="card my-3">
    <div class="card-body">
        <div class="row align-items-center">
            <!-- Title -->
            <div class="col">
                <h5 class="card-title">Note Title</h5>
                <button class="btn btn-sm btn-secondary">Edit Title</button>
            </div>

            <!-- Note Type -->
            <div class="col d-flex align-items-center">
                <p class="mb-0 me-2">Lecture</p>
                <button class="btn btn-sm btn-secondary">Edit Type</button>
            </div>

            <!-- Short Description -->
            <div class="col d-flex align-items-center">
                <p class="mb-0 me-2">Short description</p>
                <button class="btn btn-sm btn-secondary">Edit Description</button>
            </div>

            <!-- Course Name -->
            <div class="col">
                <p class="mb-0"><strong>Course:</strong> Course Name</p>
            </div>

            <!-- Open Button -->
            <div class="col">
                <button class="btn btn-primary">Open</button>
            </div>
        </div>
    </div>
</div>`;
            notesContainer.appendChild(noteCard);
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
        const newDescription = prompt("Enter the new title:", notes[index].title);
        if (newTitle) {
            notes[index].description = newDescription;
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
