document.querySelector(".landingPageB").addEventListener("click", function(){
     var activeButton = document.querySelector(".landingPageB");

     activeButton.classList.add("pressed");

     setTimeout(function(){
        activeButton.classList.remove("pressed");
     }, 50)
})
