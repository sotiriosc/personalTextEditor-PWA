const butInstall = document.getElementById('buttonInstall');

if (!butInstall) {
  console.error('buttonInstall element not found');
} else {
  console.log('buttonInstall element found');
  butInstall.disabled = true; // Disable the button initially
}

window.addEventListener('beforeinstallprompt', (event) => {
  console.log('beforeinstallprompt event fired');
  event.preventDefault();
  window.deferredPrompt = event;
  butInstall.disabled = false; // Enable the button when the event fires
});

// Rest of your code remains the same


butInstall.addEventListener('click', async () => {
  console.log('buttonInstall clicked');

  if (window.deferredPrompt) {
    const promptEvent = window.deferredPrompt;
    promptEvent.prompt();

    const userChoice = await promptEvent.userChoice;

    if (userChoice.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    window.deferredPrompt = null;
  } else {
    console.log('No deferredPrompt available');
  }
});

window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed successfully.');
  alert('PWA installed successfully.');
});

window.addEventListener('appinstallerror', (event) => {
  console.error('PWA installation failed:', event);
  alert('Install not successful, Browser may not support APP');
});
