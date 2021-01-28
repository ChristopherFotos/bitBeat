import React, { Component } from 'react'
import * as Tone from 'tone'
import Row from '../Row/Row'
import './Instrument.scss'
import remove from '../../assets/icons/x.svg'
import makeInstrumentLayers from '../../functions/instrument'
import { Time } from 'tone';

export default class Instrument extends Component {
    constructor(props){
        super(props) 
        this.state ={
            length: this.props.length,
            layers : {}
        }
    }

    getLayers = () => this.state.layers


    componentDidMount(){
        this.setState({
            ...this.state,
            layers: this.props.layers,
            sound: makeTone(this.props.inst.type, this.props.inst.tone)
        })
    }

    go(){
        for(const layer in this.state.layers){
            if(this.state.layers[layer][this.props.step]){
                let time = Tone.now()
                this.state.sound.triggerAttackRelease([layer], '8n.', time) 
            } 
        }
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
        return (  
                <div className = 'instrument'>
                    <img src={remove} className= 'instrument__remove-btn' onClick={()=>this.props.remove(this.props.index)} />             
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
        },
    }  

    if(!funcs[type]) return null
    return funcs[type]()
}