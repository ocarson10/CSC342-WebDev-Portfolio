window.addEventListener('DOMContentLoaded', (e) => {
 
//first number
let entryOne= '';
//second number 
let entryTwo = '';
//history array
let history =[];
let currentState = null;
//calculator display/input
let input= document.getElementById('user-input');
input.addEventListener('keydown', e => {
    console.log(e);
    if(!isNaN(e.key) || e.key === '.'){
        console.log("integer");
        if(currentState === null){
            entryOne += e.key;
        }else {
            entryTwo += e.key;
           }
    }else if(e.key === '+'){
        if(currentState !== null && entryTwo !== ''){
            makeCalculaltion();
        }
        currentState = e.key;
    } else if (e.key === '-'){
        if(currentState !== null && entryTwo !== ''){
            makeCalculaltion();
        }
        currentState = e.key;
    } else if(e.key === '/'){
        if(currentState !== null && entryTwo !== ''){
            makeCalculaltion();
        }
        currentState = '÷';
    } else if (e.key === '*'){
        if(currentState !== null && entryTwo !== ''){
            makeCalculaltion();
        }
        currentState = '×';
    } else if( e.key === '=' || e.key === 'Enter'){
        e.preventDefault();
        makeCalculaltion();
        currentState = null;
        history.push(total);
        updateHistory();

    } else {
        e.preventDefault();
    
    }

})
//number buttons
let btn = document.querySelectorAll('.number-btn');
btn.forEach(element => {
    element.addEventListener('click', e =>{
        console.log(element.innerText);
       if(currentState === null){
        entryOne += element.innerText;
        input.value = entryOne;
       } else {
        entryTwo += element.innerText;
        input.value = entryTwo;
       }
    });
});
let clear = document.getElementById('clear');
    clear.addEventListener('click', e => {
        console.log("clear all data");
        input.value = '';
        entryOne= '';
        entryTwo= '';
        currentState = null;
    })
 let clearEntry = document.getElementById('clear-entry');
 clearEntry.addEventListener('click', e => {
    console.log("clear single entry");
    if(currentState === null){
        entryOne = '';
        input.value = entryOne;

    } else {
        entryTwo = '';
        input.value = entryTwo;

    }
})

let opperation = document.querySelectorAll('.opperation');
opperation.forEach( element => {
    element.addEventListener('click', e =>{
        if(currentState !== null && entryTwo !== ''){
            makeCalculaltion();
        }
        console.log(element.innerText);
        currentState = element.innerText;
        input.value += currentState;
    
    })
});

let signChange = document.getElementById('plus-minus');
signChange.addEventListener('click', e => {
    if(currentState === null){
        let floatNum = parseFloat(entryOne);
        floatNum *= -1;
        entryOne = String(floatNum);
        input.value = entryOne;
    } else {
        let floatNum = parseFloat(entryTwo);
        floatNum *= -1;
        entryTwo = String(floatNum);
        input.value = entryTwo;

    }
})
let equals = document.getElementById('equal');
equals.addEventListener('click', e => {
    makeCalculaltion();
    currentState = null;
    history.push(total);
    updateHistory();

})

function makeCalculaltion(){
    let total;
    console.log(currentState);
    entryOne = parseFloat(entryOne);
    entryTwo = parseFloat(entryTwo);
    switch (currentState){
        case '-':
            total = entryOne - entryTwo;
            break;
        case '+':  
            total = entryOne + entryTwo;
            break;
        case '×':  
            total = entryOne * entryTwo;
            break;  
        case '÷': 
            total = entryOne / entryTwo;
            break;
        default:
            return;    
    }
    input.value = total;
    history.push(total);
    updateHistory();
    entryOne = total;
    entryTwo = '';
}
function updateHistory(){
    if(history.length !=0){
        let lastEntry = history[history.length-1];
        document.getElementById('past-entries').innerHTML += `<div id="entries">${lastEntry}</div><br/>`;
        
    } else{
        return;
    }
}
});
