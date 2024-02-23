<script lang="ts">
  import { nodes, edges } from '$lib/store';
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    type NodeTypes,
  } from '@xyflow/svelte';
  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import '@xyflow/svelte/dist/style.css';
  import CustomEdge from './edge/CustomEdge.svelte';
  import ColorPickerNode from '$lib/components/nodes/ColorPickerNode.svelte';
  import MainNode from './nodes/MainNode.svelte';
  import ImportantNode from './nodes/ImportantNode.svelte';

  const snapGrid: [number, number] = [25, 25];

  const nodeTypes: NodeTypes = {
    colorPicker: ColorPickerNode,
    mainNode: MainNode,
    importantNode: ImportantNode,
  };
</script>

<SvelteFlow
  {nodes}
  {edges}
  {nodeTypes}
  {snapGrid}
  fitView
  on:nodeclick={(e) => console.log(e.detail.node)}
>
  <Controls />
  <Background gap={[20, 20]} variant={BackgroundVariant.Dots} />
  <!-- TODO: Test CustomEdge -->
  <!-- <CustomEdge /> -->
  <MiniMap />
</SvelteFlow>
