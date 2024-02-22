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
      imageInput.addEventListener('change', previewSelectedImage);
      submitBtn.addEventListener('click', e =>{
         const firstSender = document.getElementById('first-name');
         const lastSender = document.getElementById('last-name');
         const firstRecipient = document.getElementById('first-name-rec');
         const lastRecipient = document.getElementById('last-name-rec');


      });


    });
