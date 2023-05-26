const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
  // Store the event so it can be triggered later
  window.deferredPrompt = event;
  // Update UI notify the user they can add to home screen
  butInstall.style.display = "block";
});


butInstall.addEventListener('click', async () => {
  // Hide our user interface that shows our A2HS button
  butInstall.style.display = "none";
  // Show the prompt
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  promptEvent.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await promptEvent.userChoice;
  console.log(`User response to the install prompt: ${outcome}`);
  // Clear stored prompt since it can't be used again
  window.deferredPrompt = null;
});


window.addEventListener('appinstalled', (event) => {
  console.log("App installed successfully:", event);
  window.deferredPrompt = null;
});
