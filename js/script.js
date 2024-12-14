let selectedImage;

const imageInput = document.getElementById("imageInput");
const petDisplay = document.getElementById("petDisplay");

const settings = document.getElementById("settings");
const customizeWindow = document.getElementById("customize");

const bgColorInput = document.getElementById("bgColor");
const instantLoadCheck = document.getElementById("instantLoadCheck");

const terminal = document.getElementById("terminal");
const terminalConsole = document.getElementById("terminalConsole");

const allMessages = [];

terminalConsole.addEventListener("keydown", function(e){
    if(e.code === "Enter"){
        msg = terminalConsole.value;
        switch(msg){
            case '?help':
                fTerminal.write(
                    `Currently available commands:<br>
                    - ?help: shows all commands <br>
                    - !clr: clears the console`);
                break;
            case '!clr':
                allMessages.forEach(msg => {
                    msg.remove();
                });
                allMessages = [];
                break;
            default:
                fTerminal.write('> ' + msg);
                //general commands

                //commands that will execute something start with a !
                if(msg.includes("!")){
                    if(msg.includes("instaLoad")){
                        if(msg.includes("true")){
                            fTerminal.write("instantLoad: on", 'green');
                            CustomSettings.instantLoad = true;
                        }else if(msg.includes("false")){
                            fTerminal.write("instantLoad: off", 'red');
                            CustomSettings.instantLoad = false;
                        }else{
                            fTerminal.write("incorrect syntax: !instantLoad true / false", 'orange');
                        }
                    }else if(msg.includes("bgCol")){
                        if(msg.includes("reset")){
                            fTerminal.write("reset bgCol", 'green');
                            document.body.style.backgroundColor = '#000011';
                            document.body.style.color = '#FFFFFF';
                        }else if(msg.includes("white")){
                            fTerminal.write("set bgCol to white", 'green');
                            document.body.style.backgroundColor = '#FFFFFF';
                        }else if(msg.includes("light")){
                            fTerminal.write("light mode: on", 'green');
                            document.body.style.backgroundColor = `#FFFFFF`;
                            document.body.style.color = '#000000';
                        }else if(msg.includes("oled")){
                            fTerminal.write("oled mode: on", 'green');
                            document.body.style.backgroundColor = '#000000';
                            document.body.style.color = '#FFFFFF';
                        }else if(msg.includes("hell")){
                            fTerminal.write("Why?", 'purple');
                            document.body.style.backgroundColor = 'red';
                            document.body.style.color = 'green';
                        }
                    }else if(msg.includes("title")){
                        if(msg.includes("!set")){
                            CustomSettings.customTitle = prompt("set title:");
                            document.title = CustomSettings.customTitle;
                            fTerminal.write(`title set to: ${CustomSettings.customTitle}`, 'green');
                        }else if(msg.includes("reset")){
                            CustomSettings.customTitle = '';
                            document.title = "Pet anything!";
                            fTerminal.write('resetted title', 'green');
                        }
                    }else if(msg.includes("!!reload")){
                        location.reload();
                    }
                }else if(msg.includes("?")){
                    //commands that will retrieve a value
                    if(msg.includes("instaLoad")){
                        fTerminal.write(`instaload: ${CustomSettings.instantLoad}`, 'blue');
                    }else if(msg.includes("bgCol")){
                        fTerminal.write(`backgroundCol: ${CustomSettings.bgColor}`, 'blue');
                    }
                }
            break;
        }
    } 
});

document.addEventListener("load", onLoad());

let customizeWindowStatus = {
    'visible': false
};

//you can change these settings in the source code to change them on load, lol
let CustomSettings = {
    'bgColor': '#000011',
    'instantLoad': false,
    'customTitle': ''
};

let imageDone = false;


function onLoad(){
    customizeWindow.remove();

    setTimeout(autoLoad, 150);
}

function autoLoad(){
    if(CustomSettings.instantLoad == true){
        let checkInterval = setInterval(function(){
            if(imageDone == true){
                clearInterval(checkInterval);
                setTimeout(function(){
                    console.clear();
                    setTimeout(() =>{
                        console.log("I did NOT just remove all the errors... \nwhy would i?");
                    })
                }, 150);
            }
            displayImage(imageInput.files[0]);
        }, 1000);
    }
}


function loadIMG(){
    let img = imageInput.files[0];
    console.log(img);

    displayImage(img);
}

function displayImage(img){
    const fileReader = new FileReader();
    if(!img && CustomSettings.instantLoad == false){
        document.getElementById("warningFirstLoad").innerHTML = "Image not loaded <br> file not found, try choosing an image";
    }
    
    fileReader.readAsDataURL(img);
    fileReader.addEventListener("load", function(){
        if(this.result){
            petDisplay.src = this.result;
            document.getElementById("warningFirstLoad").remove();
            petDisplay.classList.add("downAnimation");
            imageDone = true;
            petDisplay.addEventListener("animationend", function(){
                petDisplay.classList.remove("downAnimation");
                petDisplay.classList.add("afterDownAnimation");
            })
        }
    });
}
function openWindow(window){
    switch(window){
        case 0:
            if(customizeWindowStatus.visible == false){
                settings.appendChild(customizeWindow);
                customizeWindowStatus.visible = true;
            }else{
                customizeWindow.remove();
                customizeWindowStatus.visible = false;
            }
            break;
        default:
            break;
    }
}

//0 = background color
function changeSetting(setting){
    switch(setting){
        case 0:
            console.log("ermm");
            CustomSettings.bgColor = bgColorInput.value;
            console.log(bgColorInput.value);

            document.body.style.backgroundColor = CustomSettings.bgColor;

            fTerminal.write(`bg changed to: ${CustomSettings.bgColor}`);
            break;
        case 1:
            if(instantLoadCheck.checked){
                fTerminal.write("instantLoad: on", 'green');
                CustomSettings.instantLoad = true;
            }else{
                fTerminal.write("instantLoad: off", 'red');
                CustomSettings.instantLoad = false;
            }
        default:
            break;
    }
}

const fTerminal = {
    write: function(msg, clr){
        var msgP = document.createElement("p");
        terminal.appendChild(msgP);
        msgP.style.color = clr;
        msgP.innerHTML = msg;
        allMessages.push(msgP);
    }
}

var mainLongLoop = setInterval(function(){
    autoLoad();
}, 2000);