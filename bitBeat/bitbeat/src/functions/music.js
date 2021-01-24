const notes = {
    notes: [
        'C','C#','D','D#','E','F','F#','G','G#','A','A#','B', 
        'C','C#','D','D#','E','F','F#','G','G#','A','A#','B'
    ],
    scales: {
        chromatic: [1,1,1,1,1,1,1,1,1,1,1,1],
        major: [2,2,1,2,2,2,],
        minor: [2,1,2,2,1,2,]
    },

    getScale: function(key, scale, octave){
        const uppercaseKey = key.toUpperCase()
        const _scale = []
        _scale.push(uppercaseKey + octave)

        let currentNote = this.notes.indexOf(uppercaseKey)
        let crossedOctave = false

        this.scales[scale].forEach(i => {
            if(currentNote >= 10 && !crossedOctave) {
                crossedOctave = true
                octave ++
            } 
            currentNote >= this.notes.length - 1 ? currentNote = 0 + i: currentNote += i
            _scale.push(this.notes[currentNote] + octave)
        })

        return _scale
    }
}

console.log(notes.getScale('D', 'major', 1))

export default notes