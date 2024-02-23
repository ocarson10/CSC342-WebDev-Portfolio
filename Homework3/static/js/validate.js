
export function checkNameValid(first,last){
    if(first==='' || last===''){
        return false;
    } else if(first.toUpperCase() ==='STU' && last.toUpperCase() ==='DENT'){
        return false;
    } else {
        return true;
    }
}
// export function isValidInput(img, sfirst, slast, rfirst, rlast, message, notify, email, phone,cardNum,expiration,ccv,amount,terms)
// {
//     if(!checkNames(sfirst) || !checkNames(slast) || !checkNames(rfirst)|| !checkNames(rlast)){
//         return false;
//     } else if (!img.complete || !checkMessage(message)|| !notifyChecked(notify, email, phone) || !checkCardNum(cardNum) || !checkExpiration(expiration) || !checkCCV(ccv) || !checkAmount(amount) || !checkTerms(terms)){
//         return false;
    
//     } else {
//         return true;
//     } 
    
    
// }

export function checkNames(name){
    name = name.replace(/\s/g,'');
    if (name == ''){
        //alert("cannont have empty strings");
        return false;
    }
}
export function checkMessage(message){
    if(message.length < 10){
       // alert("message too short!");
        return false;
    }
}

export function notifyChecked(notify,email,phone) {
    let type=null;
    for( var i = 0; i < notify.length; i++){
        if(notify[i].checked){
            type = notify[i].value;
        }
    }
    if(type === 'Email'){
       return checkEmail(email);
    } else if (type === 'SMS'){
        return checkPhone(phone);
    } else if(type ==='No-notify'){
        return true;
    }else {
        alert("please select a notification");
        return false;
    }
}

export function checkEmail(email){
    var emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if(emailFormat.test(email)){
        return true;
    } else{
        alert("invalid email");
        return false;
    }
}

export function checkPhone(phone){
    var phoneFormat = /^\d{3}-\d{3}-\d{4}$/;
    if(phoneFormat.test(phone)){
        return true;
    } else {
        alert("invalid phone number")
        return false;
    }
}

export function checkCardNum(cardNum){
    var cardFormat =/^\d{4}-\d{4}-\d{4}-\d{4}$/;
    if(cardFormat.test(cardNum)){
        return true;
    }else{
        return false;
    }

}
export function checkExpiration(expiration){
    var currentDate = new Date();
    var cMonth = parseInt(currentDate.getMonth().toString()) + 1;
    // var cYear = currentDate.getFullYear.toString().slice(-2);
    var cYear = parseInt(currentDate.getFullYear().toString().slice(-2));
    var month = parseInt(expiration.slice(0,2));
    var year = parseInt(expiration.slice(-2));
    console.log(month, year, currentDate, cMonth, cYear);
    if(month === NaN || year === NaN){
      //  alert("please input proper date")
        return false;
    } else if(month <= 12 && month > 0){
        if(year > cYear){
            return true;
        }else if (year === cYear && month < cMonth){
            return true;
        } else{
            return false;
        }
    } else{
        return false;
    }
}
export function checkCCV(ccv){
        var numCCV = parseInt(ccv);
        if(numCCV === NaN){
            return false;
        } else if (ccv.length ===  4 || ccv.length === 3){
            return true;
        } else{
            return false;
        }
    }
    export function checkAmount(amount){
        var amountFormat = /^\$?\d+(\.\d{0,2})?$/;
        if(amountFormat.test(amount)){
            return true;
        }else {
            return false;
        }
        
    }

    export function checkTerms(terms){
        if(!terms.checked){
           // alert("please check terms and conditions");
            return false;
        } else {
            return true;
        }

    }
    
