import { Workbox } from 'workbox-window'; // Importing the Workbox class from workbox-window library
import Editor from './editor'; // Importing the Editor class from editor.js file
import { body } from './body'; // Importing the body variable from body.js file
import './database'; // Importing the database module
import '../css/style.css'; // Importing the CSS file
import logo from '../images/logo.png'; // Importing the logo image

const main = document.querySelector('#main'); // Selecting the element with id "main" and storing it in a variable called main
main.innerHTML = ''; // Clearing the content of the main element

document.querySelector('.navbar-brand img').src = logo; // Setting the source of the image element with class "navbar-brand" to the logo image

const loadSpinner = () => { // Defining a function called loadSpinner
  const spinner = document.createElement('div'); // Creating a new div element and storing it in a variable called spinner
  spinner.classList.add('spinner'); // Adding the "spinner" class to the spinner element
  spinner.innerHTML = `
  <div class="loading-container">
    ${body} // Adding the body variable inside the loading-container div
    <div class="loading-spinner"></div> // Adding a div with class "loading-spinner" inside the loading-container div
  </div>
  `;
  main.appendChild(spinner); // Appending the spinner element to the main element
};

// Initialize the editor
const editor = new Editor(main); // Creating a new instance of the Editor class and passing the main element as an argument

if (typeof editor === 'undefined') { // Checking if the editor is undefined
  loadSpinner(); // Calling the loadSpinner function
}

// Check if service workers are supported
if ('serviceWorker' in navigator) { // Checking if the serviceWorker property is available in the navigator object
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js'); // Creating a new instance of the Workbox class and passing the path to the service worker file as an argument
  workboxSW.register(); // Registering the service worker
} else {
  console.error('Service workers are not supported in this browser.'); // Logging an error message to the console if service workers are not supported
}
