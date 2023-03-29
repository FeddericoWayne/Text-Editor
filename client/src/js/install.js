const butInstall = document.getElementById('buttonInstall');


window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    
    butInstall.style.visibility = 'visible';

    butInstall.addEventListener('click', async () => {

    await event.prompt();
    butInstall.setAttribute('disabled', true);

    });

});



window.addEventListener('appinstalled', () => {
   console.log("App installed successfully");

});

