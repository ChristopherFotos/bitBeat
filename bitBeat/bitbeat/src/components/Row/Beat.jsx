import React, { useState, useContext } from 'react'
import { GlobalStep } from '../Transport/Transport'
import FadeIn from 'react-fade-in'


// import cons[state, setstate] = useState(initialState)

export default function Beat (props) {
    const [active, setActive] = useState()
    const step = useContext(GlobalStep)

    const toggle = ()=> {
        active = !active
        console.log(active);
    }

    return (
        <FadeIn>
        <div onClick = {() => {
            setActive(!active)
            props.flip(props.layerKey, props.index)
        }} 
            className = {`beat ${active ? 'beat--active' : ''}${step.step === props.index  ? 'beat--playing' : ''}`}>
        </div>
        </FadeIn>
    )
}
