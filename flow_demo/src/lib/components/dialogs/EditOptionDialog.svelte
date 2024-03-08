<script lang="ts">
  import type { IOptionNode } from '../types';
  import Dialog from '../radar-svelete-components/components/Dialog.svelte';

  export let option: IOptionNode;
  export let editDialog: HTMLDialogElement;
</script>

<Dialog bind:dialog={editDialog} height="75%" width="75%">
  {#if option}
    <h3>{option.option.name}</h3>
  {/if}
</Dialog>
