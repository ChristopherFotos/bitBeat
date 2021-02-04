import React, { Component } from 'react'
import Instrument from '../Instrument/Instrument'
import InstrumentSelect from '../InstrumentSelect/InstrumentSelect'
import makeInstrumentLayers from '../../functions/instrument' 
import play from '../../assets/icons/play-btn.svg'
import down from '../../assets/icons/down-arrow-light.svg'
import up from '../../assets/icons/up-arrow-light.svg'
import pause from '../../assets/icons/pause-btn.svg'
import * as Tone from 'tone'
import logo from '../../assets/logo-bold.png'
import Collapsible from 'react-collapsible'
import options from '../../inst-options.js'
import Draggable from 'react-draggable';
import InstrumentPanel from '../InstrumentPanel/InstrumentPanel'
import './Transport.scss'
import save from '../../assets/icons/floppy-disk.svg'
import { Sampler } from 'tone'
import firebase from '../../firebase'
import {v4 as uuid} from 'uuid'
import DrumKit from '../DrumKit/DrumKit'
import { writable } from 'tone/build/esm/core/util/Interface'
const db = firebase.firestore()

// Tone.setContext(new Tone.Context({ latencyHint : "playback" }))

/* Analogous to the Rig class in index.js. */
export const GlobalStep = React.createContext()

export default class Trans extends Component {
    constructor(props){
        super(props)
        this.state = {
            ready: false,
            lengthMenuExpand: false,
            playing: false,
            length: 16,
            bpm: 90,
            step: -1,
            instruments: [],         
            instOptions: options.inst,
            kitOptions: options.kit,
            
        }
    }

    start = (t,bpm) => {
        Tone.Transport.bpm.value = bpm
        Tone.Transport.swing = 1
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
            name: inst.tone.name,
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

    setLength = n => {

        console.log('running length');
        this.setState({
            ...this.state,
            length: n
        })
    }

    setExpanded(){
        this.setState({
            ...this.state,
            lengthMenuExpanded: !this.state.lengthMenuExpand
        })
    }

    setReady(){
        this.setState({
            ...this.state,
            ready: true
        })
    }

    saveBeat = () => {
        
        const instruments = this.state.instruments
            .map(i => {
                return ({
                layers: i.ref.current.getLayers(),
                tone: i.tone,
                role: i.role,
                sounds: i.sounds || 0,
                type: i.type,
            }
          )
        })

        console.log(instruments);
        
        db.collection('beats').doc('LASTBEAT').set({           
            bpm: this.state.bpm,
            length: this.state.length,
            instruments: instruments
        })
        .then(()=>console.log('doc written ok'))
    }

    getBeats = (t) => {
        let beats = [];


        db.collection("beats")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let beat = doc.data()
                
                if(beat.instruments){
                    beat.instruments.forEach(i => {
                        i.ref = React.createRef()
                        i.id = uuid()
                    })
                    beats.push(beat)
                }
            });

            console.log(t);
            t.setState({
                ...t.state,
                bpm: beats[1].bpm,
                length: beats[1].length,
                instruments: beats[1].instruments,
            })
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        
    }

    render() {
        if(this.state.ready){
            return (
                // left panel
                <div className="container">
                
                
                        <InstrumentSelect 
                            instruments = { this.state.instOptions } 
                            drumKits = {this.state.kitOptions}
                            addInst = {(l)=>this.addInstrument(l)} 
                            addKit={(d)=>this.addDrumKit(d)}
                        />

                   

                {/* Main panel */}
                <div className='main'>
                <img src={logo} className='logo' alt=""/>
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

                        <div className="controls__wrap">
                        <button className = 'setup__play-button' onClick = {() => {
                        if(!this.state.playing) this.start(this, this.state.bpm)
                        if(this.state.playing) this.stop()
                        }} >
                        <img src={this.state.playing ? pause : play} alt="" className="setup__play-icon"/>
                        </button>
                        <div className="controls__bpm-wrap">
                            BPM: {this.state.bpm}
                            <input  
                                className = 'transport__bpm'
                                type="range" 
                                name='bpm' min='60' 
                                max = '250'     
                                onChange={e=>this.changeValue(e)} 
                                value={this.state.bpm}
                            /> 
                        </div> 
                        </div>

                </div>

                

        )} else return (
            <div className="main">
                <img src={logo} className='logo' alt=""/>
                <div className="length-select">
                Select a length to start a beat
                <Collapsible 
                    className = 'length-select__list' 
                    trigger={
                        <div className='length-select__btn-wrap'>
                        <div className='length-select__btn' onClick={() => this.setExpanded()}>
                            Select a length
                            <img className='length-select__arrow' src={this.state.lengthMenuExpand ? up : down} alt=""/>
                        </div>
                        <span className='length-select__current'> {this.state.length} beats</span>
                        </div>
                    } 
                    easing='ease-in-out'
                >
                    
                    <div onClick={()=>this.setLength(4)} className='length-select__option'  value="4">4 beats</div>
                    <div onClick={()=>this.setLength(8)} className='length-select__option'  value="8">8 beats</div>
                    <div onClick={()=>this.setLength(16)} className='length-select__option' value="16">16 beats</div>
                    <div onClick={()=>this.setLength(32)} className='length-select__option' value="32">32 beats</div>
                </Collapsible>
                <button className='length-select__start' onClick={()=>this.setReady()}>+ start new beat</button>
                </div>
                
            </div>
        )
    }
}




// db.collection("times").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`);
// });
// });