import menuUI from './clases/menu-ui.js';

import {formNote} from './selectores.js'
import {validateForm,createDB} from './funciones.js';

//Iniciando App
document.addEventListener('DOMContentLoaded', () => {
    createDB();
    //Agregando Eventos
    const menuui = new menuUI();
    formNote.addEventListener('submit',validateForm);
});