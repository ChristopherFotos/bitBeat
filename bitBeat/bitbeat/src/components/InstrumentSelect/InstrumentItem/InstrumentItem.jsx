import React, { Component } from 'react'
import { Player } from 'tone'
import notes from '../../../functions/music'
import expand from '../../../assets/icons/down-arrow.svg'
import collapse from '../../../assets/icons/up-arrow.svg'
import './InstrumentItem.scss'

import Collapsible from 'react-collapsible';

export default class InstrumentItem extends Component {
    state = {
        key: 'C',
        scale: 'major',
        octave: '3',
        range: 1,
        expanded: false
    }



    expand = () => {
        this.setState({
            ...this.state,
            expanded: !this.state.expanded
        })
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })

        console.log(this.state[e.target.name]);
    }

    makeInst = (key, scale, octave, range, tone, type) => {
        let _notes = []

        for(let i = 0; i < range; i++){
            _notes = [..._notes, ...notes.getScale(key, scale, Number(octave) + i)]
            console.log(_notes);
        }

        this.props.addInst({keys:_notes, tone:tone, type})
    }

    render() {
        // if (this.state.expanded){
        return (
            
            <Collapsible
                trigger = {this.props.inst.name}
                triggerStyle = {{
                    color: "#ff4a4a",
                    fontSize: '20px',
                    cursor: 'pointer'
                }}
                easing = 'ease-in-out'
                className='inst'
            >
            <div className='inst'>
            <div className='inst__wrapper'>
                <label className='inst__form-label' htmlFor="key">Key:</label>
                <input className='inst__input' name='key' onChange = {(e) => this.handleChange(e)} type="text" value={this.state.key}/>

                <label className='inst__form-label' htmlFor="scale">Scale:</label>
                <select className='inst__select' onChange = {(e) => this.handleChange(e)} value={this.state.scale} name="scale" id="cars">
                    <option value="chromatic">chromatic</option>
                    <option value="major">major</option>
                    <option value="minor">minor</option>
                </select>

                <label className='inst__form-label' htmlFor="key">octave</label>
                <input className='inst__input' name='octave' onChange = {(e) => this.handleChange(e)} value={this.state.octave} type="number"/>
                <label className='inst__form-label' htmlFor="range">range</label>
                <input className='inst__input' name='range' onChange = {(e) => this.handleChange(e)} value={this.state.range} type="number"/>

                <span className="inst_btn-wrap">
                    <button className='inst__btn' onClick={
                        ()=>this.makeInst(this.state.key, 
                            this.state.scale, this.state.octave, 
                            this.state.range, 
                            {
                                urls: this.props.inst.urls,
                                baseUrl: this.props.inst.baseUrl,
                                name: this.props.inst.name
                            },
                            this.props.inst.type
                    )}>
                        ADD
                    </button>
                </span>
            </div>
            </div>
            </Collapsible>
        )
        // } else {
        //     return (
        //         <>
        //             <div className="inst__title-wrap">
        //             <h3 className="inst__name" onClick={this.expand}>{this.props.inst.name}</h3> 
        //             <img className='inst__expand-icon' src={expand} onClick={this.expand} alt=""/>
        //             </div>
        //         </>
        //     )
        // }
    }
}
