let heading = document.querySelector("#main-heading");

// DOM API uses the term listener, the term handler is more commonly used to describe
// a function that reacts to an event.

heading.addEventListener('click', ()=> {
    console.log("You clicked the heading!");
});

document.querySelector("em").addEventListener("click", () => 
{ 
  console.log("You clicked the em element!"); 
}); 

document.querySelector("body").addEventListener("click", ()=> {
  console.log("You clicked the body element!"); 
});


let wordList = document.querySelector('#word-list');
let sentence = document.querySelector('#sentence')

wordList.addEventListener('click', event => {
    let word = event.target.textContent;
    sentence.textContent += word;
    sentence.textContent += ' ';
})


let box = document.querySelector('#box');

// document.querySelector('html').addEventListener('mousemove', e => {
//     box.style.left = e.clientX + 'px';
//     box.style.top = e.clientY + 'px';
//     console.log(`mousemove x: ${e.clientX}, y: ${e.clientY}`);
// })

let currentX = 0;
let currentY = 0;

document.querySelector("html").addEventListener("keydown", e => { 

    if (e.key == "w") {
        currentY -= 5;
    } else if (e.key == "a") { 
    currentX -= 5; 
    } else if (e.key == "s") { 
    currentY += 5; 
    } else if (e.key == "d") { 
    currentX += 5; 
    } 

    box.style.left = currentX + 'px';
    box.style.top = currentY + 'px';

});

 