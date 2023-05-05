import { getDb, putDb } from './database'; // Importing functions to interact with IndexedDB
import { body } from './body'; // Importing default content

export default class {
  constructor() {
    const localData = localStorage.getItem('content'); // Get content from local storage

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') { // Check if CodeMirror is not loaded
      throw new Error('CodeMirror is not loaded'); // Throw an error
    }

    this.editor = CodeMirror(document.querySelector('#main'), { // Create a new CodeMirror instance
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // Load data from IndexedDB and inject it into the editor
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      const contentString = data.map(item => item.content).join('\n'); // Join all content items into a single string
      this.editor.setValue(contentString || localData || body); // Set the editor's value to the content string or local data or default content
    }).catch((err) => {
      console.error('Error loading data from IndexedDB:', err); // Log an error message
      this.editor.setValue(localData || body); // Set the editor's value to local data or default content
    });

    // Save the editor's content to local storage on change
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the editor's content to IndexedDB on blur
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content')); // Save the content to IndexedDB
    });
  }
}
