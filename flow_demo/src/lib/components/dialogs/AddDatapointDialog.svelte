<script lang="ts">
  import Dialog from '../radar-svelete-components/components/Dialog.svelte';

  export let addDatapointDialog: HTMLDialogElement;
  export let step: any;
</script>

<Dialog bind:dialog={addDatapointDialog} height="75%" width="75%">
  <h3>Add a datapoint for {step.label}</h3>
</Dialog>
