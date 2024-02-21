<script lang="ts">
  import { writable } from 'svelte/store';
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    type NodeTypes,
    type Edge,
    type Node,
  } from '@xyflow/svelte';
  import ColorPickerNode from '$lib/components/nodes/ColorPickerNode.svelte';

  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import '@xyflow/svelte/dist/style.css';

  // We are using writables for the nodes and edges to sync them easily. When a user drags a node for example, Svelte Flow updates its position.
  const nodes = writable<Node[]>([
    {
      id: '1',
      type: 'input',
      data: { label: 'Input Node' },
      position: { x: 0, y: 0 },
    },
    {
      id: '2',
      type: 'colorPicker',
      data: { label: 'Node', color: writable('#ff0000') },
      position: { x: 0, y: 150 },
    },
    {
      id: '3',
      type: 'input',
      data: { label: 'Input Node 2' },
      position: { x: 0, y: 300 },
    },
  ]);

  // same for edges
  const edges = writable<Edge[]>([
    // {
    //   id: '1-2',
    //   type: 'default',
    //     source: '1',
    //     target: '2',
    //   label: 'Edge Text',
    // },
  ]);

  const snapGrid: [number, number] = [25, 25];

  const nodeTypes: NodeTypes = {
    colorPicker: ColorPickerNode,
  };
</script>

<SvelteFlow
    {nodes}
    {edges}
    {nodeTypes}
    {snapGrid}
    fitView
    on:nodeclick={(event) => console.log('on node click', event.detail.node)}
  >
    <Controls />
    <Background variant={BackgroundVariant.Dots} />
    <MiniMap />
  </SvelteFlow>