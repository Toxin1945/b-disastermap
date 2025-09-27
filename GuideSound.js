const audio = document.getElementById("voice");
var highlight;


function playGuide(){
    //操作禁止(モーダル部分は除く)
    document.body.style.pointerEvents = 'none';
    document.getElementById('modal').style.pointerEvents = 'auto';

    if(window.innerWidth >= 1000){
        highlight = document.getElementById("howToUse")
    }else{
        highlight = document.getElementById("menu");
    }

    audio.src = "./image/guide_voice.wav";
    audio.currentTime = 0;
    audio.play();

    setTimeout(() => {
        closeModal(false);
    }, 24000);

    setTimeout(() => {
        highlight.style.outline = "5px solid orange";
    }, 26000);

    audio.addEventListener("ended", () => {
        document.body.style.pointerEvents = 'auto';
        highlight.style.outline = "0px solid white";
    });
}

function openModal() {
    const modal = document.getElementById('modal');
    const closeEls = modal.querySelectorAll('[data-close]');
    modal.hidden = false;
    document.body.classList.add('modal-open');

    modal.querySelector('#closeBtn')?.focus();

    sessionStorage.setItem('firstAccessDone', 'true');
}

function closeModal(isStopVoice) {
    if(isStopVoice){
        document.body.style.pointerEvents = 'auto';
        audio.pause();
    }
    const modal = document.getElementById('modal');
    modal.hidden = true;
    document.body.classList.remove('modal-open');
}

window.addEventListener('load', () =>{
    if(!sessionStorage.getItem('firstAccessDone')){
        openModal();
    }else{
        return true;
    }
});
