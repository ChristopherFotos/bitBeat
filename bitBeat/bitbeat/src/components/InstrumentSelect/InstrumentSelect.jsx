import React from 'react'
import makeInstrumentLayers from '../../functions/instrument'
import notes from '../../functions/music'

export default function InstrumentSelect(props) {
    return (
        <div>
            <button onClick = {() => props.addInst(
                    [...notes.getScale('D', 'major', 3), ...notes.getScale('D', 'major', 4)]
            )}> Synth </button>

            <button onClick = {() => props.addInst(
                    [...notes.getScale('D', 'major', 2), ...notes.getScale('D', 'major', 3)]
            )} > Bass </button>
        </div>
    )
}
