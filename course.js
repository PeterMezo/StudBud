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
                <div class="card-body">
                    <div class="mb-2">
                        <h5 class="card-title">${note.title}</h5>
                    </div>
                    <div class="d-flex align-items-center mb-2">
                        <p class="mb-0 me-3" id="note-type-${index}">${note.type}</p>
                        <button class="btn btn-sm btn-secondary" onclick="editNoteType(${index})">Edit Type</button>
                    </div>
                    <div class="d-flex align-items-center mb-2">
                        <p class="mb-0 me-3" id="note-description-${index}">${note.description}</p>
                        <button class="btn btn-sm btn-secondary" onclick="editNoteDescription(${index})">Edit Description</button>
                    </div>
                    <div class="mb-2">
                        <p class="mb-0"><strong>Course:</strong> ${note.course}</p>
                    </div>
                    <button class="btn btn-primary">Open</button>
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
