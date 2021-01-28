import './InstrumentPanel.scss'
import React, { Component } from 'react'
import DrumKit from '../DrumKit/DrumKit'
import Instrument from '../Instrument/Instrument'

export default class InstrumentPanel extends Component {
    render() {
        return (
            <div className = 'instrument-panel'>
                {this.props.instruments.map((i, j) => {
                    if(i.role === 'inst') return (
                        <Instrument 
                        step={this.props.step} 
                        inst = {i} 
                        length ={this.props.length}  
                        index = {j} 
                        layers = {i.layers} 
                        ref={i.ref} 
                        remove={this.props.removeInstrument} />
                    )
                    if(i.role === 'kit') return (
                        <DrumKit 
                        step={this.props.step} 
                        kit = {i.sounds} 
                        length = {this.props.length} 
                        index = {j} 
                        layers = {i.layers} 
                        ref={i.ref} 
                        remove={this.props.removeInstrument} />
                    )
                })}
            </div>
        )
    }
}
