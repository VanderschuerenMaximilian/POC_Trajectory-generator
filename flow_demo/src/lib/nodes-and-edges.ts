import type { Node, Edge } from '@xyflow/svelte';

// example for folding nodes based on the mainNode
export const initialNodes: Node[] = [
    // {
    //   id: '2',
    //   type: 'colorPicker',
    //   data: {
    //     label: 'Node',
    //     color: writable('#ff0000'),
    //   },
    //   position: { x: 0, y: 150 },
    // },
    {
        id: '1',
        type: 'mainNode',
        data: {
            label: 'history',
        },
        position: { x: 0, y: 7 },
        draggable: false,
    },
    {
        id: '2',
        type: 'mainNode',
        data: {
            label: 'trigger',
        },
        position: { x: 0, y: 157 },
        draggable: false,
    },
    {
        id: '3',
        type: 'importantNode',
        data: {
            label: 'step 1',
            originalPosition: { x: 200, y: 3 },
        },
        position: { x: 200, y: 3 },
        parentNode: '1',
    },
    {
        id: '4',
        type: 'importantNode',
        data: {
            label: 'step 2',
            originalPosition: { x: 400, y: 3 },
        },
        position: { x: 400, y: 3 },
        parentNode: '1',
    },
    {
        id: '5',
        type: 'importantNode',
        data: {
            label: 'step 3',
            originalPosition: { x: 600, y: 3 },
        },
        position: { x: 600, y: 3 },
        parentNode: '1',
        extent: "parent"
    }
];

// example for folding edges based on the mainNode
export const initialEdges: Edge[] = [
    {
        id: 'main1-2',
        source: '1',
        sourceHandle: 'bottom',
        target: '2',
        targetHandle: 'top',    
    },
    {
        id: 'important1-2',
        source: '1',
        sourceHandle: 'right',
        target: '3',
        targetHandle: 'left',
    },
    {
        id: 'important2-3',
        source: '3',
        sourceHandle: 'right',
        target: '4',
        targetHandle: 'left',
    },
    {
        id: 'important3-4',
        source: '4',
        sourceHandle: 'right',
        target: '5',
        targetHandle: 'left',
    }
]