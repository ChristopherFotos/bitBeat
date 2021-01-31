import React from 'react'
import makeInstrumentLayers from '../../functions/instrument'
import InstrumentItem from './InstrumentItem/InstrumentItem'
import './InstrumentSelect.scss'
import {useState} from 'react'
import {useRef} from 'react'
import notes from '../../functions/music'
import DrumKitItem from '../DrumKitItem/DrumKitItem'
import mouse from '../../mouse'


export default function InstrumentSelect(props) {
    

    return (
        <div className='instrument-select'>
            <h1>Instruments:</h1>
            {props.instruments.map(i => <InstrumentItem inst={i} addInst = {props.addInst}/>)}
            <h1>Drumkits:</h1>
            {props.drumKits.map(k => <DrumKitItem kit={k} addKit = {props.addKit} />)}
        </div>
    )
}
