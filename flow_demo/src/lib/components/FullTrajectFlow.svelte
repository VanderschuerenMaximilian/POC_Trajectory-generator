<script lang="ts">
  import {
    nodes as nodesStore,
    edges as edgesStore,
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
    type Edge,
    // @ts-ignore
  } from '@xyflow/svelte';
  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import '@xyflow/svelte/dist/style.css';
  import { onMount } from 'svelte';
  import Extraction from '$lib/utilClasses/Nodes';
  import StepNode from './nodes/StepNode.svelte';
  import type { ITrajectory } from './types';
  import TrajectoryNode from './nodes/TrajectoryNode.svelte';
  import PhaseNode from './nodes/PhaseNode.svelte';
  import EventNode from './nodes/EventNode.svelte';
  import DatapointNode from './nodes/DatapointNode.svelte';
  import { flattenArray } from '$lib/utils';

  const extraction = new Extraction();
  const snapGrid: [number, number] = [25, 25];
  const nodeTypes: NodeTypes = {
    trajectoryNode: TrajectoryNode,
    phaseNode: PhaseNode,
    eventNode: EventNode,
    stepNode: StepNode,
    datapointNode: DatapointNode,
  };

  async function getFullTrajectoryNodes() {
    const { nodes, edges } = await extraction.extractFullTrajectory(
      trajectory,
      items
    );
    return { nodes, edges };
  }

  async function init() {
    const { nodes: flatNodes, edges: flatEdges } =
      await getFullTrajectoryNodes();
    $nodesStore = flatNodes;
    $edgesStore = flatEdges;
  }

  function assignColorToNode(type: string) {
    if (type === 'trajectoryNode') return 'rgba(0, 150, 0, 0.75)';
    else if (type === 'phaseNode') return 'blue';
    else if (type === 'eventNode') return 'red';
    else if (type === 'stepNode') return 'hotpink';
    else if (type === 'datapointNode') return 'yellow';
  }
  $: trajectory = $trajectoryStore;
  $: items = $itemsStore;
  $: if (trajectory && items) init();
</script>

<SvelteFlow
  nodes={nodesStore}
  edges={edgesStore}
  {nodeTypes}
  {snapGrid}
  fitView={true}
>
  <Controls />
  <Background gap={[20, 20]} variant={BackgroundVariant.Dots} />
  <MiniMap
    width={1000}
    position={'top-center'}
    nodeColor={(n) => {
      if (n.type === 'trajectoryNode') return 'rgba(0, 150, 0, 0.75)';
      else if (n.type === 'phaseNode') return 'blue';
      else if (n.type === 'eventNode') return 'red';
      else if (n.type === 'stepNode') return 'hotpink';
      else if (n.type === 'datapointNode') return 'yellow';
    }}
    zoomable={true}
    pannable={true}
  />
</SvelteFlow>
