 // used in Pedals.jsx for creating settings controls
 
 const settings = {
    'Reverb': [
        {
            name: 'decay',
            label: 'decay',
            range: [0.001, 10],
            normalize: 0,
            default: 10
        },

        {
            name: 'wet',
            label: 'wet',
            range: [1, 10],
            normalize: 1,
            default: 1
        }
    ],

    'FeedbackDelay': [
        {
            name: 'feedback',
            label: 'feedback',
            range: [1, 10],
            normalize: 1,
            default: 0.1
        },

        {
            name: 'delayTime',
            label: 'delay time',
            range: [1, 3],
            normalize: 2,
            default: 1
        },
    ],
    
    'Distortion': [
        {
            name: 'distortion',
            label: 'distortion',
            range: [1, 10],
            normalize: 1,
            default: 1
        },
    ],

    'JCReverb': [
        {
            name: 'roomSize',
            label: 'room size',
            range: [1, 10],
            normalize: 1,
            default: 5
        },

        {
            name: 'wet',
            label: 'wet',
            range: [1, 10],
            normalize: 1,
            default: 5
        },
    ],

    'Vibrato': [
        {
            name: 'depth',
            label: 'depth',
            range: [1, 10],
            normalize: 1,
            default: 1
        },

        {
            name: 'frequency',
            label: 'frequency',
            range: [1, 10],
            normalize: 1,
            default: 1
        },
        {
            name: 'wet',
            label: 'wet',
            range: [1, 10],
            normalize: 1,
            default: 5
        },
    ],
    'EQ3': [
        {
            name: 'high',
            label: 'high',
            range: [1, 20],
            normalize: 0,
            default: 5
        },

        {
            name: 'mid',
            label: 'mid',
            range: [1, 20],
            normalize: 0,
            default: 5
        },
        {
            name: 'low',
            label: 'low',
            range: [1, 20],
            normalize: 0,
            default: 5
        },
    ],

    normalizers: [
        n => n,
        n => n/10,
        n => {
            if(n == 1) return '16n'
            if(n == 2) return '8n'
            if(n == 3) return '4n'
        }
    ]
}

export default settings