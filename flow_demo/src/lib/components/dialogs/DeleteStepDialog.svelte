<script lang="ts">
  import type { IStepNode } from '../types';
  import Dialog from '../radar-svelete-components/components/Dialog.svelte';

  export let step: IStepNode;
  export let deleteDialog: HTMLDialogElement;
</script>

<Dialog bind:dialog={deleteDialog} height="30%" width="35%">
  {#if step}
    <h3>Delete {step}?</h3>
    <div>
      <button on:click={() => deleteDialog.close()}>Cancel</button>
      <button on:click={() => deleteDialog.close()}>Delete</button>
    </div>
  {/if}
</Dialog>
