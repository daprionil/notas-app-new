import {db} from '../funciones.js';

export default class Notes {
    addNewNote(note){
        const transaction = db.transaction(['notes'],'readwrite');
        const obStore = transaction.objectStore('notes');

        obStore.add(note);
    };
    deleteNote(id){
        const transaction = db.transaction(['notes'],'readwrite');
        const obStore = transaction.objectStore('notes');

        obStore.delete(id);
    };
    editNote(note){
        const transaction = db.transaction(['notes'],'readwrite');
        const obStore = transaction.objectStore('notes');

        obStore.put(note);
    };
};