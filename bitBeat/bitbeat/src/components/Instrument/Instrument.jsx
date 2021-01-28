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
            layers : {},
            volume: -12,
            volumeNode: new Tone.Volume, 
            effects: []
        }
    }

    getLayers = () => this.state.layers

    componentDidMount(){
        this.setState({
            ...this.state,
            layers: this.props.layers,
            sound: this.makeTone(this.props.inst.tone)
        })   

        this.state.volumeNode.set({volume:this.state.volume}).toDestination()
    }

    addEffect(effect, val) {
        const newChain = [...this.state.effects]
        newChain.push(new Tone[effect](...val))

        
        this.setState({
            ...this.state, 
            effects: newChain
        }, () => { this.state.sound.chain(...this.state.effects, this.state.volumeNode)})

        

       
    }

    setVolume = (e) => {

        let newVOlume 
        
        // e.target.value <= 1? newGain = e.target.value : newGain = e.target.value * (e.target.value / 2)

        // console.log(newGain);

        this.setState({
            ...this.state,
            volume: e.target.value
        })

        this.state.volumeNode.set({volume:e.target.value})
 
    }

    go(){
        for(const layer in this.state.layers){
            if(this.state.layers[layer][this.props.step]){
                let time = Tone.now()
                this.state.sound.triggerAttackRelease([layer], '8n.', time) 
            } 
        }

        
    }

    makeTone = (tone) => {
        return new Tone.Sampler({
        urls: tone.urls,
        baseUrl: tone.baseUrl,
        onload: () => {
            console.log('LOADED');
        }}).connect(this.state.volumeNode)    
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

                    <div className="instrument__effect-rack">
                        <div className="instruments__button-wrap">  
                            <span className='instruments__effects-label'>Effects: </span>
                            <span className = 'instrument__effect-btn' onClick={() => this.addEffect('Reverb', [10])}>Reverb</span> 
                            <span className = 'instrument__effect-btn' onClick={() => this.addEffect('Distortion',[1])}>distortion</span> 
                            <span className = 'instrument__effect-btn' onClick={() => this.addEffect('FeedbackDelay', ['16n', 0.5])}>FBdelay</span>
                        </div> 
                        <div className="instrument__volume-wrap">
                            <label htmlFor="volume"> volume </label>
                            <input name = 'volume' style={{width: '400px'}} type="range" min='-55' max='20' onChange={e=>this.setVolume(e)} value={this.state.gain}/>
                        </div>
                    </div>
                </div>
        )
    }
}

// const makeTone = (tone) => {

//     return new Tone.Sampler({
//     urls: tone.urls,
//     baseUrl: tone.baseUrl,
//     onload: () => {
//         console.log('LOADED');
//     }}).toDestination() 

// }