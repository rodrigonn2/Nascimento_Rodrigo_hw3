let theHeading = document.querySelector("#headLine h1"),
    sboard = document.querySelector(".sound-board"),
    music_instr = document.querySelectorAll(".pick-your-instrument img"),
    music_board = document.querySelectorAll('.sound-board-live'),
    instrument_dragged;

let audioElements = []; 

function resetboard() {
    music_board.forEach(zone => {
        if (zone.children.length > 0) {
            document.querySelector('.instruments').appendChild(zone.firstChild);
            console.log('resetting the sound board');
        }
    });
}

function handleStartDrag() {
    console.log('started dragging one instrument', this);
    instrument_dragged = this;
}

function handleDragOver(e) {
    e.preventDefault();
    console.log('dragged over me');
}

function handleDrop(e) {
    e.preventDefault();
    console.log('dropped on me');

    if (instrument_dragged.classList.contains('dropped')) {
        console.log('The instrument is already on');
        return;
    }

    if (this.children.length === 0) {
        this.appendChild(instrument_dragged);
        console.log('it was dragged');

        let audioSrc = instrument_dragged.dataset.audio;
        let audioPath = `audio/${audioSrc}`;

        let audio = new Audio(audioPath);
        audio.loop = true;
        audio.play();

        audioElements.push(audio); // Adiciona o elemento de áudio ao array

        this.classList.add('occupied');

        instrument_dragged.classList.add('dropped');
        instrument_dragged.removeEventListener('dragstart', handleStartDrag);

        volSlider.addEventListener('input', function () {
            let volume = volSlider.value / 100;
            audio.volume = volume;
        });
    } else {
        console.log('dont drag over me');
    }

    if (this.children.length === 1) {
        // Adiciona a peça à drop zone
        console.log('you can drag this');
    }
}

music_instr.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

music_board.forEach(zone => zone.addEventListener("dragover", handleDragOver));

music_board.forEach(zone => zone.addEventListener("drop", handleDrop));

// Adicionar a seleção dos botões de play e pause e do elemento de áudio
const playButton = document.querySelector('#playButton');
const pauseButton = document.querySelector('#pauseButton');
const volSlider = document.querySelector('#volumeControl');


resetButton.addEventListener('click', function() {
    location.reload(); 
});

function playAudio() {
    audioElements.forEach(audio => audio.play());
}

function pauseAudio() {
    audioElements.forEach(audio => audio.pause());
}

function setVolume() {
    let volume = this.value / 100;
    audioElements.forEach(audio => audio.volume = volume);
}

playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
volSlider.addEventListener('input', setVolume);







