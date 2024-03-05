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

  //   TODO: Om elk te implementeren:
  // in the node specifics -> a Edge object -> map de nodes for the edge objects in SvelvetFlow.svelte
  // -> convert de edges you get from elk into [ , ]
  
  //   const elk = new ELK();
  //   const elkOptions: LayoutOptions = {
  //     'elk.algorithm': 'mrtree',
  //     // 'elk.layered.spacing.nodeNodeBetweenLayers': '80',
  //     'elk.spacing.nodeNode': '280',
  //     'elk.direction': 'DOWN',
  //   };
  let nodes: any = [];
  let edges: any = [];

  //   async function getElementsLayout(
  //     nodes: any[],
  //     edges: any[],
  //     options: LayoutOptions
  //   ): Promise<{ nodes: ElkNode[]; edges: ElkExtendedEdge[] }> {
  //     const transformedNodes = nodes.map((node) => ({
  //       ...node,
  //       children: node.data.children ?? [],
  //       layoutOptions: options,
  //     }));
  //     const graph = {
  //         id: 'root',
  //         layoutOptions: options,
  //         children: transformedNodes,
  //         edges,
  //     };
  //     const elkGraph = await elk.layout(graph);
  //     console.log(transformedNodes)
  //     const elkChildren = elkGraph.children ?? [];
  //     const flattenedArray = flattenArray(elkChildren, 'children').map(
  //       (node: ElkNode) => ({
  //         ...node,
  //         position: { x: node.x, y: node.y },
  //       })
  //     );
  //     return {
  //       nodes: flattenedArray,
  //       edges: elkGraph.edges ?? [],
  //     };
  //   }

  //   async function getFullTrajectoryNodes() {
  //     const convertedEdges = $svelvetEdges.map((edge: any) => (console.log('edge: ', edge), {
  //       id: edge.id,
  //       sources: edge.source,
  //       targets: edge.target,
  //     }));
  //     const { nodes: elementNodes, edges: elementEdges } = await getElementsLayout(
  //       nodes,
  //       edges,
  //       elkOptions
  //     );
  //     return { elementNodes, elementEdges };
  //   }

  //   async function init() {
  //     console.log('init')
  //         const { elementNodes: elkNodes, elementEdges: elkEdges } =
  //         await getFullTrajectoryNodes();
  //         console.log('elkNodes: ', elkNodes, 'elkEdges: ', elkEdges);
  //     // $svelvetNodes = elkNodes;
  //     // $svelvetEdges = elkEdges;
  //     // console.log('nodes: ', $nodesStore, 'edges: ', $edgesStore);
  //   }

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
    nodes = $svelvetNodes;
    edges = $svelvetEdges;
    // if (nodes && edges) init();
  }

  // $: console.log('nodes: ', nodes, 'edges: ', edges)
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
  <Minimap borderColor={"rgba(255,255,255,0)"} width={1880} height={200} corner={'NW'} slot="minimap" nodeColor={'rgb(0,0,0)'} />
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
        <TrajectoryNode {node} />
      {:else if node.type === EnumNodeTypes.phase}
        <PhaseNode {node} />
      {:else if node.type === EnumNodeTypes.event}
        <EventNode {node} />
      {:else if node.type === EnumNodeTypes.step}
        <StepNode {node} />
      {:else if node.type === EnumNodeTypes.option}
        <OptionNode {node} />
      {:else if node.type === EnumNodeTypes.datapoint}
        <DatapointNode {node} />
      {/if}
    {/each}
  {/if}
</Svelvet>
