// console.log("working");
showNotes();

// If user's add a note, add it to the local storage
let addBtn = document.querySelector('#addBtn');

addBtn.addEventListener('click', (e) => {

    let addTxt = document.querySelector('#addTxt');
    let addTitle = document.querySelector('#addTitle');
    let notes = localStorage.getItem("notes");
    if(notes === null){
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
    }

    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notesObj);

    showNotes();
})

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if(notes === null){
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach( (element, index) => {
        html += `
        <div class="card my-2 mx-2 noteCard" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick='deleteNote(this.id)' class="btn btn-primary">Delete Note</button>
          </div>
        </div>
        `
    })
    let notesElm = document.querySelector('#notes');
    if(notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`
    }
}

// Function to delete a note
function deleteNote(index) {
    // console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if(notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.querySelector('#searchTxt');
search.addEventListener('input', () => {

    let inputVal = search.value.toLowerCase();
    // console.log("Input event fired", inputVal);
    let noteCards = document.querySelectorAll(".noteCard");
    Array.from(noteCards).forEach((element) => {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        // console.log(cardTxt);

        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})