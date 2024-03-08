<script lang="ts">
  import {
    nodes as nodesStore,
    edges as edgesStore,
    activeCarouselItemName,
    trajectory as trajectoryStore,
    carouselData as carouselDataStore,
  } from '$lib/store';
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    type NodeTypes,
    useSvelteFlow,
  } from '@xyflow/svelte';
  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import '@xyflow/svelte/dist/style.css';
  import { onMount } from 'svelte';
  import FlowMethods from '$lib/utilClasses/FlowMethods';
  import TrajectroyPanel from './general/TrajectroyPanel.svelte';
  import type { ITrajectoryObject } from './../types';
  import OwnStepNode from './nodes/OwnStepNode.svelte';
  import OwnOptionNode from './nodes/OwnOptionNode.svelte';
  import DragAndDropMenu from './general/DragAndDropMenu.svelte';
  import ElkExtraction from '$lib/utilClasses/ElkNodes';

  const elkExtraction = new ElkExtraction();
  const flowMethods = new FlowMethods();
  const snapGrid: [number, number] = [10, 10];
  const nodeTypes: NodeTypes = {
    ownStepNode: OwnStepNode,
    ownOptionNode: OwnOptionNode,
  };
  const { screenToFlowPosition, setCenter, setZoom } = useSvelteFlow();

  let trajectory: ITrajectoryObject;
  let connectingId: string;

  onMount(() => {
    trajectory = $trajectoryStore;
  });

  async function getData(activeItemName: string) {
    // @ts-expect-error
    const nodes = $carouselDataStore[activeItemName]?.nodes;
    // @ts-expect-error
    const edges = $carouselDataStore[activeItemName]?.edges;
    const { nodes: elkNodes, edges: elkEdges } =
      await elkExtraction.getBoxLayout(nodes, edges);
    // @ts-expect-error
    $nodesStore = elkNodes;
    // @ts-expect-error
    $edgesStore = elkEdges;
    // const middleNode = Math.floor($nodesStore.length / 2);
    // setCenter(
    //   $nodesStore[middleNode].position.x,
    //   $nodesStore[middleNode].position.y
    // );
    // setZoom(0.5);
  }

  function onEdgeDrop(event: MouseEvent | TouchEvent) {
    const result = flowMethods.onEdgeDrop(
      event,
      connectingId,
      $nodesStore.length,
      $activeCarouselItemName,
      screenToFlowPosition
    );
    if (!result) return;
    $nodesStore.push(result.newNode);
    $edgesStore.push(result.newEdge);
  }

  function onDragOver(event: DragEvent) {
    event = flowMethods.onDragOver(event) as DragEvent;
  }

  function onDrop(event: DragEvent) {
    const newNode = flowMethods.onDrop(
      event,
      $nodesStore.length,
      $activeCarouselItemName,
      screenToFlowPosition
    );
    $nodesStore.push(newNode);
  }

  function onNodeDrag({ detail: { node } }: any) {
    const edges = flowMethods.onNodeDrag(node, $nodesStore, $edgesStore);
    $edgesStore = [...edges];
  }

  function onNodeDragStop() {
    const edges = flowMethods.onNodeDragStop($edgesStore);
    $edgesStore = [...edges];
  }

  $: getData($activeCarouselItemName);
</script>

{#key $activeCarouselItemName}
  <SvelteFlow
    nodes={nodesStore}
    edges={edgesStore}
    {nodeTypes}
    {snapGrid}
    fitView={true}
    onconnectstart={(_, { nodeId }) => {
      if (nodeId) connectingId = nodeId;
    }}
    onconnectend={onEdgeDrop}
    on:dragover={onDragOver}
    on:drop={onDrop}
    on:nodedrag={onNodeDrag}
    on:nodedragstop={onNodeDragStop}
    nodesDraggable={true}
  >
    <Controls />
    <Background gap={[20, 20]} variant={BackgroundVariant.Dots} />
    <TrajectroyPanel {trajectory} />
    <DragAndDropMenu />
    <MiniMap />
  </SvelteFlow>
{/key}
