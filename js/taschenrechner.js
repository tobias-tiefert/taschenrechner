// Color Change
const colorSelect     = document.querySelector("#color-select");
const htmlBody        = document.body;
const htmlShadow      = document.querySelector(".shadow");
const colorBtnOrange  = document.querySelector("#orange");
const colorBtnGray    = document.querySelector("#grau");
const colorBtnBeige   = document.querySelector("#beige");
const colorHeadline   = document.querySelector("#color-headline");

colorSelect.addEventListener("click", changeColor);

function changeColor(){
    let target = event.target;
    target.classList.add("active-color")
    switch(target){
        case colorBtnOrange:
            colorBtnBeige.classList.remove("active-color");
            colorBtnGray.classList.remove("active-color");
            colorHeadline.style.color ="var(--orange)";
            htmlShadow.style.backgroundColor ="var(--orange)";
            htmlBody.style.backgroundColor ="var(--orange-dunkel)";
            break;
        case colorBtnGray:
            colorBtnBeige.classList.remove("active-color");
            colorBtnOrange.classList.remove("active-color");
            colorHeadline.style.color ="var(--grau-hell)";
            htmlShadow.style.backgroundColor ="var(--grau-hell)";
            htmlBody.style.backgroundColor ="var(--grau-dunkel)";
            break;
        case colorBtnBeige:
            colorBtnGray.classList.remove("active-color");
            colorBtnOrange.classList.remove("active-color");
            htmlShadow.style.backgroundColor ="var(--beige)";
            colorHeadline.style.color ="var(--beige)";
            htmlBody.style.backgroundColor ="var(--beige-dunkel)";
            break;
    } 
}

// Calculator