<script lang="ts">
  import { Node, Svelvet, Minimap, Controls } from 'svelvet';
  import TrajectoryNode from '$lib/components/nodes/svelvet/TrajectoryNode.svelte';
  import PhaseNode from '$lib/components/nodes/svelvet/PhaseNode.svelte';
  import EventNode from '$lib/components/nodes/svelvet/EventNode.svelte';
  import {
    svelvetNodes,
    svelvetEdges,
  } from '$lib/store';
  import { NodeTypes } from '$lib/utilClasses/SvelvetNodes';

  let nodes: any = [];
  let edges: any = [];
//   let innerWidth = window.innerWidth;

  $: {
    nodes = $svelvetNodes;
    edges = $svelvetEdges;
  }
</script>

<Svelvet
  id="my-canvas"
  TD
  controls
  locked
  trackpadPan
  edgeStyle="step"
  >
  <!-- on:edgeDrop={(e) => console.log('edgeDrop: ', e.detail)}
  on:connection={(e) => console.log('connection: ', e.detail)} -->
  <Minimap 
    width={innerWidth - 30}
    height={200}
    corner={"NW"}
    slot="minimap"
  />
    {#if nodes}
        {#each nodes as node, i}
            {#if node.type === NodeTypes.trajectory}
                <TrajectoryNode {node} />
                {:else if node.type === NodeTypes.phase}
                <PhaseNode {node} />
                {:else if node.type === NodeTypes.event}
                <EventNode {node} />
            {/if}
        {/each}
    {/if}
</Svelvet>
