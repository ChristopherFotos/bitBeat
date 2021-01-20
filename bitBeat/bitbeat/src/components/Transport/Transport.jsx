import React, { Component } from 'react'
import Instrument from '../Instrument/Instrument'
import * as Tone from 'tone'
import './Transport.scss'

/* Analogous to the Rig class in index.js. */

export default class Trans extends Component {
    constructor(props){
        super(props)
        this.bpm   = 120
        this.state = {
            instruments: [

                // these refs are passed to the instrument components in 
                // the render method. This allows us to call methods of 
                // those components. We will use this to call the instrument's 
                // go() method, which is responsible for stepping through the 
                // instrument's layer arrays. Later we can make these into objects
                // that hold the ref, as well as other info to be passed to the instrument
                // such as tone, length, etc. 

                React.createRef(),
            ]
        }

    }

    // The start() method starts a repeating schedule in the Transport. the scheduled callback
    // loops through the state.instruments array and calls each ref's go() method, which is 
    // what ultimately triggers the synth to make a sound. This method then starts the Tone 
    // and the transport. it takes an argument t which should be 'this'.

    start = (t) => {
        const now = Tone.now()
        Tone.Transport.bpm.value = t.bpm
        Tone.Transport.scheduleRepeat(function(time){
            t.state.instruments.forEach(i => {
                i.current.go()
            })
        }, "4n", now);
        
        Tone.start()
        Tone.Transport.start()
    }


    // maybe there should be a single 'step' variable here in the transport which is passed down 
    // to the instruments. it only creates room for problems when we have them each managing their
    // own step, and a transport is supposed to do that job anyway. look up the useRef hook

    render() {
        return (
            <>
                <button onClick = {() => this.start(this)}>
                START
                </button>
                <div className='transport'>

                    {this.state.instruments.map(i => <Instrument ref={i}></Instrument>)}
                </div>
            </>
        )
    }
}
