<script lang="ts">
  import { type NodeProps } from '@xyflow/svelte';
  import TrajectoryHandle from '../handles/TrajectoryHandles.svelte';
  import NodeOptions from './Node';

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
  export let data: any;

  const nodeOptions = new NodeOptions();

  let domain = data.episode_object.concept.domain_name;
  let name = data.episode_object.name;
</script>

{#if data}
  <div
    class="container__node"
    style="background-color: {nodeOptions.colors.trajectory};"
  >
    <h1>{name}</h1>
    <p>Concept: {nodeOptions.capatalizeFirstLetter(domain)}</p>
  </div>
  <TrajectoryHandle />
{/if}