import React from 'react'
import makeInstrumentLayers from '../../functions/instrument'
import notes from '../../functions/music'

export default function InstrumentSelect(props) {
    return (
        <div>
            <button onClick = {() => props.addInst(
                    [...notes.getScale('F#', 'minor', 3), ...notes.getScale('F#', 'minor', 4)]
            )}>Synth </button>

            <button onClick = {() => props.addInst(
                    ['C1','D1','E1','F1','G1','A1','B1','C2','D2','E2','F2','G2']
            )} >Bass </button>
        </div>
    )
}
