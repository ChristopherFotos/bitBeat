import React, { Component } from 'react'
import Instrument from '../Instrument/Instrument'
import InstrumentSelect from '../InstrumentSelect/InstrumentSelect'
import makeInstrumentLayers from '../../functions/instrument' 
import * as Tone from 'tone'
import './Transport.scss'

/* Analogous to the Rig class in index.js. */
export const GlobalStep = React.createContext()

export default class Trans extends Component {
    constructor(props){
        super(props)
        this.state = {
            length: 8,
            bpm: 120,
            step: null,
            instruments: [
                
                // these refs are passed to the instrument components in 
                // the render method. This allows us to call methods of 
                // those components. We will use this to call the instrument's 
                // go() method, which is responsible for stepping through the 
                // instrument's layer arrays. Later we can make these into objects
                // that hold the ref, as well as other info to be passed to the instrument
                // such as tone, length, etc. 
                {
                    ref: React.createRef(),
                    layers: { 
                        'C3': [0,0,0,0,0,0,0,0],
                        'D3': [0,0,0,0,0,0,0,0],
                        'E3': [0,0,0,0,0,0,0,0],
                        'F3': [0,0,0,0,0,0,0,0],
                        'G3': [0,0,0,0,0,0,0,0],
                        'A3': [0,0,0,0,0,0,0,0],
                        'B3': [0,0,0,0,0,0,0,0],
                        'C4': [0,0,0,0,0,0,0,0],
                        'D4': [0,0,0,0,0,0,0,0],
                        'E4': [0,0,0,0,0,0,0,0],
                        'F4': [0,0,0,0,0,0,0,0],
                        'G4': [0,0,0,0,0,0,0,0],
                    }
                }   
            ]
        }
    }

    // The start() method starts a repeating schedule in the Transport. the scheduled callback
    // loops through the state.instruments array and calls each ref's go() method, which is 
    // what ultimately triggers the synth to make a sound. This method then starts the Tone 
    // and the transport. it takes an argument t which should be 'this'.

    start = (t) => {
        this.setState({
            ...this.state,
            step: -1
        })
        const now = Tone.now()
        Tone.Transport.bpm.value = t.state.bpm
        Tone.Transport.scheduleRepeat(function(time){
            t.incrementStep()
            t.state.instruments.forEach(i => {
                i.ref.current.go()
            })
            
        }, "4n", now);
        
        Tone.start()
        Tone.Transport.start()
    }

    /* this method will take an object containing all info 
    about the instrument to be added. it will put that info
    in an object along with a ref, and then put that object 
    in this.instruments. When this. when instruments is mapped over,
    the object will be passed to each instrument component, and then
    the instrument component will use those props to  construct its
    layers object. or perhaps a layers object can be made in this 
    function and passed as props...*/

    addInstrument = (keys) => {
        const newInst = {
            ref: React.createRef(),
            layers: makeInstrumentLayers(keys, this.state.length)
        }

        this.setState({
            ...this.state,
            instruments: [
                ...this.state.instruments,
                newInst
            ]
        })
    }

    incrementStep = () => {
        this.setState(
            {
                ...this.state,

                step: this.state.step === this.state.length - 1 ? 0 : this.state.step + 1
            }
        )
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

                <button onClick = {() => this.addInstrument()}>
                add 
                </button>
                <div className='transport'>
                    <GlobalStep.Provider value = {{step: this.state.step}}>
                        {this.state.instruments.map(i => <Instrument step={this.state.step} layers = {i.layers} ref={i.ref}></Instrument>)}
                    </GlobalStep.Provider>
                    <InstrumentSelect addInst = {(l)=>this.addInstrument(l)}/>
                </div>
            </>
        )
    }
}
