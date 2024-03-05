<script lang="ts">
  import { Svelvet, Minimap, Drawer, ThemeToggle } from 'svelvet';
  import TrajectoryNode from '$lib/components/nodes/svelvet/TrajectoryNode.svelte';
  import PhaseNode from '$lib/components/nodes/svelvet/PhaseNode.svelte';
  import EventNode from '$lib/components/nodes/svelvet/EventNode.svelte';
  import StepNode from './nodes/svelvet/StepNode.svelte';
  import { svelvetNodes, svelvetEdges } from '$lib/store';
  import { EnumNodeTypes, EnumNodeColors } from '$lib/utilClasses/SvelvetNodes';
  import {
    type LayoutOptions,
    type ElkNode,
    type ElkExtendedEdge,
  } from 'elkjs';
  import { flattenArray } from '$lib/utils';
  import ELK from 'elkjs';
  import OptionNode from './nodes/svelvet/OptionNode.svelte';
  import DatapointNode from './nodes/svelvet/DatapointNode.svelte';
  import DragAndDrop from './general/svelvet/DragAndDrop.svelte';

  const elk = new ELK();
  const elkOptions: LayoutOptions = {
    'elk.algorithm': 'mrtree',
    'elk.spacing.nodeNode': '260',
    'elk.direction': 'DOWN',
  };
  let nodes: any = [];
  let edges: any = [];
  let firstNodes: any = [];
  let firstEdges: any = [];

  function getSource(anchor: string) {
    const split = anchor.split('-');
    return split[1];
  }

  async function convertEdgesToElk(originalEdges: any[]): Promise<any[]> {
      return originalEdges.map((edge) => ({
        id: edge[0],
        container: 'my-canvas',
        source: getSource(edge[1]),
        target: edge[0],
      }));
  }

  async function getElementsLayout(
    nodes: any[],
    edges: any[],
    options: LayoutOptions
  ): Promise<{ nodes: ElkNode[]; edges: ElkExtendedEdge[] }> {
    const convertedEdges = await convertEdgesToElk(edges);
    const transformedNodes = nodes.map((node) => ({
      ...node,
      children: node.data.children ?? [],
      layoutOptions: options,
    }));
    const graph = {
      id: 'my-canvas',
      layoutOptions: options,
      children: transformedNodes,
      edges: convertedEdges,
    };
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
    const { nodes: elementNodes } = await getElementsLayout(
      firstNodes,
      firstEdges,
      elkOptions
    );
    return { elementNodes };
  }

  async function init() {
    const { elementNodes: elkNodes } = await getFullTrajectoryNodes();
    nodes = elkNodes;
    edges = $svelvetEdges;
  }

  function onEdgeDrop(event: CustomEvent) {
    if (event.type !== 'edgeDrop') return;
    const {
      detail: { source },
    } = event;
    const newNodeId = nodes.length + 1;
    const sourceNode = nodes[parseInt(source.node) - 1];
    const { type: newType, color } = determineType(sourceNode.type);
    const newNode = {
      id: newNodeId,
      type: newType,
      data: {
        parent: sourceNode.id,
        color: color,
        datapoint: {
          name: `Datapoint ${newNodeId}`,
          description: `Description for Datapoint ${newNodeId}`,
        },
      },
    };
    const newEdge = [
      newNodeId.toString(),
      `anchor-${sourceNode.id}-${newNodeId}`,
    ];
    nodes = [...nodes, newNode];
    // edges.push(newEdge);
    edges = [...edges, newEdge];
  }

  function determineType(sourceType: EnumNodeTypes): {
    type: EnumNodeTypes;
    color: EnumNodeColors;
  } {
    switch (sourceType) {
      case EnumNodeTypes.phase:
        return { type: EnumNodeTypes.step, color: EnumNodeColors.step };
      case EnumNodeTypes.event:
        return { type: EnumNodeTypes.option, color: EnumNodeColors.option };
      case EnumNodeTypes.step:
        return {
          type: EnumNodeTypes.datapoint,
          color: EnumNodeColors.datapoint,
        };
      default:
        return {
          type: EnumNodeTypes.datapoint,
          color: EnumNodeColors.datapoint,
        };
    }
  }

  $: {
    firstNodes = $svelvetNodes;
    firstEdges = $svelvetEdges;
    if (firstNodes && firstEdges) init();
  }
</script>

<Svelvet
  id="my-canvas"
  TD
  controls
  trackpadPan
  edgeStyle="step"
  zoom={0.4}
  on:edgeDrop={onEdgeDrop}
>
  <Minimap
    borderColor={'rgba(255,255,255,0)'}
    width={1880}
    height={200}
    corner={'NW'}
    slot="minimap"
    nodeColor={'rgb(0,0,0)'}
  />
  <!-- (n) => {
     if (n.type === EnumNodeTypes.trajectory) return 'rgba(0, 150, 0, 0.75)';
     else if (n.type === EnumNodeTypes.phase) return 'rgb(220,20,60)';
     else if (n.type === EnumNodeTypes.event) return 'rgb(98, 202, 237)';
     else if (n.type === EnumNodeTypes.step) return 'rgb(255, 105, 180)';
     else if (n.type === EnumNodeTypes.option) return 'rgb(255, 165, 0)';
     else if (n.type === EnumNodeTypes.datapoint) return 'rgb(243, 238, 9)';
     else return 'rgba(0,0,0)';
  } -->
  <!-- <DragAndDrop /> -->
  {#if nodes}
    {#each nodes as node, i}
      {#if node.type === EnumNodeTypes.trajectory}
        <TrajectoryNode {node} {i} />
      {:else if node.type === EnumNodeTypes.phase}
        <PhaseNode {node} {i} />
      {:else if node.type === EnumNodeTypes.event}
        <EventNode {node} {i} />
      {:else if node.type === EnumNodeTypes.step}
        <StepNode {node} {i} />
      {:else if node.type === EnumNodeTypes.option}
        <OptionNode {node} {i} />
      {:else if node.type === EnumNodeTypes.datapoint}
        <DatapointNode {node} {i} />
      {/if}
    {/each}
  {/if}
</Svelvet>
