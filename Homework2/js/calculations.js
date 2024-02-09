window.addEventListener('DOMContentLoaded', (e) => {
 let total;
//first number
let entryOne= '';
//second number 
let entryTwo = '';
//history array
let history =[];
let currentState = null;
let hisitoryCleared = false;

//calculator display/input
let input= document.getElementById('user-input');
let entry;
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
        if(currentState === null && entryOne === ''){
            e.preventDefault();
        } else {
            if(currentState !== null && entryTwo !== ''){
                makeCalculaltion();
            }
            if(input.value[input.value.length-1]=== '+' || input.value[input.value.length-1]=== '-'|| input.value[input.value.length-1]=== '*' || input.value[input.value.length-1]=== '/'){
                console.log("not a number");
                input.value = input.value.slice(0,-1);
            }
        currentState = e.key;
        }
    } else if (e.key === '-'){
        if(currentState === null && entryOne === ''){
            e.preventDefault();
        } else {
            if(currentState !== null && entryTwo !== ''){
                makeCalculaltion();
            }
            if(input.value[input.value.length-1]=== '+' || input.value[input.value.length-1]=== '-'|| input.value[input.value.length-1]=== '*' || input.value[input.value.length-1]=== '/'){
                console.log("not a number");
                input.value = input.value.slice(0,-1);
            }
            currentState = e.key;
        }   
    } else if(e.key === '/'){
        if(currentState === null && entryOne === ''){
            e.preventDefault();
        } else {
            if(currentState !== null && entryTwo !== ''){
                makeCalculaltion();
            }
            if(input.value[input.value.length-1]=== '+' || input.value[input.value.length-1]=== '-'|| input.value[input.value.length-1]=== '*' || input.value[input.value.length-1]=== '/'){
                console.log("not a number");
                input.value = input.value.slice(0,-1);
            }
            currentState = '÷';
        }
    } else if (e.key === '*'){
        if(currentState === null && entryOne === ''){
            e.preventDefault();
        } else {
            if(currentState !== null && entryTwo !== ''){
                makeCalculaltion();
            }
            if(input.value[input.value.length-1]=== '+' || input.value[input.value.length-1]=== '-'|| input.value[input.value.length-1]=== '*' || input.value[input.value.length-1]=== '/'){
                console.log("not a number");
                input.value = input.value.slice(0,-1);
            }
            currentState = '×';
        }
    } else if( e.key === '=' || e.key === 'Enter'){
        e.preventDefault();
        if(currentState === null){
            return;
        }else{
            makeCalculaltion();
            currentState = null;
            // history.push(total);
            // updateHistory();
        }
        

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
        if(currentState === null && entryOne === ''){
           return;
        } else {
        if(currentState !== null && entryTwo !== ''){
            makeCalculaltion();
        }
            console.log(element.innerText);
            currentState = element.innerText;
            console.log(input.value[input.value.length-1]);
            if(input.value[input.value.length-1]=== '+' || input.value[input.value.length-1]=== '-'|| input.value[input.value.length-1]=== '×' || input.value[input.value.length-1]=== '÷'){
                console.log("not a number");
                input.value = input.value.slice(0,-1);
            }
                input.value += currentState;

        }   
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
    console.log("current State" + currentState);
    
    if(currentState === null ){
        return;
    }else{
        makeCalculaltion();

        currentState = null;
        //history.push(total);
       // updateHistory();
    }
  

})

function makeCalculaltion(){
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
    console.log(total);
    if(total == NaN || total === Infinity || isNaN(total) ){
        errorMessage();
    }else{
        console.log("1",total);
        input.value = total;
        history.push(total);
        updateHistory();
        entryOne = total;
        entryTwo = '';
    }
  
}
function updateHistory(){
    if(history.length !==0){
        let lastEntry = history[history.length-1];
        document.getElementById('past-entries').innerHTML += `<div id="entries">${lastEntry}</div><br/>`;
        historyClick();

    } else if( hisitoryCleared === true){
        //clear all history elements using .remove
        document.getElementById('past-entries').innerHTML = "";
    }
    else{
        return;
    }

}
 function historyClick(){
     entry= document.querySelectorAll("#entries");
    entry.forEach(element =>{
        element.addEventListener('click', e =>{
            console.log ("click: ", element.innerHTML);
            if(currentState === null && entryOne ===''){
                entryOne += element.innerHTML;
                input.value = entryOne;

                
            }else if (currentState === null && entryOne !=='') {
                return;
            } else if (currentState !== null ){
                entryTwo = element.innerHTML;
                input.value = entryTwo;
            }
        })
      
        })

    }
let clearHistory = document.querySelector(".clear-history");
clearHistory.addEventListener('click', e =>{
    //  console.log("before: ",entry);
    //  entry = entry.forEach(element => {
    //     element.remove();
    // })
    // console.log("after: ",entry);
    console.log (history);
    history = [];
    console.log("after ", history)
    hisitoryCleared = true;
    updateHistory();
})
function errorMessage(){
    input.value = 'ERROR PLEASE CLEAR';
    total = null;
    document.getElementById("equal").disabled = true;
    btn.forEach(element =>{
        element.disabled = true;
    })
    opperation.forEach( element =>{
        element.disabled = true;
    })
    signChange.disabled =true;
    equals.disabled =true;
    clearEntry.disabled =true;
    input.disabled = true;

    document.getElementById("clear").onclick = function (){
        document.getElementById("equal").disabled = false;
        btn.forEach(element =>{
            element.disabled = false;
        })
        opperation.forEach( element =>{
            element.disabled = false;
        })
        signChange.disabled =false;
        equals.disabled =false;
        clearEntry.disabled =false;
        input.disabled = false;
    }

}

let themePink = document.getElementById('pink');
let themeBlue = document.getElementById('blue');
let themeGreen = document.getElementById('green');
let calculator = document.querySelector('#calculator');
let calcBtns = document.querySelectorAll('#calculator button');
let historyColor = document.querySelector('#history');
let historyBtn = document.querySelector('#history button');
themePink.addEventListener('click', e =>{
    console.log("Pink: ", themePink.checked);
    console.log("Blue: ",themeBlue.checked);
    console.log("Green: ",themeGreen.checked);
    if(themePink.checked === true){
        calculator.classList.remove('green');
        calculator.classList.remove('blue');
        calcBtns.forEach(element =>{
            element.classList.remove('green');
            element.classList.remove('blue');
        })
        historyColor.classList.remove('green');
        historyColor.classList.remove('blue');
        historyBtn.classList.remove('green');
        historyBtn.classList.remove('blue');
        

    }
})
themeBlue.addEventListener('click', e =>{
    console.log("Pink: ", themePink.checked);
    console.log("Blue: ",themeBlue.checked);
    console.log("Green: ",themeGreen.checked);
    if(themeBlue.checked === true){
        calculator.classList.add('blue');
        calcBtns.forEach(element =>{
        element.classList.remove('green');
        element.classList.add('blue');
        })
        historyColor.classList.add('blue');
        historyColor.classList.remove('green');
        historyBtn.classList.add('blue');
       

    } else {
        calculator.classList.remove('blue');
        calcBtns.forEach(element =>{
        element.classList.remove('blue');
        })
        historyColor.classList.remove('blue');
       
        historyBtn.classList.remove('blue');


    }
})
   

themeGreen.addEventListener('click', e =>{
    console.log("Pink: ", themePink.checked);
    console.log("Blue: ",themeBlue.checked);
    console.log("Green: ",themeGreen.checked);
    if(themeGreen.checked === true){
        calculator.classList.remove('blue');
        
        calculator.classList.add('green');
        calcBtns.forEach(element =>{
        element.classList.remove('blue');
        element.classList.add('green');
        })
        historyColor.classList.remove('blue');
        historyColor.classList.add('green');
        historyBtn.classList.remove('blue');
        historyBtn.classList.add('green');
       
    } else {
        calculator.classList.remove('green');
        calcBtns.forEach(element =>{
        element.classList.remove('green');
        historyColor.classList.remove('green');
        historyBtn.classList.remove('green');

        })
    }
})

    
});
