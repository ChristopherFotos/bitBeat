import React, { Component } from 'react'
import Instrument from '../Instrument/Instrument'
import InstrumentSelect from '../InstrumentSelect/InstrumentSelect'
import makeInstrumentLayers from '../../functions/instrument' 
import * as Tone from 'tone'
import options from '../../inst-options.js'
import './Transport.scss'
import { Sampler } from 'tone'

/* Analogous to the Rig class in index.js. */
export const GlobalStep = React.createContext()

export default class Trans extends Component {
    constructor(props){
        super(props)
        this.state = {
            length: 16,
            bpm: 90,
            step: null,
            instruments: [       
                // an array of instrument objects to be passed to instrument components.
            ],
            instOptions: options
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
        Tone.Transport.bpm.value = t.state.bpm
        Tone.Transport.scheduleRepeat(function(time){
            t.incrementStep()
            t.state.instruments.forEach(i => {
                i.ref.current.go()
            })
            
        }, "8n");
        
        Tone.start()
        Tone.Transport.start()
    }

    // this mehtod is called in the instrumentItem component's makeInst method
    // as 'makeIsnt.' it takes an object containing the type of instrument 
    // (sampler, player or synth), and its tone. Tone is an object containing 
    // the urls and base url for the instrument samples. 
    addInstrument = (inst) => {
        const newInst = {
            ref: React.createRef(),
            layers: makeInstrumentLayers(inst.keys, this.state.length),
            tone: inst.tone,
            type: inst.type
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
                    <InstrumentSelect instruments = { this.state.instOptions } addInst = {(l)=>this.addInstrument(l)}/>
                    <GlobalStep.Provider value = {{step: this.state.step}}>
                        {this.state.instruments.map(i => <Instrument step={this.state.step} inst = {i} layers = {i.layers} ref={i.ref}></Instrument>)}
                    </GlobalStep.Provider>
                </div>
            </>
        )
    }
}
