<script lang="ts">
  import type { NodeProps } from '@xyflow/svelte';
  import EventHandles from '../handles/EventHandles.svelte';
  import { TrajectoryColors } from '$lib/enum';
  import DefaultNode from './DefaultNode.svelte';
  import type { IEventNode } from '../types';

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
  export let data: IEventNode;

  let typeOfObject = data.event.type;
  let name = data.event.name;

  $: info = { name, typeOfObject };
</script>

{#if data}
  <DefaultNode color={TrajectoryColors.event} {info} />
  <EventHandles />
{/if}