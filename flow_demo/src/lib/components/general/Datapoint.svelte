<script lang="ts">
  import EditDatapointDialog from '../dialogs/EditDatapointDialog.svelte';
  import type { IStepNode } from '../nodes/types';
  import type { IDatapoint } from '../types';

  export let step: IStepNode;
  export let datapoint: IDatapoint;

  let dialog: HTMLDialogElement;

  function openDialog() {
    dialog.showModal();
  }
</script>

{#if datapoint}
  <EditDatapointDialog bind:dialog {datapoint} {step}/>
{/if}

<button on:click={openDialog}>
  <span>{datapoint.name}</span>
</button>

<style scoped>
  button {
    background: none;
    background-color: #a5a5a5;
    border: none;
    border-radius: 5px;
    padding: 8px 4px;
    cursor: pointer;
    outline: inherit;
    width: 100%;
    height: 100%;
    transition: all 0.15s ease-in;
  }

  button:hover {
    background-color: #8d8d8d;
  }

  span {
    font:
      12px Arial,
      sans-serif;
    font-weight: 600;
    color: white;
  }
</style>
