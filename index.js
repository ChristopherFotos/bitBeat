import * as Tone from 'tone'
import { Time } from 'tone';

/* The rig class holds an array of instruments. The play method loops 
through that array and calls the go() method on each instrument*/

class Rig {
    constructor(instruments){
        this.instruments = instruments
    }

    play(){
        console.log(this)
        this.instruments.forEach(i => {
            i.go()
        })
    }
}

/* 
The instrument class contains an object called layers where each key corresponds to
a different note or sound. Each key holds an 8-item array of 1's and zeros. The 
step property is an integer. The go function loops through the layers object and
for each key, it checks if the item at index [this.step] is a one or a zero. If its
a 1, it plays a note, if not, it doesn't. 
*/

class Instrument {
    constructor(){
        this.synth = new Tone.PolySynth(Tone.MonoSynth)
        this.sendSynthToDest()
        this.length = 8
        this.step = 0
        // this object can be stored in the DB, along with some info about the instrument. 
        // if this class is modified to take this object in its constructor, then we can pull
        // it from the DB f
        this.layers = {    
            'C3': [1,0,0,0,0,0,0,0],
            'D3': [0,1,0,0,0,0,0,0],
            'E3': [1,0,1,0,0,0,0,0],
            'F3': [0,1,0,1,0,0,0,0],
            'G3': [1,0,1,0,1,0,0,0],
            'A3': [0,1,0,1,0,1,0,0],
            'B3': [0,0,1,0,1,0,1,0],
            'C4': [0,0,0,1,0,1,0,1],
            'D4': [0,0,0,0,0,0,1,0],
            'E4': [0,0,0,0,0,1,0,1],
            'F4': [0,0,0,0,0,0,1,0],
            'G4': [0,0,0,0,0,0,1,1],
        }
    }

    sendSynthToDest(){
        this.synth.toDestination()
    }

    go(){
        console.log(this)
        for(const layer in this.layers){
            if(this.layers[layer][this.step]){
                let time = Tone.now()
                this.synth.triggerAttackRelease(layer, '8n.', time);
            } 
        }

        this.step === this.length - 1 ? this.step = 0 : this.step++
    }
}

const inst  = new Instrument()
const inst1 = new Instrument()
const inst2 = new Instrument()

const rig = new Rig([inst])

// Starts the rig on keypress. maybe this logic should be 
// inside the Rig class.

document.addEventListener('keypress', ()=>{
    console.log('fdsga')
    Tone.Transport.bpm.value = 90
    Tone.Transport.scheduleRepeat(function(time){
        rig.play()
    }, "4n", 0);
    
    Tone.start()
    Tone.Transport.start()
})
 