import React, { Component } from 'react'
import Beat from './Beat'
import './Row.scss'


// takes an array as props, maps over it to render beats

export default function Row(props) {



    return (
        <div className='row'>
            {props.tone}{props.layer.map((l, i) => <Beat flip={props.placeBeat} layerKey={props.tone} index = {i} />)}
        </div>
    )
}

