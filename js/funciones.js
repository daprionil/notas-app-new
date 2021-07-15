//Variables
import {formNote} from './selectores.js';
import Notes from './clases/Notes.js';
import UI from './clases/UI.js';

const notas = new Notes();
const ui = new UI();

let mode = false;
let note = {textNote:'',idNote:''};

let db;

const btnSubmit = formNote.querySelector('[type="submit"]');

//Funciones
function validateForm(e){
    e.preventDefault();
    
    const textNote = e.target.querySelector('[name="description-note"]').value;
    note.textNote = textNote.trim();

    if(note.textNote != ''){
        if(mode){
            notas.editNote(note);
            console.log(note);
            ui.message('Editado correctamente');

            mode = false;
            btnSubmit.value = 'Agregar';
            btnSubmit.classList.remove('success');
        }else{
            notas.addNewNote({textNote:note.textNote,idNote: Date.now()});
            ui.message('Agregado correctamente');
        };
        ui.viewAllNotes(db);
        e.target.reset();
        return;
    };
    ui.notValueForm("Debes rellenar tu nota");
};
function createDB(){
    const DB = window.indexedDB.open('all-notes',1);
    DB.onerror = (err) =>{
        console.log(`%c Ha ocurrido un error [${err}] `,'font-size:1rem;font-weight:700;background:red;color:white;');
    };
    DB.onsuccess = (e) => {
        db = e.target.result;

        ui.viewAllNotes(db);
    };
    DB.onupgradeneeded = (e) => {
        db = e.target.result;

        const obStore = db.createObjectStore('notes',{keyPath:"idNote",autoIncrement:true});

        obStore.createIndex('textNote','textNote',{unique:false});
        obStore.createIndex('idNote','idNote',{unique:true});
    };
};
function htmlNote(note){
    const {textNote,idNote} = note;

    const noteHtml = document.createElement('div');
    noteHtml.classList.add('note-item');

    const descNote = document.createElement('div');
    descNote.classList.add('note-description');
    descNote.innerHTML = `
    <textarea name="descriptionNote" cols="30" readonly rows="10">${textNote}</textarea>
    `;

    const issuesNote = document.createElement('div');
    issuesNote.classList.add('note-issues');

    const btnCopy = document.createElement('button');
    btnCopy.classList.add('submit','btn');
    btnCopy.textContent = '📋';
    btnCopy.title = 'Copiar Nota';
    btnCopy.onclick = () => {
        const input = descNote.querySelector('textarea');
        copyNote(input, btnCopy);
    };

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('danger','btn');
    btnDelete.textContent = '🗑️';
    btnDelete.title = 'Eliminar Nota';
    btnDelete.onclick = () => {
        deleteNote(idNote);
    };

    const btnEditar = document.createElement('button');
    btnEditar.classList.add('submit','btn');
    btnEditar.textContent = '🖍️';
    btnEditar.title = 'Editar Nota';
    btnEditar.onclick = () => {
        prepararEdición(note);
    };

    issuesNote.appendChild(btnCopy);
    issuesNote.appendChild(btnEditar);
    issuesNote.appendChild(btnDelete);

    noteHtml.appendChild(descNote);
    noteHtml.appendChild(issuesNote);

    return noteHtml;
};
function prepararEdición(nota){
    const {textNote, idNote} = nota;

    note = {textNote,idNote};
    console.log(note);

    mode = true;

    const inputNote = formNote.querySelector('#description-note');
    inputNote.value = textNote;

    btnSubmit.value = 'Editar';
    btnSubmit.classList.add('success');
};
function copyNote(input,btn){
    input.focus();
    document.execCommand('selectAll');
    document.execCommand('copy');

    btn.classList.add('success');
    btn.textContent = '✓';
    btn.disabled = true;
    btn.style.cursor = 'not-allowed';

    setTimeout(() => {
        btn.classList.remove('success');
        btn.textContent = '📋';
        btn.disabled = false;
        btn.style.cursor = 'pointer';
    },4000);
};
function deleteNote(id){
    const validate = confirm("¿Seguro que quieres Eliminar esta nota?");

    if(validate){
        notas.deleteNote(id);
        ui.viewAllNotes(db);
        ui.message("Nota eliminada Correctamente");
    };
};
export {
    validateForm,
    notas,
    createDB,
    db,htmlNote
};