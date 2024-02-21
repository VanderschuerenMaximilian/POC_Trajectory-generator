<script lang="ts">
  import {
    Handle,
    Position,
    type NodeProps,
    useSvelteFlow,
    NodeToolbar,
  } from '@xyflow/svelte';

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

  export let data: {
    label: string;
    originalPosition: { x: number; y: number };
  };

  const { label } = data;

  const { fitView } = useSvelteFlow();

  $: if (selected) fitView({ nodes: [{ id: id }] });
</script>

<NodeToolbar position={Position.Top} align={'start'}>
  <button>delete</button>
  <button>edit</button>
</NodeToolbar>
<div class="container">
  <Handle id="left" type="target" position={Position.Left} />
  <h1>{label}</h1>
  <Handle id="right" type="source" position={Position.Right} />
</div>

<style scoped>
  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgb(165, 165, 165);
    border-radius: 5px;
    padding: 10px;
  }

  h1 {
    margin: 0;
    font-size: 0.7rem;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    margin: 0;
    padding: 8px;
    border: 0px solid transparent;
    border-radius: 5px;
    background: #b0b0b0;
    cursor: pointer;
    color: white;
  }

  button:hover {
    background: #a0a0a0;
    transition-duration: 0.2s;
  }
</style>
