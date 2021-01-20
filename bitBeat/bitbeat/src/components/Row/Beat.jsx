import React, { useState } from 'react'

// import cons[state, setstate] = useState(initialState)

export default function Beat (props) {
    const [active, setActive] = useState()

    const toggle = ()=> {
        active = !active
        console.log(active);

    }

    return (
        <div onClick = {() => {
            setActive(!active)
            props.flip(props.layerKey, props.index)
        }} 
            className = {`beat ${active ? 'beat--active' : ''}`}>
        </div>
    )
}
