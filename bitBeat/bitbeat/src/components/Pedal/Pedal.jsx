import React, { Component } from 'react'
import settings from './settings.js'
import './Pedal.scss'
import FadeIn from 'react-fade-in';



export default class Pedal extends Component {
    constructor(props){
        super(props)
        this.state = {}
        this.style = {
            backgroundColor: 'red'
        }

        this.rangeRef = React.createRef()
    }
    

    componentDidMount(){
        // setting the default values in state according to the settings object

        const defaultState = {}

        settings[this.props.effect.type].forEach((s)=>{
            defaultState[s.name] = s.default
        })


        this.setState({
            ...defaultState
        })
    }

    update = (e) => {
        console.log(e.target.value);
        // normalizing the value using the normalization function in the settings object 
        const normal = settings.normalizers[e.target.dataset.normalize](e.target.value);

        this.props.change(this.props.effect.id, e.target.name, normal)
        this.setState({
            [e.target.name]: e.target.value,
        })

        this.rangeRef.current.style.boxShadow = `10px 10px 90px ${this.state[e.target.name]}px #ff4a4a !important;`
        console.log('shaodow: ' , this.rangeRef.current.style.boxShadow);
    }

    changeGlow = (name)=> {

    }

    render() {
        const divStyle = {
            color: 'blue !important',

          };

        return (
            <FadeIn>
            <div className='pedal'>
                <h3 className="pedal__heading">{this.props.effect.type}</h3>
                {
                    settings[this.props.effect.type].map(s => {
                        return (
                            <div className="pedal__range-wrap">
                                <label htmlFor={s.name}>{s.label}</label>    
                                <input type='range' ref = {this.rangeRef}style={divStyle} data-normalize={s.normalize} value={this.state[s.name]} onChange={this.update} name={s.name} min={s.range[0]} max={s.range[1]} />
                            </div>
                        )
                    })
                }
            </div>
            </FadeIn>
        )
    }
}

