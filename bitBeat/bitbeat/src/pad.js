import { Tone } from "tone/build/esm/core/Tone";

const inst = {
    sounds: {
        kick: Tone.Player('localhost300/kick'),
        snare: Tone.Player('localhost300/kick'),
        hihat: Tone.Player('localhost300/kick'),
        crash: Tone.Player('localhost300/kick')
    },

    layers: {
        kick: [0,0,0,0,0,0,0,0],
        snare: [0,0,0,0,0,0,0,0],
        hihat: [0,0,0,0,0,0,0,0],
        crash: [0,0,0,0,0,0,0,0]
    }
}