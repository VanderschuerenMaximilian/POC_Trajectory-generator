<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
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
</script>

<div class="colorpicker" style="background-color: {$color};">
  <Handle type="target" position={Position.Left} />
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
  <Handle type="source" position={Position.Right} />
  <Handle type="target" position={Position.Bottom} />
</div>

<style>
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
</style>
