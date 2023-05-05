import { Workbox } from 'workbox-window';
import Editor from './editor';
import { body } from './body';
import './database';
import '../css/style.css';
import logo from '../images/logo.png';


const main = document.querySelector('#main');
main.innerHTML = '';

document.querySelector('.navbar-brand img').src = logo;


const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
    ${body}
    <div class="loading-spinner"></div>
  </div>
  `;
  main.appendChild(spinner);
};

// Initialize the editor
const editor = new Editor(main);

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
