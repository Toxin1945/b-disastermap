const audio = document.getElementById("voice");
var highlight;


function playGuide(){
    if(window.innerWidth >= 1000){
        highlight = document.getElementById("howToUse")
    }else{
        highlight = document.getElementById("menu");
    }

    audio.src = "./image/ガイド音声(ずんだもん).wav";
    audio.currentTime = 0;
    audio.play();

    setTimeout(() => {
        highlight.style.outline = "3px solid orange";
    }, 26000);

    audio.addEventListener("ended", () => {
        highlight.style.outline = "0px solid orange";
        closeModal();
    });
}

function openModal() {
    const modal = document.getElementById('modal');
    const closeEls = modal.querySelectorAll('[data-close]');
    modal.hidden = false;
    document.body.classList.add('modal-open');

    modal.querySelector('#closeBtn')?.focus();
    console.log(highlight);

}

function closeModal() {
    audio.pause();
    const modal = document.getElementById('modal');
    modal.hidden = true;
    document.body.classList.remove('modal-open');
}

window.addEventListener('load', openModal);
