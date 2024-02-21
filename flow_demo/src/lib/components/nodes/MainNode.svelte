<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  import { nodes } from '$lib/store';

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

  export let data: { label: string };

  const { label } = data;

  let fold = false;

  function foldChilds() {
    // console.log($nodes);
    // console.log('Let all childs slide under the main node');
    nodes.update((n) => {
      return n.map((node) => {
        if (node.parentNode === id) {
          return {
            ...node,
            position: {
              x: -150,
              y: 3,
            },
          };
        }
        return node;
      });
    });
  }

  function unfoldChilds() {
    const childs = $nodes.filter((node) => node.parentNode === id);
    if (!childs.length) return;
    nodes.update((n) => {
      return n.map((node) => {
        if (node.parentNode === id) {
          return {
            ...node,
            position: {
              x: node.data.originalPosition.x,
              y: node.data.originalPosition.y,
            },
          };
        }
        return node;
      });
    });
  }

  $: {
    const childs = $nodes.filter((node) => node.parentNode === id);
    if (fold && childs.length > 0) {
      foldChilds();
      console.log('fold node: ', id);
    } else if (!fold && childs.length > 0) {
      unfoldChilds();
      console.log('unflod node: ', id);
    }
  }
</script>

<div class="container {selected ? 'selected' : 'not-selected'}">
  <button on:click={() => (fold = !fold)}>
    {#if fold}
      open
    {:else}
      close
    {/if}
  </button>
  <h1>{label}</h1>
  {#if id !== '1'}
    <Handle id="top" type="target" position={Position.Top} />
  {/if}
  <Handle id="right" type="source" position={Position.Right} />
  {#if id !== '1'}
    <Handle id="bottom" type="target" position={Position.Bottom} />
  {:else}
    <Handle id="bottom" type="source" position={Position.Bottom} />
  {/if}
</div>

<style scoped>
  .container {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    border-radius: 5px;
    padding: 10px;
  }

  .selected {
    outline: 2px solid #555555;
  }

  .not-selected {
    outline: none;
  }

  h1 {
    margin: 0;
    font-size: 1rem;
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
