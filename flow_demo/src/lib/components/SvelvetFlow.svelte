<script lang="ts">
  import { Svelvet, Minimap } from 'svelvet';
  import TrajectoryNode from '$lib/components/nodes/svelvet/TrajectoryNode.svelte';
  import PhaseNode from '$lib/components/nodes/svelvet/PhaseNode.svelte';
  import EventNode from '$lib/components/nodes/svelvet/EventNode.svelte';
  import StepNode from './nodes/svelvet/StepNode.svelte';
  import { svelvetNodes, svelvetEdges } from '$lib/store';
  import { TrajectoryColors, TrajectoryTypes } from '$lib/enum';
  import ElkExtraction from '$lib/utilClasses/ElkNodes';
  import OptionNode from './nodes/svelvet/OptionNode.svelte';
  import DatapointNode from './nodes/svelvet/DatapointNode.svelte';
  import DragAndDrop from './general/svelvet/DragAndDrop.svelte';

  const elkExtraction = new ElkExtraction();
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

  async function getFullTrajectoryNodes() {
    const convertedEdges = await convertEdgesToElk(firstEdges);
    const { nodes: elementNodes } = await elkExtraction.getTreeLayout(firstNodes, convertedEdges);
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
    nodes.push(newNode);
    edges.push(newEdge);
  }

  function determineType(sourceType: TrajectoryTypes): {
    type: TrajectoryTypes;
    color: TrajectoryColors;
  } {
    switch (sourceType) {
      case TrajectoryTypes.phase:
        return { type: TrajectoryTypes.step, color: TrajectoryColors.step };
      case TrajectoryTypes.event:
        return { type: TrajectoryTypes.option, color: TrajectoryColors.option };
      case TrajectoryTypes.step:
        return {
          type: TrajectoryTypes.datapoint,
          color: TrajectoryColors.datapoint,
        };
      default:
        return {
          type: TrajectoryTypes.datapoint,
          color: TrajectoryColors.datapoint,
        };
    }
  }

  $: firstNodes = $svelvetNodes;
  $: firstEdges = $svelvetEdges;
  $: if (firstNodes && firstEdges) init();
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
      {#if node.type === TrajectoryTypes.trajectory}
        <TrajectoryNode {node} {i} />
      {:else if node.type === TrajectoryTypes.phase}
        <PhaseNode {node} {i} />
      {:else if node.type === TrajectoryTypes.event}
        <EventNode {node} {i} />
      {:else if node.type === TrajectoryTypes.step}
        <StepNode {node} {i} />
      {:else if node.type === TrajectoryTypes.option}
        <OptionNode {node} {i} />
      {:else if node.type === TrajectoryTypes.datapoint}
        <DatapointNode {node} {i} />
      {/if}
    {/each}
  {/if}
</Svelvet>
