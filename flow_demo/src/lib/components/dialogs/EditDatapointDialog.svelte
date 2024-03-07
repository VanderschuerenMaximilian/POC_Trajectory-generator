<script lang="ts">
  import type { IStepNode } from '../types';
  import Dialog from '../radar-svelete-components/components/Dialog.svelte';
  import type { IDatapointJSON } from '../../types';

  export let dialog: HTMLDialogElement;
  export let datapoint: IDatapointJSON;
  export let step: IStepNode;
</script>

{#if datapoint}
  <Dialog bind:dialog height="75%" width="75%">
    <h3>Edit {datapoint.name}</h3>
    {JSON.stringify(step)}
  </Dialog>
{/if}
