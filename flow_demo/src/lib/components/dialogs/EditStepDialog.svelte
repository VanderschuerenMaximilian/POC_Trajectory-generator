<script lang="ts">
  import Dialog from '../radar-svelete-components/components/Dialog.svelte';

  export let step: any;
  export let editDialog: HTMLDialogElement;
</script>

<Dialog bind:dialog={editDialog} height="75%" width="75%">
  {#if step}
    <h3>{step.label}</h3>
  {/if}
</Dialog>
