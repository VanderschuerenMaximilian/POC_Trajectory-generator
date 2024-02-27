<script lang="ts">
  import type { IStepNode } from '../nodes/types';
  import Dialog from '../radar-svelete-components/components/Dialog.svelte';

  export let step: IStepNode;
  export let editDialog: HTMLDialogElement;
</script>

<Dialog bind:dialog={editDialog} height="75%" width="75%">
  {#if step}
    <h3>{step.label}</h3>
  {/if}
</Dialog>
