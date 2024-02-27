<script lang="ts">
  import Dialog from '../radar-svelete-components/components/Dialog.svelte';

  export let trajectoryObj: any;
  export let dialog: HTMLDialogElement;
</script>

<Dialog bind:dialog height="90%" width="90%">
  {#if trajectoryObj}
    <h3 class="title">{trajectoryObj.title}</h3>
  {/if}
</Dialog>
