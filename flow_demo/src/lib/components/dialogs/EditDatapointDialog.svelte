<script lang="ts">
  import Dialog from '../radar-svelete-components/components/Dialog.svelte';

  export let dialog: HTMLDialogElement;
  export let datapoint: any;
  export let step: any;
</script>

{#if datapoint}
  <Dialog bind:dialog height="75%" width="75%">
    <h3>Edit {datapoint.name}</h3>
  </Dialog>
{/if}
