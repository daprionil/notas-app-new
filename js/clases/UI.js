import {formNote,boxNotes} from '../selectores.js';
import {htmlNote} from '../funciones.js';

export default class UI{
    clearNotes(){
        while(boxNotes.firstChild){
            boxNotes.removeChild(boxNotes.firstChild);
        };
    };
    viewAllNotes(db){
        this.clearNotes();

        const obStore = db.transaction(['notes']).objectStore('notes');

        obStore.getAll().onsuccess = e => {
            const notas = e.target.result;
            
            if(notas.length === 0) {
                boxNotes.appendChild(this.alertNothing());
                return;
            };

            notas.forEach((note) => {
                boxNotes.appendChild(htmlNote(note));
            });
        };
    };
    alertNothing(){
        const div = document.createElement('p');
        div.innerHTML = `No existe ninguna nota,<br> ¡Agrega una!`
        div.classList.add('alert-nothing');

        return div;
    };
    message(text){
        const msgBox = document.createElement('div');
        msgBox.textContent = text;
        msgBox.classList.add('message-alert');

        if(!document.body.querySelector('.message-alert')){
            document.body.insertBefore(msgBox,document.body.firstChild);
            setTimeout(() => {
                msgBox.remove();
            },4000)
        };
    };
    notValueForm(text){
        const notValue = document.createElement('p');
        notValue.classList.add('invalid-note');
        notValue.style.color = 'red';
        notValue.textContent = text;
        notValue.style.fontWeight = '600';
        notValue.style.margin  = '10px 0'

        const node = formNote.querySelector('.ctn-submit');
        if(!node.querySelector('.invalid-note')){
            node.insertBefore(notValue,node.firstChild);
            setTimeout(() => {
                notValue.remove();
            },3000);
        };
    };
};