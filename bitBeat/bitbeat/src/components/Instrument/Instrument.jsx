import React, { Component } from 'react'
import * as Tone from 'tone'
import Row from '../Row/Row'
import C1 from '../../samples/rhodes/US_Rhodes_C1.wav'
import './Instrument.scss'
import { Time } from 'tone';

/* 

analagous to the Instrument class in index.js. 

*/


export default class Instrument extends Component {
    constructor(props){
        super(props)
    
        this.state ={
            // Tone.Player will be used for drums.  
            length: this.props.length,
            layers : {}
        }
    }


    componentDidMount(){
        this.setState({
            ...this.state,
            layers: this.props.layers,
            sound: makeTone(this.props.inst.type, this.props.inst.tone)
        })

        // need to add a method that will make a player or a synth
    }

    /*
        this method is called by the Transport component via a ref. It is
        responsible for triggering the attack of the synth. It is called on
        a schedule. 
    */
    go(){
        for(const layer in this.state.layers){
            if(this.state.layers[layer][this.props.step]){
                let time = Tone.now()
                this.state.sound.triggerAttackRelease([layer], '8n.', time);
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
        newLayer[index] === 0 ? newLayer[index] = 1 : newLayer[index] = 0
        this.setState({
            layers: {
                ...this.state.layers,
                [key]: newLayer
            }
        })
    } 

    render() {
        this.renderRows()
        return (  
            <div className = 'instrument'>              
                {
                    // creating a Row component for each member of the array and passing it a layer
                    this.renderRows()
                    .reverse()
                    .map(l => <Row placeBeat = {this.placeBeat} tone = {l[0]} layer = {l.filter(i => typeof i !== 'string')} />)
                }     
            </div>
        )
    }
}

const makeTone = (type, tone) => {
    const funcs = {
        sampler: function(){
            return new Tone.Sampler({
            urls: tone.urls,
            baseUrl: tone.baseUrl,
            onload: () => {
                console.log('LOADED');
            }}).toDestination() 
        }
    }  

    if(!funcs[type]) return null
    return funcs[type]()
}