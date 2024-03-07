<script lang="ts">
  import type { IStepNode } from '../types';
  import Dialog from '../radar-svelete-components/components/Dialog.svelte';

  export let step: IStepNode;
  export let editDialog: HTMLDialogElement;
</script>

<Dialog bind:dialog={editDialog} height="75%" width="75%">
  {#if step}
    <h3>{step}</h3>
  {/if}
</Dialog>
