import React, { Component } from 'react'
import { Player } from 'tone'
import notes from '../../../functions/music'

export default class InstrumentItem extends Component {
    state = {
        key: 'C',
        scale: 'major',
        octave: '2',
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
        if (this.state.expanded){
        return (
            <>
            <h3 className="inst__name" onClick={this.expand}>{this.props.inst.name}</h3>
            <div className='inst'>
                

                <label htmlFor="key">Key:</label>
                <input name='key' onChange = {(e) => this.handleChange(e)} type="text" value={this.state.key}/>

                <label htmlFor="scale">Scale:</label>
                <select onChange = {(e) => this.handleChange(e)} value={this.state.scale} name="scale" id="cars">
                    <option value="chromatic">chromatic</option>
                    <option value="major">major</option>
                    <option value="minor">minor</option>
                </select>

                <label htmlFor="key">octave</label>
                <input name='octave' onChange = {(e) => this.handleChange(e)} value={this.state.octave} type="number"/>
                <label htmlFor="range">range</label>
                <input name='range' onChange = {(e) => this.handleChange(e)} value={this.state.range} type="number"/>

                <button onClick={
                ()=>this.makeInst(this.state.key, 
                    this.state.scale, this.state.octave, 
                    this.state.range, 
                    {
                        urls: this.props.inst.urls,
                        baseUrl: this.props.inst.baseUrl,
                    },
                    this.props.inst.type
                )}>ADD</button>
            </div>
            </>
        )
        } else {
            return (
                <h3 className="inst__name" onClick={this.expand}>{this.props.inst.name}</h3>
            )
        }
    }
}
