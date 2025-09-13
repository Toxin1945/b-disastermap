function startGuide(){
    const msg1 = new SpeechSynthesisUtterance("よりよい防災マップは、災害時に役立つデジタルハザードマップです。");
    const msg2 = new SpeechSynthesisUtterance("災害が起きた時に必要な情報を、いつでもどこでも見ることができます。");
    const msg3 = new SpeechSynthesisUtterance("詳しい情報はこちらをご覧ください。");
    msg1.lang = "ja-JP";
    msg2.lang = "ja-JP";
    msg3.lang = "ja-JP";
    speechSynthesis.speak(msg1);
    //speechSynthesis.speak(msg2);
    //speechSynthesis.speak(msg3);
}


function closeModal() {
    const modal = document.getElementById('modal');
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', escClose);
}

function escClose(e) {
    if (e.key === 'Escape') closeModal();
}

    window.addEventListener('load', openModal);
