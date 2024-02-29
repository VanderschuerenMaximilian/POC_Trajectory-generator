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
    type Node,
    type NodeTypes,
    useSvelteFlow,
  } from '@xyflow/svelte';
  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import '@xyflow/svelte/dist/style.css';
  import { onMount } from 'svelte';
  import Extraction from '$lib/utilClasses/Nodes';
  import TrajectroyPanel from './general/TrajectroyPanel.svelte';
  import type { ITrajectory } from './types';
  import OwnStepNode from './nodes/OwnStepNode.svelte';
  import DragAndDropMenu from './general/DragAndDropMenu.svelte';

  const extraction = new Extraction();
  const snapGrid: [number, number] = [10, 10];
  const nodeTypes: NodeTypes = {
    stepNode: OwnStepNode,
  };

  const { screenToFlowPosition } = useSvelteFlow();
  let MIN_DISTANCE: number = 550;
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

  // function onEdgeDrop(event: any) {}

  function onEdgeDrop(event: MouseEvent | TouchEvent) {
    if (!connectingId) return;
    const targetIsPane = (event.target as Element).classList.contains(
      'svelte-flow__pane'
    );
    if (targetIsPane) {
      const newNodeId = (parseInt(connectingId) + 1).toString();
      const newNode: any = {
        id: newNodeId,
        type: 'stepNode',
        data: {
          label: `Step ${newNodeId}`,
          description: `Step ${newNodeId}`,
        },
        position: screenToFlowPosition({
          // @ts-ignore
          x: event?.clientX,
          // @ts-ignore
          y: event?.clientY,
        }),
        origin: [0, 0],
      };
      $nodesStore.push(newNode);
      $edgesStore.push({
        id: crypto.randomUUID(),
        source: connectingId,
        target: newNodeId,
      });

      $nodesStore = [...$nodesStore];
      $edgesStore = [...$edgesStore];
    }
  }

  function onDragOver(event: DragEvent) {
    event.preventDefault();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  function onDrop(event: DragEvent) {
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
      id: `${$nodesStore.length}`,
      type,
      position,
      data: { label: `StepNode ${$nodesStore.length + 1}` },
      origin: [0, 0],
    };

    $nodesStore.push(newNode);
    $nodesStore = [...$nodesStore];
  }

  function getClosestEdge(node: Node, nodes: Node[]) {
    const closestNode = nodes.reduce(
      (res, n) => {
        // I am able to force it to connect to the last node in the list but d values are not updated
        if (n.id !== node.id && parseInt(node.id) - 1 === parseInt(n.id)) {
          //@ts-ignore
          const dx = n.computed?.positionAbsolute.x - node.computed?.positionAbsolute.x;
          console.log('dx: ', dx);
          const dy =
            //@ts-ignore
            n.computed?.positionAbsolute.y +
            //@ts-ignore
            n.computed?.height / 2 -
            //@ts-ignore
            (node.computed?.positionAbsolute.y + node.computed?.height / 2);

          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < res.distance && d <= MIN_DISTANCE) {
            res.distance = d;
            res.node = n;
          }
        }

        return res;
      },
      <{ distance: number; node: Node | null }>{
        distance: Number.MAX_VALUE,
        node: null,
      }
    );

    if (!closestNode.node) {
      return null;
    }

    return {
      id: crypto.randomUUID(),
      source: closestNode.node.id,
      target: node.id,
      class: 'temp',
      type: 'step'
    };
  }

  function onNodeDrag({ detail: { node } }: any) {
    console.log('node: ', node);
    const closestEdge = getClosestEdge(node, $nodesStore);

    let edgeAlreadyExists = false;
    $edgesStore.forEach((edge, i) => {
      if (edgeAlreadyExists) {
        return;
      }

      if (closestEdge) {
        // non-temporary edge already exists
        if (
          edge.source === closestEdge.source &&
          edge.target === closestEdge.target
        ) {
          edgeAlreadyExists = true;
          return;
        }

        if (edge.class !== 'temp') {
          return;
        }

        if (
          edge.source !== closestEdge.source ||
          edge.target !== closestEdge.target
        ) {
          $edgesStore[i] = closestEdge; // replace the edge
          edgeAlreadyExists = true;
        }
      } else if (edge.class === 'temp') {
        $edgesStore.splice(i, 1); // remove edge
      }
    });

    if (closestEdge && !edgeAlreadyExists) {
      $edgesStore.push(closestEdge);
    }

    $edgesStore = [...$edgesStore];
  }

  function onNodeDragStop() {
    $edgesStore.forEach((edge) => {
      if (edge.class === 'temp') {
        edge.class = '';
      }
    });
    $edgesStore = [...$edgesStore];
  }

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
  on:nodedrag={onNodeDrag}
  on:nodedragstop={onNodeDragStop}
>
  <!-- on:nodeclick={(e) => console.log(e.detail.node)} -->
  <Controls />
  <Background gap={[20, 20]} variant={BackgroundVariant.Dots} />
  <TrajectroyPanel {trajectory} />
  <DragAndDropMenu />
  <MiniMap />
</SvelteFlow>
