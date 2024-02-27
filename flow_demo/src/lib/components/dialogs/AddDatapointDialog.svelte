<script lang="ts">
  import type { IStepNode } from '../nodes/types';
  import Dialog from '../radar-svelete-components/components/Dialog.svelte';

  export let addDatapointDialog: HTMLDialogElement;
  export let step: IStepNode;
</script>

<Dialog bind:dialog={addDatapointDialog} height="75%" width="75%">
  <h3>Add a datapoint for {step.label}</h3>
</Dialog>
