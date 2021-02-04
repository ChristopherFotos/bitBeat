const mouse = {
    x: null,
    y: null,
    dragging: false
}

document.addEventListener('mousedown', e=>{
    mouse.dragging = true
})

document.addEventListener('mouseup', e=>{
    mouse.dragging = false
})

document.addEventListener('mousemove', e=>{
    mouse.x = e.clientX
    mouse.y = e.clientY
})

export default mouse