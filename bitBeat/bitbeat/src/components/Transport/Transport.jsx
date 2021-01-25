import React, { Component } from 'react'
import Instrument from '../Instrument/Instrument'
import InstrumentSelect from '../InstrumentSelect/InstrumentSelect'
import makeInstrumentLayers from '../../functions/instrument' 
import * as Tone from 'tone'
import options from '../../inst-options.js'
import InstrumentPanel from '../InstrumentPanel/InstrumentPanel'
import './Transport.scss'
import { Sampler } from 'tone'
import {v4 as uuid} from 'uuid'
import DrumKit from '../DrumKit/DrumKit'

const instKeys = [uuid(), uuid(), uuid(), uuid(), uuid(), uuid(), uuid(), uuid(), uuid(), uuid(),]

/* Analogous to the Rig class in index.js. */
export const GlobalStep = React.createContext()

export default class Trans extends Component {
    constructor(props){
        super(props)
        this.state = {
            ready: false,
            length: null,
            bpm: 90,
            step: -1,
            instruments: [],         
            instOptions: options.inst,
            kitOptions: options.kit
        }
    }

    start = (t,bpm) => {
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
            role: 'inst',
            id: uuid(),
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
            role: 'kit',
            id: uuid()
        }

        this.setState({
            ...this.state,
            instruments: [
                ...this.state.instruments,
                newKit
            ]
        })
    }

    removeInstrument = (i) => {
        console.log('i: ', i);
        const newInstArray = [...this.state.instruments]
        console.log('new inst arry ', [...newInstArray]);

        newInstArray.splice(i,1)

        console.log('new inst arry after splice: ', [...newInstArray]);
        this.setState({
            ...this.state,
            instruments: this.state.instruments.filter((inst,j)=>j !== i)
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

        if(e.target.name === 'bpm'){
            this.stop()
            this.start(this, e.target.value)
        }
    }

    setLength = e => {
        this.setState({
            ...this.state,
            ready: true,
            length: e.target.value
        })
    }

    stop = () => {
        Tone.Transport.clear(this.state.clear).stop()
    }

    render() {
        if(this.state.ready){
            console.log('inst in render ', [...this.state.instruments]);
            return (
            <div className = 'setup'>
                <button className = 'setup__button' onClick = {() => this.start(this, this.state.bpm)}>
                START
                </button>
                <button className = 'setup__button'  onClick={this.stop}>Stop</button>

                <div className='transport'>
                    <div className="menu">
                    <InstrumentSelect 
                        instruments = { this.state.instOptions } 
                        drumKits = {this.state.kitOptions}
                        addInst = {(l)=>this.addInstrument(l)} 
                        addKit={(d)=>this.addDrumKit(d)}
                    />
                    BPM: {this.state.bpm}
                    <input 
                        className = 'transport__range'
                        type="range" 
                        name='bpm' min='60' 
                        max = '350'     
                        onChange={e=>this.changeValue(e)} 
                        value={this.state.bpm}/>
                    </div>

                    <GlobalStep.Provider value = {{step: this.state.step}}>
                        {/* the instrument panel */}
                        {/* <InstrumentPanel 
                            instruments = {this.state.instruments}
                            step = {this.state.step}
                            length = {this.state.length}
                            removeInstrument = {this.removeInstrument}
                        /> */}
                        
                        {[...this.state.instruments].map((i, j) => {
                            {console.log('inst in render DEEP ', [...this.state.instruments])}
                            if(i.role === 'inst') return <Instrument key={i.id} step={this.state.step} inst = {i} length ={this.state.length}  index = {j} layers = {i.layers} ref={i.ref} remove={this.removeInstrument}></Instrument>
                            if(i.role === 'kit' ) return <DrumKit key={i.id} step={this.state.step} kit = {i.sounds} length ={this.state.length} index = {j} layers = {i.layers} ref={i.ref} remove={this.removeInstrument}></DrumKit>
                        })}
                    </GlobalStep.Provider>
                </div>
            </div>
        )} else return (
            <select onChange = {(e) => this.setLength(e)} name="scale" id="cars">
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
            </select>
        )
    }
}
