let selectedImage;

const imageInput = document.getElementById("imageInput");
const petDisplay = document.getElementById("petDisplay");

function loadIMG(){
    let img = imageInput.files[0];
    console.log(img);

    displayImage(img);
}

function displayImage(img){
    const fileReader = new FileReader();
    
    fileReader.readAsDataURL(img);
    fileReader.addEventListener("load", function(){
        petDisplay.src = this.result;
    })
}