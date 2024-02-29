<script lang="ts">
  import type { NodeProps } from '@xyflow/svelte';
  import NodeOptions from './Node';
  import StepHandles from '../handles/StepHandles.svelte';

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
  console.log(data);
  let domain = data.step.concept.domain_name;
  let name = data.step.name;
</script>

{#if data}
  <div
    class="container__node"
    style="background-color: {nodeOptions.colors.step};"
  >
    <h1>{nodeOptions.capatalizeFirstLetter(name)}</h1>
    <p>Concept: {nodeOptions.capatalizeFirstLetter(domain)}</p>
  </div>
  <StepHandles />
{/if}
