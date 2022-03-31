var reconhecimento_fala = window.webkitSpeechRecognition;
var reconhecimento = new reconhecimento_fala();
var text = document.getElementById("textbox");

function iniciar() {
    text.innerHTML = "";
    reconhecimento.start();
}

reconhecimento.onresult = function (event) {
    console.log(event);
    var conteudo = event.results[0][0].transcript;
    text.innerHTML = conteudo;
    console.log(conteudo);
    
    if (conteudo=="OK." || conteudo=="ok." || conteudo=="ok" || conteudo=="Ok" || conteudo=="OK") {
         console.log("Tirando Selfie");
         speak();
    }
}

function speak(dado) {
    var fala = window.speechSynthesis;
    var texto = "Tirando sua selfie em 5 segundos";
    var fala_dado = new SpeechSynthesisUtterance(texto);
    fala.speak(fala_dado);
    Webcam.set({
        width: 360,
        height: 250,
        image_format: "jpeg",
        jpeg_quality: 90
    });
    var camera = document.getElementById("camera");
    Webcam.attach('#camera');
    setTimeout(function() {
        tirar_selfie();
        salvar();
    }, 5000 );
}

function tirar_selfie() {
    Webcam.snap(function(dado){
        document.getElementById("resultado").innerHTML = '<img id="selfie" src="'+dado+'"/>';
    });
}

function salvar() {
    var link = document.getElementById("link");
    var imagem = document.getElementById("selfie").src;
    link.href = imagem;
    link.click();
}