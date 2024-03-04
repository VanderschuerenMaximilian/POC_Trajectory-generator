<script lang="ts">
  import { Svelvet, Minimap } from 'svelvet';
  import TrajectoryNode from '$lib/components/nodes/svelvet/TrajectoryNode.svelte';
  import PhaseNode from '$lib/components/nodes/svelvet/PhaseNode.svelte';
  import EventNode from '$lib/components/nodes/svelvet/EventNode.svelte';
  import StepNode from './nodes/svelvet/StepNode.svelte';
  import { svelvetNodes, svelvetEdges } from '$lib/store';
  import { EnumNodeTypes } from '$lib/utilClasses/SvelvetNodes';
//   import {
//     type LayoutOptions,
//     type ElkNode,
//     type ElkExtendedEdge,
//   } from 'elkjs';
//   import { flattenArray } from '$lib/utils';
//   import ELK from 'elkjs';
  import OptionNode from './nodes/svelvet/OptionNode.svelte';
  import DatapointNode from './nodes/svelvet/DatapointNode.svelte';

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

  $: {
    nodes = $svelvetNodes;
    edges = $svelvetEdges;
    // if (nodes && edges) init();
  }
</script>

<Svelvet id="my-canvas" TD controls locked trackpadPan edgeStyle="step">
  <Minimap width={innerWidth - 30} height={200} corner={'NW'} slot="minimap" />
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
