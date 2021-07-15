import {menu,btnCloseMenu,btnMenu} from '../selectores.js';

export default class UIMenu{
    constructor(){
        this.addEvents = this.initMenuUI();
    };
    initMenuUI(){
        btnMenu.addEventListener('click',this.toggleClassMenu);
        btnCloseMenu.addEventListener('click',this.toggleClassMenu);
    };
    toggleClassMenu(){
        menu.classList.toggle('active');
    };
};