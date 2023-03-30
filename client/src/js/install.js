const butInstall = document.getElementById('buttonInstall');

// event listener for before the install button is clicked 
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    
    butInstall.style.visibility = 'visible';

    // event listener for when the install button is clicked
    butInstall.addEventListener('click', async () => {

    // prompts the installation process and disables the install button
    await event.prompt();
    butInstall.setAttribute('disabled', true);

    });

});


// handles what happens upon successful app installation
window.addEventListener('appinstalled', () => {
   console.log("App installed successfully");

});

