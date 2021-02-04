import React, { Component } from 'react'
import * as Tone from 'tone'
import Row from '../Row/Row'
import './Instrument.scss'
import Pedal from '../Pedal/Pedal'
import {v4 as uuid} from 'uuid'
import remove from '../../assets/icons/x.svg'
import Collapsable from 'react-collapsible'
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
            effectsObjects: [],
            effectsChain: []
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
        // copy the array of effects objects
        const newObjectArray = [...this.state.effectsObjects]
        
        // push a new effect object in there using the effect param, which is a string
        newObjectArray.push({
            node: new Tone[effect](...val),
            type: effect,
            id: uuid()
        })

        // replace the old effectsObjects array with the clone we just manipulated
        this.setState({
            ...this.state,
            effectsObjects: newObjectArray,
            effects: newObjectArray.map(o => o.node)
        }, () => { this.state.sound.chain(...this.state.effects, this.state.volumeNode)})
    }

    updateEffect = (effectId, property, val) => {
        // copy the current effectsObjects array
        const newEffectsObjects = [...this.state.effectsObjects]

        // get the effect object whos id mathces effectId
        let effect = newEffectsObjects.find(obj => obj.id === effectId)

        // set the property specified by the property param equal to the val param
        effect.node.set({[property]: val})
        console.log('NEW NODE VAL: ', effect.node.get(property));

        // set state, replacing the old effects objects array with the one we just manipulated
        this.setState({
            ...this.state,
            effectsObjects: newEffectsObjects, 
        }, () => { this.state.sound.chain(...this.state.effects, this.state.volumeNode)})
        // we may have to call the chain method again here
    }

    setVolume = (e) => {
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

    cleanUp(){
        this.state.sound.dispose()
        if(this.state.effects) this.state.effects.forEach(e => e.dispose())
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
                    <img src={remove} className= 'instrument__remove-btn' onClick={()=>{this.cleanUp();this.props.remove(this.props.index)}} /> 
                    <h3 className="instrument__name">{this.props.inst.name}</h3>
                    <div className="instrument__volume-wrap">
                        <label htmlFor="volume"> volume </label>
                        <input orient="vertical" className='instrument__volume' name = 'volume' style={{width: '400px'}} type="range" min='-55' max='20' onChange={e=>this.setVolume(e)} value={this.state.gain}/>
                    </div>

                    <div className="instrument__wrap">
                    
                               
                    {
                        // creating a Row component for each member of the array and passing it a layer
                        this.renderRows()
                        .reverse()
                        .map(l => <Row placeBeat = {this.placeBeat} tone = {l[0]} layer = {l.filter(i => typeof i !== 'string')} />)
                    }     
                    <div className="instrument__wrap">
                        <div className="instrument__effect-rack">
                         <Collapsable trigger='Effects:' easing = 'cubic-bezier(1, 2, 0.6, 0.7)' triggerStyle={{cursor: 'pointer'}}> 
                        <div className="instruments__button-wrap">  

                            <span className = 'instrument__effect-btn' onClick={() => this.addEffect('Reverb', [10])}>reverb</span> 
                            <span className = 'instrument__effect-btn' onClick={() => this.addEffect('Distortion',[0.5])}>distortion</span> 
                            <span className = 'instrument__effect-btn' onClick={() => this.addEffect('FeedbackDelay', ['16n', 0.5])}>feedback delay</span>
                            <span className = 'instrument__effect-btn' onClick={() => this.addEffect('Vibrato', [1, 1])}>vibrato</span>
                            <span className = 'instrument__effect-btn' onClick={() => this.addEffect('JCReverb', [0.5])}>room reverb</span>
                            <span className = 'instrument__effect-btn' onClick={() => this.addEffect('EQ3', [3,3,3])}>EQ3</span>
                        </div>
                        </Collapsable>  
                        <div className="instrument__pedals">
                        {
                                this.state.effectsObjects.map(obj => {
                                    return(
                                    <Pedal change={(id,property,val)=>this.updateEffect(id,property,val)} 
                                    key={obj.id} 
                                    effect={obj}
                                />)})
                            }
                        </div>
                        </div> 
                        
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