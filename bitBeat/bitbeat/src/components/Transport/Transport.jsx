import React, { Component } from 'react'
import Instrument from '../Instrument/Instrument'
import InstrumentSelect from '../InstrumentSelect/InstrumentSelect'
import makeInstrumentLayers from '../../functions/instrument' 
import play from '../../assets/icons/play-btn.svg'
import pause from '../../assets/icons/pause-btn.svg'
import * as Tone from 'tone'
import options from '../../inst-options.js'
import InstrumentPanel from '../InstrumentPanel/InstrumentPanel'
import './Transport.scss'
import { Sampler } from 'tone'
import {v4 as uuid} from 'uuid'
import DrumKit from '../DrumKit/DrumKit'



/* Analogous to the Rig class in index.js. */
export const GlobalStep = React.createContext()

export default class Trans extends Component {
    constructor(props){
        super(props)
        this.state = {
            ready: false,
            playing: false,
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
            playing: true,
            bpm: bpm,
            clear: clear
        })
        Tone.start()
        Tone.Transport.start()
    }

    stop = () => {
        Tone.Transport.clear(this.state.clear).stop()
        this.setState({
            ...this.state,
            playing: false
        })
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

    render() {
        if(this.state.ready){
            return (
            <div className = 'setup'>
                <button className = 'setup__play-button' onClick = {() => {
                    if(!this.state.playing) this.start(this, this.state.bpm)
                    if(this.state.playing) this.stop()
                }}>
                <img src={this.state.playing ? pause : play} alt="" className="setup__play-icon"/>
                
                </button>
                
                

                <div className='transport'>
                    <div className="menu">
                    <InstrumentSelect 
                        instruments = { this.state.instOptions } 
                        drumKits = {this.state.kitOptions}
                        addInst = {(l)=>this.addInstrument(l)} 
                        addKit={(d)=>this.addDrumKit(d)}
                    />

                    </div>

                    <GlobalStep.Provider value = {{step: this.state.step}}>
                    <div className="instruments">
                        {this.state.instruments.length < 1 && <h1 className='instruments__heading'>Add an instrument to get started</h1>}
                        {[...this.state.instruments].map((i, j) => {
                            if(i.role === 'inst') return <Instrument key={i.id} step={this.state.step} inst = {i} length ={this.state.length}  index = {j} layers = {i.layers} ref={i.ref} remove={this.removeInstrument}></Instrument>
                            if(i.role === 'kit' ) return <DrumKit key={i.id} step={this.state.step} kit = {i.sounds} length ={this.state.length} index = {j} layers = {i.layers} ref={i.ref} remove={this.removeInstrument}></DrumKit>
                        })}
                    </div>
                    </GlobalStep.Provider>
                </div>
                BPM: {this.state.bpm}
                <input  
                    className = 'transport__range'
                    type="range" 
                    name='bpm' min='60' 
                    max = '350'     
                    onChange={e=>this.changeValue(e)} 
                    value={this.state.bpm}/>    
            </div>
        )} else return (
            <select onChange = {(e) => this.setLength(e)} name="length" id="cars">
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
            </select>
        )
    }
}
