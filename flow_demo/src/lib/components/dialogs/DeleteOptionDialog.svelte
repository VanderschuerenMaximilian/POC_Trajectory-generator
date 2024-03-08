<script lang="ts">
  import type { IOptionNode } from '../types';
  import Dialog from '../radar-svelete-components/components/Dialog.svelte';

  export let option: IOptionNode;
  export let deleteDialog: HTMLDialogElement;
</script>

<Dialog bind:dialog={deleteDialog} height="30%" width="35%">
  {#if option}
    <h3>Delete {option.option.name}?</h3>
    <div>
      <button on:click={() => deleteDialog.close()}>Cancel</button>
      <button on:click={() => deleteDialog.close()}>Delete</button>
    </div>
  {/if}
</Dialog>
