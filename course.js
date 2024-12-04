document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes-container');
    const addNoteBtn = document.getElementById('add-note-btn');
    const courseTitle = document.getElementById('course-title');

    const params = new URLSearchParams(window.location.search);
    const courseIndex = params.get('course');
    const courseName = `Course ${courseIndex}`; // Replace with actual course name from storage
    courseTitle.innerText = courseName;

    let notes = []; // Stores notes

    const updateNotes = () => {
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteCard = document.createElement('div');
            noteCard.className = 'card my-3';
            noteCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${note}</p>
                </div>`;
            notesContainer.appendChild(noteCard);
        });
    };

    addNoteBtn.addEventListener('click', () => {
        const noteText = prompt('Enter the note:');
        if (noteText) {
            notes.push(noteText);
            updateNotes();
        }
    });

    updateNotes();
});