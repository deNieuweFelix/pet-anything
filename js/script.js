let selectedImage;

const imageInput = document.getElementById("imageInput");
const petDisplay = document.getElementById("petDisplay");

const settings = document.getElementById("settings");
const customizeWindow = document.getElementById("customize");

document.addEventListener("load", onLoad());

let customizeWindowStatus = {
    'visible': false
};

//you can change these settings in the source code to change them on load, lol
let CustomSettings = {
    'bgColor': '#000011',
    'instantLoad': true
};

let imageDone = false;


function onLoad(){
    customizeWindow.remove();

    setTimeout(function(){
        if(CustomSettings.instantLoad == true){
            // imageInput.addEventListener('change', displayImage(this.files[0]));
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
    }, 150);
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