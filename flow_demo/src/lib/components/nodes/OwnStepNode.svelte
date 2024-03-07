<script lang="ts">
  import {
    NodeToolbar,
    type NodeProps,
    Position,
    useSvelteFlow,
    Handle,
    NodeResizeControl,
    useHandleConnections,
  } from '@xyflow/svelte';
  import { ChevronDown, Plus } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import NodeCustomization from './Node';
  import Datapoint from '../general/Datapoint.svelte';
  import EditStepDialog from '../dialogs/EditStepDialog.svelte';
  import DeleteStepDialog from '../dialogs/DeleteStepDialog.svelte';
  import AddDatapointDialog from '../dialogs/AddDatapointDialog.svelte';
  import { edges as edgesStore } from '$lib/store';

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
  // TODO: make interfaces for the own/custom nodes
  export let data: any;
  const nodeCustomization = new NodeCustomization();
  let foldStep = false;
  let foldDatapoint = false;
  let node: HTMLDivElement;
  let editDialog: HTMLDialogElement;
  let deleteDialog: HTMLDialogElement;
  let addDatapointDialog: HTMLDialogElement;
  let initalWidth: number;
  let initialHeight: number;

  onMount(() => {
    nodeCustomization.assignKeyboardFeatures(id, node, fitView);
  });

  const { fitView } = useSvelteFlow();
  const sourceConnections = useHandleConnections({
    nodeId: id,
    type: 'source',
  });
  const targetConnections = useHandleConnections({
    nodeId: id,
    type: 'target',
  });

  function foldChilds() {
    foldStep = !foldStep;
  }

  function foldDatapoints() {
    foldDatapoint = !foldDatapoint;
  }

  function editStep() {
    editDialog.showModal();
  }

  function deleteStep() {
    deleteDialog.showModal();
  }

  function addDatapoint() {
    addDatapointDialog.showModal();
  }

  // TODO: refactor so each node could use this function
  function validateConnections(currentConnections: any[]) {
    if (!currentConnections[1]) return;
    const notValidConnection =
      $edgesStore[$edgesStore.length - 1].id === currentConnections[1].edgeId;
    if (notValidConnection) {
      $edgesStore = $edgesStore.slice(0, $edgesStore.length - 1);
    }
  }

  $: validateConnections($sourceConnections);
  $: validateConnections($targetConnections);
  $: if (node)
    (initalWidth = node.clientWidth), (initialHeight = node.clientHeight);
</script>

{#if data}
  <EditStepDialog bind:editDialog step={data} />
  <DeleteStepDialog bind:deleteDialog step={data} />
  <AddDatapointDialog bind:addDatapointDialog step={data} />
{/if}

<NodeToolbar position={Position.Top} align={'start'}>
  <div class="toolbar__container">
    <button class="toolbar__button" on:click={editStep}>edit</button>
    <button class="toolbar__button" on:click={deleteStep}>delete</button>
  </div>
</NodeToolbar>
<!-- TODO: make this responsive in another way -->
{#key initalWidth || initialHeight}
  {#if selected}
    <NodeResizeControl
      nodeId={id}
      minWidth={initalWidth}
      minHeight={initialHeight}
      position="bottom-right"
      style="width: 10px; height: 10px; background-color: #000000; cursor: nwse-resize; border-radius: 2px;
      transform: translate(3px)"
    />
  {/if}
{/key}
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  bind:this={node}
  on:dblclick={() => {nodeCustomization.zoomIn(id, fitView)}}
  class="container"
  style={selected ? 'outline: 2px solid #555555' : 'outline:none'}
>
  {#if id !== '0'}
    <Handle id="left" type="target" position={Position.Left} />
  {/if}
  <Handle id="right" type="source" position={Position.Right} />
  <div class="header">
    <h1 class="title">{data?.step?.name}</h1>
    <button class="header__button" on:click={foldChilds}>
      <ChevronDown
        size="24"
        color="white"
        style="{foldStep
          ? 'transform: rotate(180deg);'
          : 'transform: rotate(0);'} transition: all 0.15s ease-in;"
      />
    </button>
  </div>
  <div class="body__container" style={foldStep ? 'display: none' : ''}>
    <div class="info__container">
      <div>
        <p>description:</p>
        <p>domain:</p>
        <p>start date:</p>
        <p>end date:</p>
        <label for="{id}-required">
          <span>required</span>
          <input type="checkbox" id="{id}-required" disabled />
        </label>
      </div>
      <div>
        <p>{data?.step?.description}</p>
        <p>{data?.step?.concept.domain_name}</p>
        <p>{data?.step?.date_range_before}</p>
        <p>{data?.step?.date_range_after}</p>
        <label for="{id}-repeat">
          <span>repeat</span>
          <input type="checkbox" id="{id}-repeat" disabled />
        </label>
      </div>
    </div>
    <div class="datapoints__container">
      <div class="datapoints__header">
        <div class="datapoints__title__container">
          <h2 class="subtitle">Datapoints</h2>
          <button class="body__button" on:click={addDatapoint}>
            <Plus size="16" />
          </button>
        </div>
        <button class="body__button" on:click={foldDatapoints}>
          <ChevronDown
            size="24"
            style="{foldDatapoint
              ? 'transform: rotate(180deg);'
              : 'transform: rotate(0);'} transition: all 0.15s ease-in;"
          />
        </button>
      </div>
      <div style={foldDatapoint ? 'display: none' : ''}>
        {#if data?.step?.datapoints && data?.step?.datapoints.length > 0}
          {#each data?.step?.datapoints as datapoint, i}
            <Datapoint {datapoint} step={data?.step} />
          {/each}
        {:else}
          There are no datapoints.
        {/if}
      </div>
    </div>
  </div>
</div>

<style scoped>
  button {
    background: inherit;
    border: none;
    border-radius: 15px;
    padding: 0;
    cursor: pointer;
    height: fit-content;
    margin: 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease-in;
  }

  p,
  label,
  div {
    font:
      12px Arial,
      sans-serif;
    font-weight: 500;
  }

  p {
    max-width: 200px;
  }

  .header__button:hover {
    background-color: #8d8d8d;
  }

  .body__button:hover {
    background-color: #9b9b9b;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 320px;
    background-color: #d9d9d9;
    border-radius: 15px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding-bottom: 12px;
    height: 95%;
    text-align: start;
  }

  .header {
    padding: 4px 0px;
    margin: 0px;
    width: 100%;
    background-color: #9b9b9b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.25);
  }

  .title {
    margin: 0;
    padding-left: 8px;
    font:
      16px Arial,
      sans-serif;
    font-weight: 600;
    color: white;
    line-height: 1.5rem;
    max-width: 220px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .subtitle {
    margin: 0;
    font:
      14px Arial,
      sans-serif;
    font-weight: 600;
  }

  .body__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .body__container:hover {
    cursor: default;
  }

  .info__container {
    display: flex;
    justify-content: space-between;
    padding: 0px 8px;
  }

  .info__container div {
    min-width: 110px;
  }

  .datapoints__container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0px 8px;
  }

  .datapoints__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .datapoints__title__container {
    display: flex;
    align-items: center;
  }

  .toolbar__container {
    display: flex;
  }

  .toolbar__button {
    margin: 0 8px;
    padding: 8px;
    border: 0px solid transparent;
    border-radius: 5px;
    background: #b0b0b0;
    cursor: pointer;
    color: white;
  }

  .toolbar__button:hover {
    background-color: #8d8d8d;
  }
</style>
