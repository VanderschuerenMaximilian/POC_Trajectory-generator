<!-- <script lang="ts">
  import {
    Handle,
    Position,
    type NodeProps,
    useNodes,
    NodeResizer,
    NodeToolbar,
    useConnection,
    useEdges,
    useHandleConnections,
    useNodesData,
    useNodesInitialized,
    useSvelteFlow,
    useStore,
    useUpdateNodeInternals,
    getIncomers,
    getOutgoers,
  } from '@xyflow/svelte';
  import type { Writable } from 'svelte/store';

  type $$Props = NodeProps;

  export let id: $$Props['id'];
  id;
  export let dragHandle: $$Props['dragHandle'] = undefined;
  dragHandle;
  export let type: $$Props['type'] = undefined;
  type;
  export let selected: $$Props['selected'] = undefined;
  selected;
  export let isConnectable: $$Props['isConnectable'] = undefined;
  isConnectable;
  export let zIndex: $$Props['zIndex'] = undefined;
  zIndex;
  export let width: $$Props['width'] = undefined;
  width;
  export let height: $$Props['height'] = undefined;
  height;
  export let dragging: $$Props['dragging'];
  dragging;
  export let targetPosition: $$Props['targetPosition'] = undefined;
  targetPosition;
  export let sourcePosition: $$Props['sourcePosition'] = undefined;
  sourcePosition;
  export let positionAbsoluteX: $$Props['positionAbsoluteX'] | undefined =
    undefined;
  positionAbsoluteX;
  export let positionAbsoluteY: $$Props['positionAbsoluteY'] | undefined =
    undefined;
  positionAbsoluteY;

  export let data: { color: Writable<string> };

  const { color } = data;

  //   const info = useNodes();
  //   const connection = useConnection();
  //   $: console.log($connection)

  // does the same as checking the writable of edges in Flow.svelte
  //   const edges = useEdges();
  //   $: console.log($edges);

  //   TODO: zoek uit wat dit doet
  //   const connections = useHandleConnections({
  //     nodeId: nodeId,
  //     type: nodeType,
  //     id: 'left-handle',
  //   });
  //   $: console.log($connections);

  // gets info of 1 node, is the same as passing down the node data from Flow.svelte to this component
  //   const nodeData = useNodesData(nodeId);
  //   $: console.log($nodeData);

  // can be used as a condition to check if all nodes are initialized
  //   const useNodesInitilized = useNodesInitialized();
  //   $: console.log($useNodesInitilized);

  //   general useful hooks from Svelte Flow
  const { screenToFlowPosition, zoomIn, setCenter, fitView } = useSvelteFlow();
  //   setCenter(0, 0);
  //   could be handy to use this to center the view on a node
  //   fitView();

  $: if (selected) fitView({ nodes: [{ id: id }] });

  //   for advanced use cases, check the docs for more info
  //   const { connectionMode } = useStore();
  //   $: console.log($connectionMode);

  //   when changing the position of handles, you have to update the node internals aswell
  //   const updateNodeInternals = useUpdateNodeInternals();
  //   updateNodeInternals(id)

  //   I don't know what this does
  //   const connectedNodes: any = [];
  //   const connectedEdges: any = [];

  //   const incomers = getOutgoers(
  //     {
  //       id: id,
  //       position: {
  //         x: positionAbsoluteX ? positionAbsoluteX : 0,
  //         y: positionAbsoluteY ? positionAbsoluteY : 0,
  //       },
  //       data: data,
  //     },
  //     connectedNodes,
  //     connectedEdges
  //   );

  //   function showIncomers() {
  //     console.log(incomers);
  //   }
</script> -->

<!-- CAREFUL: When using multiple "target" handles, after you to connected to either handle, 
the edge will automatically to the heigest "target" handle. -->

<!-- <NodeResizer minHeight={47} isVisible={selected} />
<div class="colorpicker" style="background-color: {$color};">
  <NodeToolbar position={Position.Top} align={'start'}>
    <button>delete</button>
    <button>edit</button>
  </NodeToolbar>
  <Handle
    id="left-handle"
    type="target"
    position={Position.Left}
    onconnect={() => {
      console.log('connected left');
      //   showIncomers();
    }}
  />
  <div>
    color: <strong>{$color}</strong>
  </div>
  <input
    class="nodrag"
    type="color"
    on:input={(evt) => {
      // @ts-ignore
      data.color.set(evt.target?.value);
    }}
    value={$color}
  />
  <Handle id="right-handle" type="source" position={Position.Right} />
  <Handle
    id="bottom-handle"
    type="target"
    position={Position.Bottom}
    onconnect={() => {
      console.log('connected bottom');
    }}
  />
</div>

<style scoped>
  .colorpicker {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
  }

  input {
    margin-left: 10px;
  }

  .nodrag {
    user-select: none;
  }
</style> -->
