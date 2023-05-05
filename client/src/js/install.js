

const butInstall = document.getElementById('buttonInstall');

let deferredPrompt; // Declare a variable to store the beforeinstallprompt event

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event; // Save the event in the deferredPrompt variable
  butInstall.style.visibility = 'visible';
  textHeader.textContent = 'Click the button to install!';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Use the saved deferredPrompt instead of the event variable
    butInstall.setAttribute('disabled', true);
    butInstall.textContent = 'Installed!';
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  textHeader.textContent = 'Successfully installed!';
  console.log('👍', 'appinstalled', event);
});
