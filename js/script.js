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
    if(!img){
        document.getElementById("warningFirstLoad").innerHTML = "Image not loaded <br> file not found, try choosing an image";
    }
    
    fileReader.readAsDataURL(img);
    fileReader.addEventListener("load", function(){
        if(this.result){
            petDisplay.src = this.result;
            document.getElementById("warningFirstLoad").remove();
            petDisplay.classList.add("downAnimation");
        }
    })
}