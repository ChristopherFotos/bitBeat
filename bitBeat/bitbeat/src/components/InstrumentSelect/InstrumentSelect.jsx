import React from 'react'
import makeInstrumentLayers from '../../functions/instrument'
import InstrumentItem from './InstrumentItem/InstrumentItem'
import './InstrumentSelect.scss'
import notes from '../../functions/music'

export default function InstrumentSelect(props) {
    return (
        <div>
            {props.instruments.map(i => <InstrumentItem inst={i} addInst = {props.addInst}/>)}
        </div>
    )
}
