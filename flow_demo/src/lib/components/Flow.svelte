<script lang="ts">
  import {
    nodes,
    edges,
    activeItem,
    items as itemsStore,
    trajectory as trajectoryStore,
  } from '$lib/store';
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
  import ColorPickerNode from '$lib/components/nodes/ColorPickerNode.svelte';
  import MainNode from './nodes/MainNode.svelte';
  import ImportantNode from './nodes/ImportantNode.svelte';
  import { onMount } from 'svelte';
  import Extraction from '$lib/utilClasses/Nodes';
  import StepNode from './nodes/StepNode.svelte';
  import TrajectroyPanel from './general/TrajectroyPanel.svelte';
  import type { ITrajectory } from './types';

  const extraction = new Extraction();
  const snapGrid: [number, number] = [25, 25];
  const nodeTypes: NodeTypes = {
    colorPicker: ColorPickerNode,
    mainNode: MainNode,
    importantNode: ImportantNode,
    stepNode: StepNode,
  };

  let items: any = [];
  let trajectory: ITrajectory;

  onMount(async () => {
    items = $itemsStore;
    trajectory = $trajectoryStore;
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
  <TrajectroyPanel {trajectory} />
  <MiniMap />
</SvelteFlow>
