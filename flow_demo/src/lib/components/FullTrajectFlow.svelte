<script lang="ts">
  import {
    nodes as nodesStore,
    edges as edgesStore,
    items as itemsStore,
    trajectory as trajectoryStore,
    nodes,
  } from '$lib/store';
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    type NodeTypes,
    type Edge,
    type Node,
    ConnectionLineType,
  } from '@xyflow/svelte';
  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import '@xyflow/svelte/dist/style.css';
  import Extraction from '$lib/utilClasses/Nodes';
  import StepNode from './nodes/StepNode.svelte';
  import type { ITrajectory } from './types';
  import TrajectoryNode from './nodes/TrajectoryNode.svelte';
  import PhaseNode from './nodes/PhaseNode.svelte';
  import EventNode from './nodes/EventNode.svelte';
  import DatapointNode from './nodes/DatapointNode.svelte';
  import OptionNode from './nodes/OptionNode.svelte';
  import ELK, {
    type ElkExtendedEdge,
    type ElkNode,
    type LayoutOptions,
  } from 'elkjs';
  import { flattenArray } from '$lib/utils';
  import NodeOptions from './nodes/Node';

  const elk = new ELK();
  const elkOptions: LayoutOptions = {
    'elk.algorithm': 'mrtree',
    // 'elk.layered.spacing.nodeNodeBetweenLayers': '80',
    'elk.spacing.nodeNode': '280',
    'elk.direction': 'DOWN',
  };
  const extraction = new Extraction();
  const nodeOptions = new NodeOptions();
  const snapGrid: [number, number] = [25, 25];
  const nodeTypes: NodeTypes = {
    trajectoryNode: TrajectoryNode,
    phaseNode: PhaseNode,
    eventNode: EventNode,
    stepNode: StepNode,
    datapointNode: DatapointNode,
    optionNode: OptionNode,
  };

  async function getElementsLayout(
    nodes: Node[],
    edges: Edge[],
    options: LayoutOptions
  ): Promise<{ nodes: ElkNode[]; edges: ElkExtendedEdge[] }> {
    const transformedNodes = nodes.map((node) => ({
      ...node,
      children: node.data.children ?? [],
      layoutOptions: options,
    }));
    const graph = {
      id: 'root',
      layoutOptions: options,
      children: transformedNodes,
      edges,
    };
    // @ts-expect-error This is a Typescript error in the ElkJS & Svelte-flow package, the types don't match but work together
    const elkGraph = await elk.layout(graph);
    const elkChildren = elkGraph.children ?? [];
    const flattenedArray = flattenArray(elkChildren, 'children').map(
      (node: ElkNode) => ({
        ...node,
        position: { x: node.x, y: node.y },
      })
    );
    return {
      nodes: flattenedArray,
      edges: elkGraph.edges ?? [],
    };
  }

  async function getFullTrajectoryNodes() {
    const { nodes: flatNodes, edges: flatEdges } =
      await extraction.extractFullTrajectory(trajectory, items);
    const { nodes, edges } = await getElementsLayout(
      flatNodes,
      flatEdges,
      elkOptions
    );
    return { nodes, edges };
  }

  async function init() {
    const { nodes: flatNodes, edges: flatEdges } =
      await getFullTrajectoryNodes();
    // @ts-expect-error This is a Typescript error in the ElkJS & Svelte-flow package, the types don't match but work together
    $nodesStore = flatNodes;
    // @ts-expect-error This is a Typescript error in the ElkJS & Svelte-flow package, the types don't match but work together
    $edgesStore = flatEdges;
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
  nodesDraggable={false}
>
  <Controls />
  <Background gap={[20, 20]} variant={BackgroundVariant.Dots} />
  <MiniMap
    width={1000}
    position={'top-center'}
    nodeColor={(n) => {
      if (n.type === 'trajectoryNode') return nodeOptions.colors.trajectory;
      else if (n.type === 'phaseNode') return nodeOptions.colors.phase;
      else if (n.type === 'eventNode') return nodeOptions.colors.event;
      else if (n.type === 'stepNode') return nodeOptions.colors.step;
      else if (n.type === 'optionNode') return nodeOptions.colors.option;
      else if (n.type === 'datapointNode') return nodeOptions.colors.datapoint;
      else return 'black';
    }}
    zoomable={true}
    zoomStep={20}
    pannable={true}
    ariaLabel={'Mini map of the flow diagram.'}
  />
</SvelteFlow>
