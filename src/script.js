setInterval(setClock, 1000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function setClock(){
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12

    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)
}

function setRotation(element, rotationRatio){
    element.style.setProperty('--rotation', rotationRatio * 360)
}

setClock()




let character = document.getElementById("character");
let game = document.getElementById("game");
let interval;
let both = 0;
let counter = 0;
let currentBlocks = [];

 function moveLeft(){
     let left = 
     parseInt(window.getComputedStyle(character).getPropertyValue("left"));
     if(left>-440){
         character.style.left = left - 2 + "px";
     }
 }

 function moveRight(){
     let left = 
     parseInt(window.getComputedStyle(character).getPropertyValue("left"));
     if(left<435){
         character.style.left = left + 2 + "px";
     }
 }

 document.addEventListener("keydown", event => {
     if(both === 0){
         both+=1;
         if(event.key === "ArrowLeft"){
            interval = setInterval(moveLeft, 1);
         }
         if(event.key === "ArrowRight"){
            interval = setInterval(moveRight, 1);
         }
     }
 });

 document.addEventListener("keyup", event =>{
     clearInterval(interval);
     both=0;
 })

let blocks = setInterval(function(){
    let blockLast = document.getElementById("block"+(counter-1));
    let holeLast = document.getElementById("hole"+(counter-1));
    if(counter>0){
        let blockLastTop = 
        parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        let holeLastTop = 
        parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }


    if(blockLastTop<400 || counter === 0){
        let block = document.createElement("div");
        let hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block"+counter);
        hole.setAttribute("id", "hole"+counter);
        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";
        let random = Math.floor(Math.random() * 360);
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter)
        counter += 1;

    }
    let characterTop = 
    parseInt(window.getComputedStyle(character).getPropertyValue("top"))
    let characterLeft = 
    parseInt(window.getComputedStyle(character).getPropertyValue("left"))
    let drop = 0;

    if(characterTop <= 0){
        alert("Game over. Score: "+(counter-9));
        clearInterval(blocks);
        location.reload();
    }

    for(let i = 0; i < currentBlocks.length; i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let ihole = document.getElementById("hole"+current);
        let iblockTop = 
        parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        iblock.style.top = iblockTop - 0.5 + "px";
        ihole.style.top = iblockTop - 0.5 + "px";
        if(iblockTop < -20){
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }
        if(iblockTop-20 < characterTop && iblockTop > characterTop){
            drop += 1;
            if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft){
                drop = 0;
            }
        }
    }
    if(drop === 0){
        if(characterTop < 480){
            character.style.top = characterTop + 2 + "px";
        }
    } else {
        character.style.top = characterTop - 0.5 + "px";
    }
}, 1)
