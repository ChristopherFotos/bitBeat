export default function makeInstrumentLayers(keys, length) {
    const layers = {}

    keys.forEach(k => {
        layers[k] = []
        for(let i = 1; i <= length; i++){
            layers[k].push(0)
        }
    })

    return layers
}
