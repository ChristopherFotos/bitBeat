import React, { Component } from 'react'
import Row from '../../components/Row/Row'
import remove from '../../assets/icons/x.svg'
import './DrumKit.scss'
import * as Tone from 'tone'

export default class DrumKit extends Component {
    constructor(props){
        super(props)
        this.state = {
            sounds:{},
            layers: []
        }
    }

    changeLength(l){
        const prevLength = this.state.length

        this.setState({
                ...this.state,
                length: l
            })
        
        let newLayers = {}
        
        for(const key in this.state.layers){
            newLayers[key] = this.state.layers[key]

            for(let i = 0; i < l - prevLength; i++){
                newLayers[key].push(0)
            }
        }    
    
        this.setState({
            ...this.state,
            layers: newLayers
        })
    }

    componentDidMount(){
        this.setState({
            ...this.state,
            layers: this.props.layers,
            sounds: this.props.kit
        })
    }

    go(){
        for(const layer in this.state.layers){
            if(this.state.layers[layer][this.props.step]){
                const time = Tone.now()
                console.log(this.state.sounds[layer]);
                this.state.sounds[layer].start(time)
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
        this.renderRows()
        return (  
            <>
            
            <div className = 'instrument'>   
            <img src={remove} className = 'instrument__remove-btn' onClick={()=>this.props.remove(this.props.index)} />           
                {
                    // creating a Row component for each member of the array and passing it a layer
                    this.renderRows()
                    .reverse()
                    .map(l => <Row placeBeat = {this.placeBeat} tone = {l[0]} layer = {l.filter(i => typeof i !== 'string')} />)
                }     
            </div>
            </>
        )
    }
}
