import React, { Component } from 'react'
import * as Tone from 'tone'
import Row from '../Row/Row'
import './Instrument.scss'
import { Time } from 'tone';

/* 

analagous to the Instrument class in index.js. 

*/

export default class Instrument extends Component {
    constructor(props){
        super(props)


        this.state ={
            synth: new Tone.PolySynth(Tone.MonoSynth).toDestination(),
            length: 8,
            step: 0,
            layers : {    
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
    }

    /*
        this method is called by the Transport component via a ref. It is
        responsible for triggering the attack of the synth. It is called on
        a schedule. 
    */

    go(){
        console.log(this.props.step);
        for(const layer in this.state.layers){
            if(this.state.layers[layer][this.props.step]){
                let time = Tone.now()
                this.state.synth.triggerAttackRelease(layer, '8n', time);
            } 
        }

        // this.state.step === this.state.length - 1 ? this.state.step = 0 : this.state.step ++
    }

    renderRows(){
        // pushing every array in this.layers into an array 
        let layers = []
        for (const key in this.state.layers){  
            layers.push([key, ...this.state.layers[key]])
        }
        // returning the array
        return layers
    }

    placeBeat = (key, index) => {
        let newLayer = [...this.state.layers[key]]
        console.log(newLayer[index]);

        newLayer[index] === 0 ? newLayer[index] = 1 : newLayer[index] = 0
        

        this.setState({
            layers: {
                ...this.state.layers,
                [key]: newLayer
            }
        })
        
        console.log(this.state.layers);
    } 

    render() {
        this.renderRows()
        return (
            <div className = 'instrument'>              
                {
                    // creating a Row component for each member of the array and passing it a layer
                    this.renderRows().map(l => <Row placeBeat = {this.placeBeat} tone = {l[0]} layer = {l.filter(i => typeof i !== 'string')} />)
                }                   
            </div>
        )
    }
}