
import { getDb, putDb } from './database';
import { body } from './body';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    
    
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      const contentString = data.map(item => item.content).join('\n');
      this.editor.setValue(contentString || localData || body);
    }).catch((err) => {
      console.error('Error loading data from IndexedDB:', err);
      this.editor.setValue(localData || body);
    });
    

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}
