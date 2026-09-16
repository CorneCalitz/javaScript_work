// Module used to create the sounds that are played during the pong game

export function greenPaddleHit() {
    Tone.start();
    let synth = new Tone.Synth({
        oscillator: {type: "square"},
        envelope: {attack: 0.1, decay: 0.3, sustain: 0, release: 0.1}, 
        volume: -20
        }).toDestination();
    synth.triggerAttackRelease("C3","16n"); 
}

export function redPaddleHit() {
    Tone.start();
    let synth = new Tone.Synth({
        oscillator: {type: "square"},
        envelope: {attack: 0.1, decay: 0.3, sustain: 0, release: 0.1}, 
        volume: -20
        }).toDestination();
    synth.triggerAttackRelease("D3", "16n"); 
}

export function gameTune(stopTune) {
    Tone.start();
    
    let synth = new Tone.PolySynth(
        Tone.Synth,
        {
            oscillator: {type: "triangle"},
            volume: -15
        }
    ).toDestination(); 

    let notes = ["C4", "D4", "E4", "G4", "A4", "C5"]; 

    new Tone.Loop(time => {
        for (let i = 0; i < 3; i++) {
            if (Math.random() < 0.5) {
                let note = notes[Math.floor(Math.random() * notes.length)];
                synth.triggerAttackRelease(note, "32n", time);
            }
        }
    }, "8n").start("0:0:0");

    if (stopTune == true) {
        Tone.Transport.stop();
    } else {
        Tone.Transport.start();    
    }
    

}

function playerWinTune() {

}

function playerLoseTune() {

}
