<script lang="ts">
  import {
    nodes,
    edges,
    activeItem,
    items as itemsStore,
    trajectory,
  } from '$lib/store';
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    type NodeTypes,
    type Node,
    type Edge,
    useSvelteFlow,
    Panel,
  } from '@xyflow/svelte';
  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import '@xyflow/svelte/dist/style.css';
  import ColorPickerNode from '$lib/components/nodes/ColorPickerNode.svelte';
  import MainNode from './nodes/MainNode.svelte';
  import ImportantNode from './nodes/ImportantNode.svelte';
  import { onMount } from 'svelte';
  import Extraction from '$lib/utilClasses/Nodes';
  import StepNode from './nodes/StepNode.svelte';

  const extraction = new Extraction();
  const snapGrid: [number, number] = [25, 25];
  const nodeTypes: NodeTypes = {
    colorPicker: ColorPickerNode,
    mainNode: MainNode,
    importantNode: ImportantNode,
    stepNode: StepNode,
  };

  let items: any = [];

  onMount(async () => {
    items = itemsStore;
  });

  async function getChildren(parentNode: any) {
    if (!parentNode) return;
    else if (parentNode.type === 'phase') {
      const { steps, stepsEdges } = await extraction.extractSteps(
        parentNode.steps
      );
      $nodes = steps;
      $edges = stepsEdges;
    } else if (parentNode.type === 'event') {
      extraction.extractOptions(parentNode.options);
      $nodes = [];
      $edges = [];
    }
  }

  $: getChildren($activeItem);
</script>

<SvelteFlow
  {nodes}
  {edges}
  {nodeTypes}
  {snapGrid}
  fitView={true}
  on:nodeclick={(e) => console.log(e.detail.node)}
>
  <Controls />
  <Background gap={[20, 20]} variant={BackgroundVariant.Dots} />
  <!-- TODO: style the panel & place it in a component -->
  <Panel position="top-left">
    <div>
      <h1>{$trajectory.episode_object.name}</h1>
      <p>{$trajectory.episode_object.description}</p>
    </div>
  </Panel>
  <MiniMap />
</SvelteFlow>

<style scoped>
  div {
    background-color: #f3f3f3;
    padding: 16px;
    border-radius: 15px;
  }

  h1,
  p {
    margin: 0;
  }
</style>
