// let arr1 = [1, 2, 3, 4];

// function add(arr) {
//     let result = 0;
//     arr.forEach(element => {
//         result += element;
//     });
//     return result;
// }

// console.log(add(arr1));





const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce( 
  (accumulator, arrayCurrent) => {
    console.log(accumulator);
    accumulator.push(arrayCurrent);
    return accumulator;
  },
  []
);

console.log(sumWithInitial);
