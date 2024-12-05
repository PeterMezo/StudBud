document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes-container');
    const addNoteBtn = document.getElementById('add-note-btn');
    const courseTitle = document.getElementById('course-title');

    const params = new URLSearchParams(window.location.search);
    const courseIndex = params.get('course');
    const courseName = `${courseIndex}`; // Replace with actual course name from storage
    courseTitle.innerText = courseName;

    let notes = [
        { id: 1, title: "Note 1", type: "Lecture", description: "Short description", course: courseName, content: "", blocks: [] }
    ]; // Example notes with content and blocks
    let quizCards = []; // Array for storing quiz cards
    let currentNote = null; // Tracks the note being edited

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
                        <button class="btn btn-primary open-note-btn" data-bs-toggle="modal" data-bs-target="#noteEditorModal" data-note-id="${note.id}">Open</button>
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
            id: Date.now(),
            title: `Note ${notes.length + 1}`,
            type: "Lecture",
            description: "Short description",
            course: courseName,
            content: "",
            blocks: []
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



// MODAL AND NEW FUNCTIONALITY
    const blockContainer = document.getElementById('block-container');
    const addQuestionBtn = document.getElementById('add-question-btn');
    const saveNoteBtn = document.getElementById('save-note-btn');

    // Create a new block dynamically
    const createBlock = (content = "") => {
        const blockId = `block-${Date.now()}`;
        const block = document.createElement('div');
        block.className = 'block border p-2 mb-2';
        block.setAttribute('contenteditable', 'true');
        block.setAttribute('data-block-id', blockId);
        block.innerText = content;

        block.addEventListener('click', () => {
            block.classList.toggle('selected');
            updateQuestionButton();
        });

        blockContainer.appendChild(block);
        return blockId;
    };

    // Handle "Enter" for new block creation
    blockContainer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            createBlock();
        }
    });

    // Update "+" button visibility
    const updateQuestionButton = () => {
        const selectedBlocks = blockContainer.querySelectorAll('.block.selected');
        addQuestionBtn.style.display = selectedBlocks.length > 0 ? 'block' : 'none';
    };

    // Add quiz question
    addQuestionBtn.addEventListener('click', () => {
        const selectedBlocks = Array.from(blockContainer.querySelectorAll('.block.selected'));
        const selectedContent = selectedBlocks.map(block => block.innerText).join(' ');
        const question = prompt('What is the question?');

        if (question) {
            quizCards.push({ question, content: selectedContent });

            selectedBlocks.forEach(block => {
                block.classList.remove('selected');
                block.style.backgroundColor = 'rgba(255, 255, 0, 0.2)'; // Fade yellow
            });

            updateQuestionButton();
        }
    });

    // Save note
    saveNoteBtn.addEventListener('click', () => {
        if (currentNote) {
            const content = Array.from(blockContainer.querySelectorAll('.block')).map(block => block.innerText);
            currentNote.content = content.join('\n');
            currentNote.blocks = content.map((text, index) => ({ id: `block-${index}`, content: text }));

            console.log('Note saved:', currentNote);
            console.log('Quiz cards:', quizCards);
        }
    });

    // Open note in modal
    notesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('open-note-btn')) {
            const noteId = e.target.getAttribute('data-note-id');
            currentNote = notes.find(note => note.id == noteId);
            blockContainer.innerHTML = '';

            if (currentNote && currentNote.content) {
                currentNote.content.split('\n').forEach(content => createBlock(content));
            }
        }
    });

    // Initial render
    updateNotes();
});
