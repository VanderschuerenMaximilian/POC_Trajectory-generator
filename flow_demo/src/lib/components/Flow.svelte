<script lang="ts">
  import {
    nodes as nodesStore,
    edges as edgesStore,
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
    useSvelteFlow,
  } from '@xyflow/svelte';
  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import '@xyflow/svelte/dist/style.css';
  import ColorPickerNode from '$lib/components/nodes/ColorPickerNode.svelte';
  import MainNode from './nodes/MainNode.svelte';
  import ImportantNode from './nodes/ImportantNode.svelte';
  import { onMount } from 'svelte';
  import Extraction from '$lib/utilClasses/Nodes';
  import TrajectroyPanel from './general/TrajectroyPanel.svelte';
  import type { ITrajectory } from './types';
  import OwnStepNode from './nodes/OwnStepNode.svelte';
  import DragAndDropMenu from './general/DragAndDropMenu.svelte';

  const extraction = new Extraction();
  const snapGrid: [number, number] = [25, 25];
  const nodeTypes: NodeTypes = {
    // colorPicker: ColorPickerNode,
    // mainNode: MainNode,
    // importantNode: ImportantNode,
    stepNode: OwnStepNode,
  };

  const { screenToFlowPosition } = useSvelteFlow();
  let items: any = [];
  let trajectory: ITrajectory;
  let connectingId: string;

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
      $nodesStore = steps;
      $edgesStore = stepsEdges;
    } else if (parentNode.type === 'event') {
      extraction.extractOptions(parentNode.options);
      $nodesStore = [];
      $edgesStore = [];
    }
  }

  function onEdgeDrop(event: any) {}

  // function onEdgeDrop(event: MouseEvent | TouchEvent) {
  //   if (!connectingId) return;
  //   const targetIsPane = (event.target as Element).classList.contains(
  //     'svelte-flow__pane'
  //   );
  //   if (targetIsPane) {
  //     const newNodeId = (parseInt(connectingId) + 1).toString();
  //     const newNode: any = {
  //       id: newNodeId,
  //       type: 'stepNode',
  //       data: {
  //         label: `Step ${newNodeId}`,
  //         description: `Step ${newNodeId}`,
  //       },
  //       position: screenToFlowPosition({
  //         // @ts-ignore
  //         x: event?.clientX,
  //         // @ts-ignore
  //         y: event?.clientY,
  //       }),
  //       origin: [0, 0],
  //     };
  //     $nodesStore.push(newNode);
  //     $edgesStore.push({
  //       id: crypto.randomUUID(),
  //       source: connectingId,
  //       target: newNodeId,
  //     });

  //     $nodesStore = [...$nodesStore];
  //     $edgesStore = [...$edgesStore];
  //   }
  // }

  function onDragOver(event: DragEvent) {
    event.preventDefault();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  function onDrop (event: DragEvent) {
    event.preventDefault();

    if (!event.dataTransfer) {
      return null;
    }

    const type = event.dataTransfer.getData('application/svelteflow');

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode: any = {
      id: `${$nodesStore.length + 1}`,
      type,
      position,
      data: { label: `StepNode ${$nodesStore.length + 1}` },
      origin: [0, 0],
    };

    $nodesStore.push(newNode);
    $nodesStore = [...$nodesStore];
  };

  $: getChildren($activeItem);
</script>

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
>
  <!-- on:nodeclick={(e) => console.log(e.detail.node)} -->
  <Controls />
  <Background gap={[20, 20]} variant={BackgroundVariant.Dots} />
  <TrajectroyPanel {trajectory} />
  <DragAndDropMenu />
  <MiniMap />
</SvelteFlow>
