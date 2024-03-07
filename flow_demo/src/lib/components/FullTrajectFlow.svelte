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
  } from '@xyflow/svelte';
  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import '@xyflow/svelte/dist/style.css';
  import Extraction from '$lib/utilClasses/Nodes';
  import ElkExtraction from '$lib/utilClasses/ElkNodes';
  import StepNode from './nodes/StepNode.svelte';
  import TrajectoryNode from './nodes/TrajectoryNode.svelte';
  import PhaseNode from './nodes/PhaseNode.svelte';
  import EventNode from './nodes/EventNode.svelte';
  import DatapointNode from './nodes/DatapointNode.svelte';
  import OptionNode from './nodes/OptionNode.svelte';
  import { TrajectoryColors, TrajectoryNodeTypes } from '$lib/enum';

  const extraction = new Extraction();
  const elkExtraction = new ElkExtraction();
  const snapGrid: [number, number] = [25, 25];
  const nodeTypes: NodeTypes = {
    trajectoryNode: TrajectoryNode,
    phaseNode: PhaseNode,
    eventNode: EventNode,
    stepNode: StepNode,
    datapointNode: DatapointNode,
    optionNode: OptionNode,
  };

  async function getFullTrajectoryNodes() {
    const { nodes: flatNodes, edges: flatEdges } =
      await extraction.extractFullTrajectory(trajectory, items);
    const { nodes: elkNodes, edges: elkEdges } = await elkExtraction.getTreeLayout(
      flatNodes,
      flatEdges
    );
    return { nodes: elkNodes, edges: elkEdges };
  }

  async function init() {
    const { nodes: elkNodes, edges: elkEdges } =
      await getFullTrajectoryNodes();
    // @ts-expect-error
    $nodesStore = elkNodes;
    // @ts-expect-error
    $edgesStore = elkEdges;
  }

  $: trajectory = $trajectoryStore;
  $: items = $itemsStore;
  $: if (trajectory && items) init();
</script>

{#key trajectory}
<SvelteFlow
  nodes={nodesStore}
  edges={edgesStore}
  {nodeTypes}
  {snapGrid}
  fitView={true}
  nodesDraggable={false}
>
  <Controls />
  <Background gap={[20, 20]} variant={BackgroundVariant.Dots} />
  <MiniMap
    width={1000}
    position={'top-center'}
    nodeColor={(n) => {
      switch (n.type) {
        case TrajectoryNodeTypes.trajectory:
          return TrajectoryColors.trajectory;
        case TrajectoryNodeTypes.phase:
          return TrajectoryColors.phase;
        case TrajectoryNodeTypes.event:
          return TrajectoryColors.event;
        case TrajectoryNodeTypes.step:
          return TrajectoryColors.step;
        case TrajectoryNodeTypes.option:
          return TrajectoryColors.option;
        case TrajectoryNodeTypes.datapoint:
          return TrajectoryColors.datapoint;
        default:
          return 'black';
      }
    }}
    zoomable={true}
    zoomStep={20}
    pannable={true}
    ariaLabel={'Mini map of the flow diagram.'}
  />
</SvelteFlow>
{/key}