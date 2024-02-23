import * as validate from "./validate.js";
document.addEventListener('DOMContentLoaded', () => {

const imageInput = document.getElementById('imageInput');
      const previewImage = document.getElementById('previewImage');
      const submitBtn = document.getElementById('send');

      function previewSelectedImage() {
         const file = imageInput.files[0];
         console.log("input: ", imageInput.files[0]);
         if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) {
               previewImage.src = e.target.result;
            }
         } 
      }
      //Inserts - for card number formatting
      const cardNumber = document.getElementById('card');
      cardNumber.addEventListener('input', e =>{
         var position = cardNumber.selectionEnd;
         var length = cardNumber.value.length;
        cardNumber.value = cardNumber.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})(?!$)/g, '$1-').trim();
        cardNumber.selectionEnd = position += ((cardNumber.value.charAt(position - 1) === '-' && cardNumber.value.charAt(length - 1) === '-' && length !== cardNumber.value.length) ? 1 : 0);
      });

      // Inserts / for date formatting
      const expiration = document.getElementById('expiration');
      expiration.addEventListener('input', e =>{
         var position = expiration.selectionEnd;
         var length = expiration.value.length;
         expiration.value = expiration.value.replace(/[^\dA-Z]/g, '').replace(/(.{2})(?!$)/g, '$1/').trim();
         expiration.selectionEnd = position += ((expiration.value.charAt(position - 1) === '/' && expiration.value.charAt(length - 1) === '/' && length !== expiration.value.length) ? 1 : 0);
      });

      // Inserts - for phone number formatting
      const phoneNumber = document.getElementById('phone');
      phoneNumber.addEventListener('input', e =>{
         var position = phoneNumber.selectionEnd;
         var length = phoneNumber.value.length;
         phoneNumber.value = phoneNumber.value.replace(/[^\d]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3').trim();
         phoneNumber.selectionEnd = position += ((phoneNumber.value.charAt(position - 1) === '-' && phoneNumber.value.charAt(length - 1) === '-' && length !== phoneNumber.value.length) ? 1 : 0);

      });
      imageInput.addEventListener('change', previewSelectedImage);

     
      const notifications = document.querySelectorAll('input[type="radio"][name="notify"]');
      const emailNotify = document.getElementById('email');
      const smsNotify = document.getElementById('phone');

      notifications.forEach(element => {
         element.addEventListener('change', e =>{
            if(element.checked && element.value === 'Email'){
               smsNotify.disabled = true;
               smsNotify.value = '';
               emailNotify.disabled = false;
            } else if (element.checked && element.value === 'SMS'){
               smsNotify.disabled = false;
               emailNotify.disabled = true;
               emailNotify.value = '';
            } else if (element.checked && element.value === 'No-notify'){
               smsNotify.disabled = true;
               emailNotify.disabled = true;
               smsNotify.value = '';
               emailNotify.value = '';
            } else {
               smsNotify.disabled = false;
               emailNotify.disabled = false;
            }
         });
      });

      submitBtn.addEventListener('click', e =>{
         const firstSender = document.getElementById('firstName');
         const lastSender = document.getElementById('lastName');
         const firstRecipient = document.getElementById('firstNameRec');
         const lastRecipient = document.getElementById('lastNameRec');
         const message = document.getElementById('message');
         const notifications = document.querySelectorAll('input[type="radio"][name="notify"]');
         const email = document.getElementById('email');
         const phone = document.getElementById('phone');
         const cardNumber = document.getElementById('card');
         const expiration = document.getElementById('expiration');
         const ccv = document.getElementById('ccv');
         const amount = document.getElementById('amount');
         const terms = document.getElementById('terms');

         if(validate.checkNames(firstSender.value) === false){
            alert("sender first name invalid") ;
            e.preventDefault();
         } else if(validate.checkNames(lastSender.value) === false){
            alert("sender last name invalid") ;
            e.preventDefault();
         } else if(validate.checkNames(firstRecipient.value) === false){
            alert("recipient first name invalid") ;
            e.preventDefault();
         } else if(validate.checkNames(lastRecipient.value) === false){
            alert("recipient last name invalid") ;
            e.preventDefault();
         } else if(validate.checkMessage(message.value) === false){
            alert("message is invalid") ;
            e.preventDefault();
         } else if(validate.notifyChecked(notifications,email.value,phone.value) === false){
            alert("notifications invalid") ;
            e.preventDefault();
         } else if(validate.checkCardNum(cardNumber.value) === false){
            alert("card number invalid") ;
            e.preventDefault();
         } else if(validate.checkExpiration(expiration.value) === false){
            alert("expiration invalid") ;
            e.preventDefault();
         } else if(validate.checkCCV(ccv.value) === false){
            alert("ccv invalid") ;
            e.preventDefault();
         } else if(validate.checkAmount(amount.value) === false){
            alert("amount invalid") ;
            e.preventDefault();
         } else if(validate.checkTerms(terms)=== false){
            alert("Please check that you have read Terms and Conditions") ;
            e.preventDefault();
         }

      });



    });
