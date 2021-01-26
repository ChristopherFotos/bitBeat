import React from 'react'
import makeInstrumentLayers from '../../functions/instrument'
import InstrumentItem from './InstrumentItem/InstrumentItem'
import './InstrumentSelect.scss'
import notes from '../../functions/music'
import DrumKitItem from '../DrumKitItem/DrumKitItem'

export default function InstrumentSelect(props) {
    return (
        <div className='instrument-select'>
            {props.instruments.map(i => <InstrumentItem inst={i} addInst = {props.addInst}/>)}
            {props.drumKits.map(k => <DrumKitItem kit={k} addKit = {props.addKit} />)}
        </div>
    )
}
