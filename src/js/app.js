import AppController from "./Components/AppController";

const container = document.querySelector('.container');
const controller = new AppController(container);
controller.intervalFunc();

