import React, { Component } from 'react'
import Instrument from '../Instrument/Instrument'
import InstrumentSelect from '../InstrumentSelect/InstrumentSelect'
import makeInstrumentLayers from '../../functions/instrument' 
import * as Tone from 'tone'
import options from '../../inst-options.js'
import './Transport.scss'
import { Sampler } from 'tone'
import DrumKit from '../DrumKit/DrumKit'

/* Analogous to the Rig class in index.js. */
export const GlobalStep = React.createContext()

export default class Trans extends Component {
    constructor(props){
        super(props)
        this.state = {
            length: 16,
            bpm: 90,
            step: null,
            instruments: [],         
            instOptions: options.inst,
            kitOptions: options.kit
        }
    }


    start = (t,bpm) => {
        this.setState({
            ...t.state,
            step: -1
        })
        Tone.Transport.bpm.value = bpm
        const clear = Tone.Transport.scheduleRepeat(function(time){
            t.incrementStep()
            t.state.instruments.forEach(i => {
                i.ref.current.go()
            })
            
        }, "8n");
        this.setState({
            ...this.state,
            bpm: bpm,
            clear: clear
        })
        Tone.start()
        Tone.Transport.start()
    }

    addInstrument = (inst) => {
        const newInst = {
            ref: React.createRef(),
            layers: makeInstrumentLayers(inst.keys, this.state.length),
            tone: inst.tone,
            sounds: inst.sounds,
            type: inst.type,
            role: 'inst'
        }

        this.setState({
            ...this.state,
            instruments: [
                ...this.state.instruments,
                newInst
            ]
        })
    }

    addDrumKit(kit){
        const newKit = {
            ref: React.createRef(),
            layers: makeInstrumentLayers(kit.keys, this.state.length),
            sounds: kit.sounds,
            role: 'kit'
        }

        this.setState({
            ...this.state,
            instruments: [
                ...this.state.instruments,
                newKit
            ]
        })
    }

    incrementStep = () => {
        this.setState(
            {
                ...this.state,
                step: this.state.step === this.state.length - 1 ? 0 : this.state.step + 1
            })
    }

    changeValue = (e) => {
        
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
        console.log(this.state.bpm);
        this.stop()
        this.start(this, e.target.value)
    }

    stop = () => {
        Tone.Transport.clear(this.state.clear).stop()
    }

    render() {
        return (
            <>
                <button onClick = {() => this.start(this, this.state.bpm)}>
                START
                </button>

                <button onClick = {() => this.addInstrument()}>
                add 
                </button>
                <button onClick={this.stop}>Stop</button>
                <div className='transport'>
                    <div className="menu">
                    <InstrumentSelect 
                        instruments = { this.state.instOptions } 
                        drumKits = {this.state.kitOptions}
                        addInst = {(l)=>this.addInstrument(l)} 
                        addKit={(d)=>this.addDrumKit(d)}
                    />
                    BPM: {this.state.bpm}
                    <input type="range" name='bpm' min='60' max = '350' onChange={e=>this.changeValue(e)} value={this.state.bpm}/>
                    </div>

                    <GlobalStep.Provider value = {{step: this.state.step}}>
                        {/* the instrument panel */}
                        {this.state.instruments.map(i => {
                            if(i.role === 'inst') return <Instrument step={this.state.step} inst = {i} layers = {i.layers} ref={i.ref}></Instrument>
                            if(i.role === 'kit') return <DrumKit step={this.state.step} kit = {i.sounds} layers = {i.layers} ref={i.ref}></DrumKit>
                        })}
                    </GlobalStep.Provider>
                </div>
            </>
        )
    }
}
