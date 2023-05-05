const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior (browser prompting the user)
  event.preventDefault();

  // Store the event so it can be triggered later
  window.deferredPrompt = event;
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Check if there's a deferred prompt stored
  if (window.deferredPrompt) {
    const promptEvent = window.deferredPrompt;

    // Show the prompt to the user
    promptEvent.prompt();

    // Wait for the user's response
    const userChoice = await promptEvent.userChoice;

    // Check if the user accepted the prompt
    if (userChoice.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferred prompt
    window.deferredPrompt = null;
  }
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed successfully.');
  // Show an alert with the outcome of the installation
  alert('PWA installed successfully.');
});

// Add an event listener for the error during installation
window.addEventListener('appinstallerror', (event) => {
  console.error('PWA installation failed:', event);
  // Show an alert with an error message
  alert('Install not successful, Browser may not support APP');
});
