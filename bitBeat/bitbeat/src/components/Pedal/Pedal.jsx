import React, { Component } from 'react'
import './Pedal.scss'

const settings = {
    'Reverb': [
        {
            name: 'decay',
            range: [0.01, 10],
            normalize: 0,
            default: 2
        },

        {
            name: 'wet',
            range: [1, 10],
            normalize: 1,
            default: 1
        },
    ],

    normalizers: [
        n => n,
        n => n/10
    ]
}

export default class Pedal extends Component {
    state = {
        // decay: 1,
        // wet: 1,
    }

    componentDidMount(){
        const defaultState = {}

        settings[this.props.effect.type].forEach((s)=>{
            defaultState[s.name] = s.default
        })

        console.log('before setState',defaultState);

        this.setState({
            ...defaultState
        }, ()=>console.log('setstate cb: ', this.state))
    }

    update = (e) => {
        const normal = settings.normalizers[e.target.dataset.normalize](e.target.value);

        this.props.change(this.props.effect.id, e.target.name, normal)
        this.setState({
            [e.target.name]: e.target.val,
        })
    }

    render() {
        return (
            <div className='pedal'>
                <h3 className="pedal__heading">{this.props.effect.type}</h3>
                {
                    settings[this.props.effect.type].map(s => {
                        return (
                            <div className="pedal__range-wrap">
                                <label htmlFor={s.name}>{s.name}</label>    
                                <input type='range' data-normalize={s.normalize} value={this.state[s.name]} onChange={this.update} name={s.name} min={s.range[0]} max={s.range[1]} />
                            </div>
                        )
                    })
                }
                {/* <input type="range" name='decay' value={this.state.decay} onChange={this.update} min='0.001' max='8'/>
                <input type="range" name='wet' value={this.state.wet} onChange={this.update} min='1' max='10'/> */}
            </div>
        )
    }
}

