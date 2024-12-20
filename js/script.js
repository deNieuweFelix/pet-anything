let selectedImage;

const imageInput = document.getElementById("imageInput");
const petDisplay = document.getElementById("petDisplay");

const settings = document.getElementById("settings");
const customizeWindow = document.getElementById("customize");

const bgColorInput = document.getElementById("bgColor");
const instantLoadCheck = document.getElementById("instantLoadCheck");

const terminal = document.getElementById("terminal");
const terminalConsole = document.getElementById("terminalConsole");

const autoCLRcon = document.getElementById("autoCLRcon");
const customCLRint = document.getElementById("customCLRint");
const customCLRval = document.getElementById("customCLRval");
const noSaveMeta = document.getElementById("noSaveMeta");

const closeButton = document.getElementById("closeButton");
const miniButton = document.getElementById("miniButton");

const rockPaperScissors = document.getElementById("rockPaperScissors");

const dialogue = document.getElementById("dialogue");
const faceDisplay = document.getElementById("faceDisplay");

const clock = document.getElementById("clock");
const clockDisplay = document.getElementById("clockDisplay");
const clockDateDisplay = document.getElementById("clockDateDisplay");

const allMessages = [];
const MSGinfo = [];

let currentLongLoop = 0;

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
                            fTerminal.Error("001 incorrect syntax!");
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
                    }else if(msg.includes("terminal")){
                        if(msg.includes("-width")){
                            if(msg.includes("reset")){
                                CustomSettings.customConsoleWidth = null;
                                terminal.style.width = '300px';
                                fTerminal.write('resetted console width', 'green');
                            }else if(msg.includes("-grow")){
                                if(CustomSettings.customConsoleWidth){
                                    CustomSettings.customConsoleWidth + CustomSettings.growValue;
                                    terminal.style.width = CustomSettings.customConsoleWidth + 'px';
                                    fTerminal.write(`grew console width with ${CustomSettings.growValue}px`, 'green');
                                }else{
                                    fTerminal.write('This command only works with custom width.', 'red');
                                }
                            }else if(msg.includes("-shrink")){
                                if(CustomSettings.customConsoleWidth){
                                    CustomSettings.customConsoleWidth - CustomSettings.shrinkValue;
                                    terminal.style.width = CustomSettings.customConsoleWidth + 'px';
                                    fTerminal.write(`shrunk console width with ${CustomSettings.shrinkValue}px`, 'green');
                                }
                            }else{
                                CustomSettings.customConsoleWidth = prompt("new console width:");
                                terminal.style.width = CustomSettings.customConsoleWidth + 'px';
                                fTerminal.write(`set console width to: ${CustomSettings.customConsoleWidth}px`, 'green');
                            }
                        }
                    }else if(msg.includes("game")){
                        if(msg.includes("-rps")){
                            if(msg.includes("-terminal")){
                                rockPaperScissorsGame(prompt("0 / 1 / 2 (rock / paper / scissors)"));
                            }else{
                                if(CustomSettings.miniGames.RPS.closed == true){
                                    fTerminal.write("opening rock paper scissors game...", 'green');
                                    document.body.append(rockPaperScissors);
                                    CustomSettings.miniGames.RPS.closed = false;
                                }else{
                                    fTerminal.write("closing rock paper scissors game...", 'yellow');
                                    document.body.removeChild(rockPaperScissors);
                                    CustomSettings.miniGames.RPS.closed = true;
                                }
                            }
                        }
                    }else if(msg.includes("acti")){
                        if(msg.includes("-coinFlip")){
                            if(msg.includes("-log")){
                            }
                        }
                    }else if(msg.includes("app")){
                        if(msg.includes("-clk")){
                            if(CustomSettings.apps.clock.closed == true){
                                CustomSettings.apps.clock.closed = false;
                                document.body.appendChild(clock);
                                fTerminal.write("opened clock app", 'green');
                            }else{
                                CustomSettings.apps.clock.closed = true;
                                clock.remove();
                                fTerminal.write("closed clock app", 'yellow');
                                
                            }
                        }
                    }
                }else if(msg.includes("?")){
                    //commands that will retrieve a value
                    if(msg.includes("instaLoad")){
                        fTerminal.write(`instaload: ${CustomSettings.instantLoad}`, 'blue');
                    }else if(msg.includes("bgCol")){
                        fTerminal.write(`backgroundCol: ${CustomSettings.bgColor}`, 'blue');
                    }else if(msg.includes("longLoop")){
                        fTerminal.write(`current long loops performed: ${currentLongLoop}`, 'blue');
                    }else if(msg.includes("sessionLength")){
                        fTerminal.write(`current session length: ${currentLongLoop * 2}`, 'blue');
                    }else if(msg.includes("metaConsole")){
                        let i = 0;
                        for(const msg of MSGinfo){
                            i++;
                            console.log(`message number: ${i}`);
                            console.log(`message content: ${msg.MSG}`);
                            console.log(`message color: ${msg.CLR}`);
                            console.log(`message time: ${msg.TME.HRS}:${msg.TME.MIN}:${msg.TME.SEC}`);
                            console.log('\n');
                        }
                        fTerminal.write("all terminal meta info logged to console", 'green');
                    }else if(msg.includes("metaSearch")){
                        if(msg.includes("-char")){
                            const charToSearch = prompt("search for what character?");
                            if(charToSearch != ""){
                                const foundMSGs = [];
                                let numOfMSG = 0;
                                for(const msg of MSGinfo){
                                    if((msg.MSG).includes(charToSearch)){
                                        console.log(`found: ${msg.MSG}`);
                                        numOfMSG++;
                                        foundMSGs.push(msg.MSG);
                                    }
                                }
                                fTerminal.write(`found ${numOfMSG} messages`);
                                for(const fndMSG of foundMSGs){
                                    fTerminal.write(fndMSG, 'lime');
                                }
                            }
                        }else if(msg.includes("-dwn")){
                            const downloadA = document.createElement("a");
                            const downloadContent = [];
                            for(const msg of MSGinfo){
                                const contToPush = `${msg.MSG}, ${msg.CLR}, ${msg.TME.HRS}:${msg.TME.MIN}:${msg.TME.SEC} \n`;
                                downloadContent.push(contToPush);
                            }
                            downloadContent.push("\n this is an official metaSearch file :3 :3 :3 \n do NOT remove these lines!");
                            downloadContent.push("\n thanks for using pet anything <3");
                            const dataToDownload = downloadContent.join("");
                            const file = new Blob([dataToDownload], {type: 'text/plain'});
                            downloadA.href = URL.createObjectURL(file);
                            downloadA.download = "msg_meta_data.txt";
                            downloadA.click();
                            URL.revokeObjectURL(downloadA.href);
                        }
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
    bgColor: '#000011',
    instantLoad: false,
    autoClearConsole: false,
    autoClearInterval: 1,
    customTitle: '',
    noSaveMeta: false,
    customConsoleWidth: null,
    customConsoleHeight: null,
    growValue: 50,
    shrinkValue: 50,
    miniGames: {
        RPS: {
            minimised: false,
            closed: true
        }
    },
    apps: {
        clock: {
            closed: true
        }
    }
};

let imageDone = false;

rockPaperScissors.remove();
clock.remove();

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
//1 = toggle instant load
//2 = toggle auto clear console
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
            break;
        case 2:
            if(autoCLRcon.checked){
                customCLRint.removeAttribute('disabled');
                CustomSettings.autoClearConsole = true;
            }else{
                customCLRint.disabled = true;
                CustomSettings.autoClearConsole = false;
            }
            break;
        case 3:
            if(noSaveMeta.checked){
                CustomSettings.noSaveMeta = true;
                fTerminal.write("disabled meta data", 'red');
            }else{
                CustomSettings.noSaveMeta = false;
                fTerminal.write("enabled meta data", 'green');
            }
            break;
        default:
            break;
    }
}

const fTerminal = {
    write: function(msg, clr){
        const metaDate = new Date;
        var msgP = document.createElement("p");
        var MSGmeta = {
            MSG: msg,
            CLR: clr,
            TME: {
                SEC: metaDate.getSeconds(),
                MIN: metaDate.getMinutes(),
                HRS: metaDate.getHours()
            }
        };
        terminal.appendChild(msgP);
        msgP.style.color = clr;
        msgP.innerHTML = msg;
        allMessages.push(msgP);
        if(!CustomSettings.noSaveMeta){
            MSGinfo.push(MSGmeta);
        }
    },
    clear: function(){
        allMessages.forEach(msg => {
            msg.remove();
        });
        allMessages = [];
    },
    Error: function(code){
        fTerminal.write("!Error -> " + code, 'red');
        console.log(code);
    }
}

var mainLongLoop = setInterval(function(){
    autoLoad();
    currentLongLoop++;
}, 2000);

setInterval(function(){
    console.log("fruuuu");
    if(CustomSettings.autoClearConsole){
        fTerminal.clear();
    }
}(CustomSettings.autoClearInterval));

function rpsTopBarControls(i){
    switch(i){
        case 0:
            document.body.removeChild(rockPaperScissors);
            CustomSettings.miniGames.RPS.closed = true;
            break;
        case 1:
            if(CustomSettings.miniGames.RPS.minimised == false){
                rockPaperScissors.style.transform = "scale(0.25)";
                rockPaperScissors.style.bottom = "-150px";
                rockPaperScissors.style.right = "-220px";
                rockPaperScissors.classList.add("idleAnimation");
                for(const child of rockPaperScissors.children){
                    child.classList.add("idleAnimation");
                    for(const grandChild of child.children){
                        grandChild.classList.add("idleAnimation");
                        for(const grandChild2 of grandChild.children){
                            grandChild2.classList.add("idleAnimation");
                        }
                    }
                }
                setTimeout(() => {
                    CustomSettings.miniGames.RPS.minimised = true;
                }, 100);
            }
            break;
        case 2:
            if(CustomSettings.miniGames.RPS.minimised == true){
                rockPaperScissors.style.transform = "scale(1)";
                rockPaperScissors.style.bottom = "50px";
                rockPaperScissors.style.right = "20px";
                rockPaperScissors.classList.remove("idleAnimation");
                for(const child of rockPaperScissors.children){
                    child.classList.remove("idleAnimation");
                    for(const grandChild of child.children){
                        grandChild.classList.remove("idleAnimation");
                        for(const grandChild2 of grandChild.children){
                            grandChild2.classList.remove("idleAnimation");
                        }
                    }
                }
                setTimeout(() => {
                    CustomSettings.miniGames.RPS.minimised = false;
                });
            }
            break;
        default:
            break;
    }
}

function rockPaperScissorsGame(choice){
    clearTimeout(resetFaceTimeout);
    var RPSdata = {
        playerChoice: choice,
        fullPlayerChoice: undefined,
        botChoice: undefined,
        fullBotChoice: undefined,
        winStatus: false,
        winner: undefined,
        message: undefined,
        face: undefined
    };

    //translate the numbers to an actual word i guess
    switch(RPSdata.playerChoice){
        case 0:
            RPSdata.fullPlayerChoice = "rock";
            break;
        case 1:
            RPSdata.fullPlayerChoice = "paper";
            break;
        case 2:
            RPSdata.fullPlayerChoice = "scissors";
            break;
        default:
            RPSdata.fullPlayerChoice = null;
            break;
    }

    //get and translate the bot choice (:
    RPSdata.botChoice = Math.floor(Math.random() * 3);
    switch(RPSdata.botChoice){
        case 0:
            RPSdata.fullBotChoice = "rock";
            break;
        case 1:
            RPSdata.fullBotChoice = "paper";
            break;
        case 2:
            RPSdata.fullBotChoice = "scissors";
            break;
        default:
            RPSdata.fullBotChoice = null;
            break;
    }

    //calculate them results!!!

    //note to self:
    //0 = rock
    //1 = paper
    //2 = scissors
    switch (RPSdata.playerChoice) {
        case 0: // Player chooses rock
            switch (RPSdata.botChoice) {
                case 0: // Bot chooses rock
                    RPSdata.winStatus = false;
                    RPSdata.winner = 'none'; // Tie
                    break;
                case 1: // Bot chooses paper
                    RPSdata.winStatus = true;
                    RPSdata.winner = 'bot';
                    break;
                case 2: // Bot chooses scissors
                    RPSdata.winStatus = true;
                    RPSdata.winner = 'player';
                    break;
                default:
                    fTerminal.write("unknown error, try again", 'red');
                    break;
            }
            break;
    
        case 1: // Player chooses paper
            switch (RPSdata.botChoice) {
                case 0: // Bot chooses rock
                    RPSdata.winStatus = true;
                    RPSdata.winner = 'player';
                    break;
                case 1: // Bot chooses paper
                    RPSdata.winStatus = false;
                    RPSdata.winner = 'none'; // Tie
                    break;
                case 2: // Bot chooses scissors
                    RPSdata.winStatus = true;
                    RPSdata.winner = 'bot';
                    break;
                default:
                    fTerminal.write("unknown error, try again", 'red');
                    break;
            }
            break;
    
        case 2: // Player chooses scissors
            switch (RPSdata.botChoice) {
                case 0: // Bot chooses rock
                    RPSdata.winStatus = true;
                    RPSdata.winner = 'bot';
                    break;
                case 1: // Bot chooses paper
                    RPSdata.winStatus = true;
                    RPSdata.winner = 'player';
                    break;
                case 2: // Bot chooses scissors
                    RPSdata.winStatus = false;
                    RPSdata.winner = 'none'; // Tie
                    break;
                default:
                    fTerminal.write("unknown error, try again", 'red');
                    break;
            }
            break;
    
        default:
            fTerminal.write("Invalid player choice", 'red');
            break;
    }

    RPSdata.message = `Player chose: ${RPSdata.fullPlayerChoice}, Bot chose: ${RPSdata.fullBotChoice}. ${RPSdata.winner} won!`;

    if(dialogue){
        dialogue.innerHTML = RPSdata.message;
    }
    if(RPSdata.winner == 'player'){
        fTerminal.write(RPSdata.message, 'green');
        RPSdata.face = '):';
    }else{
        fTerminal.write(RPSdata.message, 'red');
        if(RPSdata.winner == 'bot'){
            RPSdata.face = '(:<';
        }else{
            RPSdata.face = 'O:';
        }
    }
    faceDisplay.innerHTML = RPSdata.face;

    var resetFaceTimeout = setTimeout(() => {
        faceDisplay.innerHTML = '(:'
    }, 2500);

    if(RPSdata.winner == undefined){
        fTerminal.Error(":-rps-1: undefined winner");
    }
    console.log(RPSdata);
}

function coinFlip(mode){
    
}

//make that clocky work
var clockInterval = setInterval(function(){
    const curTime = new Date;
    curSec = (curTime.getSeconds());
    if(curSec < 10){
        curSec = "0" + (curTime.getSeconds());
    }
    curMin = (curTime.getMinutes());
    if(curMin < 10){
        curMin = "0" + (curTime.getMinutes());
    }
    curHr = (curTime.getHours()).toPrecision(2);
    if(curHr < 10){
        curHr = "0" + (curTime.getHours());
    }
    clockDisplay.innerHTML = `${curHr}:${curMin}:${curSec}`;
}, 1000);

var clockDateInterval = setInterval(function(){
    const curDate = new Date()
    const curDay = curDate.getDay();
    let dateString;
    switch(curDay){
        case 1:
            dateString = "Monday";
            break;
        case 2:
            dateString = "Tuesday";
            break;
        case 3:
            dateString = "Wednesday";
            break;
        case 4:
            dateString = "Thursday";
            break;
        case 5:
            dateString = "Friday";
            break;
        case 6:
            dateString = "Saturday";
            break;
        case 7:
            dateString = "Sunday";
            break;
        default:
            dateString = "Error loading date...";
            break;
    };
    clockDateDisplay.innerHTML = `${dateString}, ${curDate.getUTCDate()}`;
}, 2000);

// onmousemove = function(e){
//     if(clock.onmousedown){
//         console.log("aaa", e.clientY);
//         clock.style.top = e.clientY + "px";
//     }
// }
clock.addEventListener("mousedown", function(e){
    isDragging = true;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
});

function onMouseMove(e){
    if(isDragging){
        if(!(e.clientY >= (window.innerHeight) - (clock.offsetHeight) / 2)){
            console.log(e.clientY);
            if(e.clientY >= (clock.offsetHeight / 2)){
                clock.style.top = `${e.clientY - clock.offsetHeight / 2}px`;
            }
        }
    }
}

function onMouseUp(){
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
}
