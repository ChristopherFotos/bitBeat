import React, { Component } from 'react'
import { Player } from 'tone'


export default class DrumKitItem extends Component {

    makeSounds(){
        const sounds = {}
        const keys = []
        this.props.kit.sounds.forEach(k=> {
            sounds[k.name] = new Player(k.url).toDestination();
            keys.push(k.name)
        })
        return {
            sounds: sounds,
            keys: keys
        }
    }

    render() {
        return(
            <button
                onClick={() => this.props.addKit(
                    this.makeSounds()
                )}
            >
                {this.props.kit.name}
            </button>
        )
    }
}
