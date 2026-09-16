let play = document.querySelector("#play");
let playing = document.querySelector("#playing");
let playTone = document.querySelector("#playTone");
let playSequence = document.querySelector("#playSequence");
let playPart = document.querySelector("#playPart");
let playDrums = document.querySelector("#playDrums");

function removeButtons() {
    play.style = "display: none";
    playSequence.style = "display: none";
    playTone.style = "display: none";
    playPart.style = "display: none";
    playTone.style = "display: none";
    playDrums.style = "display: none";
    playing.style = " ";
};

//Converts a astring to an array of notes or null.
// Dots in the string become nulls in the array and are silent.
function mkSequence(pattern) {
    return pattern.split("").map(value => {
        if (value == ".") {
            return null;
        } else {
            return value;
        }
    });
}

let drumPattern = {
        kick: "x..xx..",
        snare: "x...x...",
        hiHat: "xxxxxxxx"
    };

let reverb = new Tone.Reverb({
    decay: 1,
    wet: 0.3
}).toDestination();

play.addEventListener("click", () => {
    //Hide this button
    removeButtons();

    let audioCtx = new AudioContext();

    let oscNode = audioCtx.createOscillator();
    oscNode.frequency.value = 440;

    let gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.5;

    oscNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscNode.start(audioCtx.currentTime);
    oscNode.stop(audioCtx.currentTime + 2);
});


playTone.addEventListener("click", () => {
    removeButtons();

    // Tone.start();
    // let  = new Tone.Synth({
    //     oscillator: {type: "sine"},
    //     envelope: {attack: 0.1, decay: 0.3, sustain: 0.8, release: 0.1}, 
    //     volume: -6
    // }).toDestination();
    Tone.start();
    
    let synth = new Tone.PolySynth(
        Tone.Synth,
        {
            oscillator: {type: "triangle"},
            volume: -9
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
    }, "8n").start("0:0:0").stop("4:0:0");


    Tone.Transport.start();

    // synth.triggerAttackRelease(["A3", "C#4", "E4"], 0.9, 0); 
    // synth.triggerAttackRelease(["B3", "D4", "F#4"], 0.9, 1); 
    // synth.triggerAttackRelease(["C#4", "E4", "G#4"], 0.9, 2); 
    // synth.triggerAttackRelease(["D4", "F#4", "A4"], 0.9, 3); 
    // synth.triggerAttackRelease(["E4", "G#4", "B4"], 0.9, 4); 
    // synth.triggerAttackRelease(["F#4", "A4", "C#5"], 0.9, 5); 
    // synth.triggerAttackRelease(["G#4", "B4", "D5"], 0.9, 6); 
    // synth.triggerAttackRelease(["E4", "A4", "C#5"], 1.9, 7); 
});

playSequence.addEventListener("click", () => {
    removeButtons();

    Tone.start();

    let synth = new Tone.Synth().toDestination();

    new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, "16n", time);
    },  ["C4", null, "B3", "C4", "G3", "A3", null, "B3"], "8n").start("0:0:0").stop("4:0:0");

    Tone.Transport.start();
});

playPart.addEventListener("click", () =>{
    removeButtons();

    let synth = new Tone.PolySynth(Tone.Synth).toDestination();

    new Tone.Part((time, note) => {
        synth.triggerAttackRelease(note, "8n", time);
    }, [
        ["0:0:0", ["C3", "E4"]],
        ["0:0:3", "D4"], 
        ["0:1:0", "C4"], 
        ["0:1:2", "D4"], 
        ["0:2:0", ["E3", "E4"]], 
        ["0:2:2", "E4"], 
        ["0:3:0", "E4"], 
        ["1:0:0", ["G3", "D4"]], 
        ["1:0:2", "D4"], 
        ["1:1:0", "D4"], 
        ["1:2:0", ["E3", "E4"]], 
        ["1:2:2", "G4"], 
        ["1:3:0", "G4"],
        ["2:0:0", ["C3", "E4"]],
        ["2:0:3", "D4"], 
        ["2:1:0", "C4"], 
        ["2:1:2", "D4"], 
        ["2:2:0", ["E3", "E4"]], 
        ["2:2:2", "E4"], 
        ["2:3:0", "E4"]
    ]).start("0:0:0");

    Tone.Transport.start();
});

playDrums.addEventListener("click", () => {
    removeButtons();

    let hiHatFilter = new Tone.Filter(15000, 'bandpass').connect(reverb);

    let hiHat = new Tone.NoiseSynth({
        envelope: {
            attack: 0.001, decay: 0.1, sustain: 0, release: 0
        },
        volume: -6
    }).connect(hiHatFilter)

     new Tone.Sequence(time => { 
        hiHat.triggerAttackRelease("16n", time); 
    }, mkSequence(drumPattern.hiHat), "8n").start("0:0:0").stop("4:0:0");

    class Snare {
        constructor() {
            this.noiseFilter = new Tone.Filter(5000, "bandpass").connect(reverb);
            this.noiseSynth = new Tone.NoiseSynth({ 
                envelope: { 
                    attack: 0.001, decay: 0.1, sustain: 0, release: 0 
                }, 
                volume: -12 
            }).connect(this.noiseFilter); 

            this.synth = new Tone.Synth({
                envelope: {
                    attack: 0.0001, decay: 0.1, sustain: 0, release: 0
                },
                oscillator: {type:"sine"},
                volume: -12
            }).connect(reverb);
        }

        triggerAttackRelease(duration, when) {
            this.noiseSynth.triggerAttackRelease(duration, when);
            this.synth.triggerAttackRelease("G3", duration, when);
        }
    }

    let snare = new Snare();

    new Tone.Sequence(time => { 
        snare.triggerAttackRelease("16n", time); 
    }, mkSequence(drumPattern.snare), "8n").start("0:0:0").stop("4:0:0");


    let kick = new Tone.MembraneSynth({
        pitchDecay: 0.02,
        octaves: 6,
        volume: -9
    }).connect(reverb);

    new Tone.Sequence(time => { 
        kick.triggerAttackRelease(50, "16n", time); 
    }, mkSequence(drumPattern.kick), "8n").start("0:0:0").stop("4:0:0");

    // Samples from freesound.org: 
  // https://freesound.org/people/MTG/sounds/357432/ 
  // https://freesound.org/people/MTG/sounds/357336/ 
  // https://freesound.org/people/MTG/sounds/357546/ 
  const sampler = new Tone.Sampler({ 
    urls: { 
      "C5": "trumpet-c5.mp3", 
      "D5": "trumpet-d5.mp3", 
      "F5": "trumpet-f5.mp3" 
    }, 
    baseUrl: "https://skilldrick-jscc.s3.us-west-2.amazonaws.com/", 
    attack: 0, 
    release: 1, 
    volume: -16, 
    onload: () => { 
      sampler.triggerAttackRelease(["C5", "G5", "E5"], "1n", 0); 
    }
  }).toDestination(); 

    Tone.Transport.start();
});
