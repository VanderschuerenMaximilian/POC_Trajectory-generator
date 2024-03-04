<script lang="ts">
  import type { IStepNode } from '../nodes/types';
  import Dialog from '../radar-svelete-components/components/Dialog.svelte';
  import type { IDatapoint } from '../types';

  export let dialog: HTMLDialogElement;
  export let datapoint: IDatapoint;
  export let step: IStepNode;
</script>

{#if datapoint}
  <Dialog bind:dialog height="75%" width="75%">
    <h3>Edit {datapoint.name}</h3>
    {JSON.stringify(step)}
  </Dialog>
{/if}
