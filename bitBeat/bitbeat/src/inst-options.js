// import {Tone}  from "tone/build/esm/core/Tone"

const options = {
    inst:[
    {
        name: 'rhodes',
        baseUrl: "http://localhost:3000/samples/rhodes/",
        urls: {
            C1:"US_Rhodes_C1.wav",
            C2:"US_Rhodes_C2.wav",
            C3:"US_Rhodes_C3.wav",
            C4:"US_Rhodes_C4.wav",
        },
        type:'sampler'
    },

    {
        name: 'rhodes2',
        baseUrl: "http://localhost:3000/samples/rhodes/",
        urls: {
            C1:"US_Rhodes_C1.wav",
            C2:"US_Rhodes_C2.wav",
            C3:"US_Rhodes_C3.wav",
            C4:"US_Rhodes_C4.wav",
        },
        type: 'sampler'
    },
    {
        name: 'synth',
        baseUrl: "http://localhost:3000/samples/synth/",
        urls: {
            'A#1':"Asharp1.wav",
            'C1':"C1.wav",
            'D#2':"Dsharp2.wav",
            'G#2':"Gsharp2.wav",
        },
        type: 'sampler'
    },
    {
        name: 'digi-synth',
        baseUrl: "http://localhost:3000/samples/digi-synth/",
        urls: {
            C3:"DigiMass_C3.wav",
        },
        type: 'sampler'
    },
    {
        name: 'cello',
        baseUrl: "http://localhost:3000/samples/cello/",
        urls: {
            C1:"Cello-C1.wav",
            C2:"Cello-C2.wav",
            C3:"Cello-C3.wav",
            C4:"Cello-C4.wav",
        },
        type: 'sampler'
    },

    // NEW INSTS    

    {
        name: 'Acid Synth',
        baseUrl: "http://localhost:3000/samples/acid-synth/",
        urls: {
            C1:"c1.wav",
            C2:"c2.wav",
            C3:"c3.wav",
        },
        type: 'sampler'
    },
    {
        name: 'Elkaph Synth',
        baseUrl: "http://localhost:3000/samples/elkaph-synth/",
        urls: {
            C2:"ElkaC2.wav",
            C3:"ElkaC3.wav",
            C4:"ElkaC4.wav",
        },
        type: 'sampler'
    },
    {
        name: 'Female choir',
        baseUrl: "http://localhost:3000/samples/female-choir/",
        urls: {           
            C2:"Fem_C2.wav",
            C3:"Fem_C3.wav",
            C4:"Fem_C4.wav",
        },
        type: 'sampler'
    },
    {
        name: 'Breathy Female Vocals',
        baseUrl: "http://localhost:3000/samples/female-breathy/",
        urls: {
            E3:"Aah-E.wav",
        },
        type: 'sampler'
    },
    {
        name: 'Guitar',
        baseUrl: "http://localhost:3000/samples/guitar/",
        urls: {
            D2:"D2.wav",
            D4:"D4.wav",
            E1:"E1.wav",
            E3:"E3.wav",
        },
        type: 'sampler'
    },
    {
        name: 'Harmonic Synth',
        baseUrl: "http://localhost:3000/samples/harm-synth/",
        urls: {
            C1:"C1.wav",
            C2:"C2.wav",
            C3:"C3.wav",
            C4:"C4.wav",
            C5:"C5.wav",
        },
        type: 'sampler'
    },
    {
        name: 'Hard Synth Bass',
        baseUrl: "http://localhost:3000/samples/hard-res-synth-bass/",
        urls: {
            C1:"C1.wav",
            C2:"C2.wav",
            E1:"E1.wav",
        },
        type: 'sampler'
    },
    {
        name: 'Must Destroy You Bass',
        baseUrl: "http://localhost:3000/samples/must-destroy-you-bass-1/",
        urls: {
            C1:"C1.wav",
        },
        type: 'sampler'
    },
    {
        name: 'Slap Bass',
        baseUrl: "http://localhost:3000/samples/slap-bass/",
        urls: {
            E1:"slap-E1.wav",
            E2:"slap-E2.wav",
            E3:"slap-E3.wav",
        },
        type: 'sampler'
    },
    {
        name: 'Square Bass',
        baseUrl: "http://localhost:3000/samples/square-bass/",
        urls: {
            A2:"A2.wav",
            C2:"C2.wav",
            C3:"C3.wav",
            B4:"B4.wav",
        },
        type: 'sampler'
    },
    {
        name: 'Synth Bass',
        baseUrl: "http://localhost:3000/samples/synthbass/",
        urls: {
            C1:"C1.wav",
            C2:"C2.wav",
            E1:"E1.wav",
        },
        type: 'sampler'
    },
    // {
    //     name: '',
    //     baseUrl: "http://localhost:3000/samples/",
    //     urls: {
    //         C1:"",
    //         C2:"",
    //         C3:"",
    //         C4:"",
    //     },
    //     type: 'sampler'
    // },
    // {
    //     name: '',
    //     baseUrl: "http://localhost:3000/samples/",
    //     urls: {
    //         C1:"",
    //         C2:"",
    //         C3:"",
    //         C4:"",
    //     },
    //     type: 'sampler'
    // },
    // {
    //     name: '',
    //     baseUrl: "http://localhost:3000/samples/",
    //     urls: {
    //         C1:"",
    //         C2:"",
    //         C3:"",
    //         C4:"",
    //     },
    //     type: 'sampler'
    // },
    // {
    //     name: '',
    //     baseUrl: "http://localhost:3000/samples/",
    //     urls: {
    //         C1:"",
    //         C2:"",
    //         C3:"",
    //         C4:"",
    //     },
    //     type: 'sampler'
    // },
    // {
    //     name: '',
    //     baseUrl: "http://localhost:3000/samples/",
    //     urls: {
    //         C1:"",
    //         C2:"",
    //         C3:"",
    //         C4:"",
    //     },
    //     type: 'sampler'
    // },
    // {
    //     name: '',
    //     baseUrl: "http://localhost:3000/samples/",
    //     urls: {
    //         C1:"",
    //         C2:"",
    //         C3:"",
    //         C4:"",
    //     },
    //     type: 'sampler'
    // },
    // {
    //     name: '',
    //     baseUrl: "http://localhost:3000/samples/",
    //     urls: {
    //         C1:"",
    //         C2:"",
    //         C3:"",
    //         C4:"",
    //     },
    //     type: 'sampler'
    // },
    // {
    //     name: '',
    //     baseUrl: "http://localhost:3000/samples/",
    //     urls: {
    //         C1:"",
    //         C2:"",
    //         C3:"",
    //         C4:"",
    //     },
    //     type: 'sampler'
    // },
    // {
    //     name: '',
    //     baseUrl: "http://localhost:3000/samples/",
    //     urls: {
    //         C1:"",
    //         C2:"",
    //         C3:"",
    //         C4:"",
    //     },
    //     type: 'sampler'
    // },

    ],

    kit: [
        {
            name: 'kitOne',
            sounds:[
                {name: 'kick', url: 'http://localhost:3000/samples/percussion/analog/KICK1.wav'},
                {name: 'snare', url: 'http://localhost:3000/samples/percussion/analog/SNARE1.wav'},
                {name: 'hat', url: 'http://localhost:3000/samples/percussion/analog/HHCL.wav'},
                {name: 'hh-open', url: 'http://localhost:3000/samples/percussion/analog/HHOP.wav'},
            ]
        },
    ]
}

export default options