<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import Dialog from '../radar-svelete-components/components/Dialog.svelte';
  import type { ITrajectoryObject } from '../../types';

  export let trajectoryObject: ITrajectoryObject;
  export let dialog: HTMLDialogElement;

  // let editObj: ITrajectoryObj;

  // onMount(() => {
  //   editObj = { ...trajectoryObj };
  // });

  const dispatch = createEventDispatcher();

  function save() {
    // trajectoryObj = { ...editObj };
    dialog.close();
  }

  function cancel() {
    dialog.close();
  }
</script>

<Dialog bind:dialog height="65%" width="50%">
  {#if trajectoryObject}
    <div class="container">
      <h3 class="title">{trajectoryObject.episode_object.name}</h3>
      <form class="content">
        <div class="form-group">
          <label for="id">Id*</label>
          <input type="text" id="id" bind:value={trajectoryObject.id} />
        </div>
        <div class="form-group">
          <label for="version">Version Number*</label>
          <input type="text" id="version" bind:value={trajectoryObject.version_number} />
        </div>
        <div class="form-group">
          <label for="domain">Domain*</label>
          <select id="domain" bind:value={trajectoryObject.episode_object.concept.domain_name} />
        </div>
        <div class="form-group">
          <label for="name">Name*</label>
          <input type="text" id="name" bind:value={trajectoryObject.episode_object.name} />
        </div>
        <div class="form-group">
          <label for="description">Description*</label>
          <textarea id="description" bind:value={trajectoryObject.episode_object.description} />
        </div>
        <button on:click={cancel}> Cancel </button>
        <button on:click={save}> Save </button>
      </form>
    </div>
  {/if}
</Dialog>

<style scoped>
  button {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #e0e0e0;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font:
      1rem Arial,
      sans-serif;
    height: 100%;
  }

  .title {
    margin-bottom: 3rem;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem 4rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group:nth-child(5) {
    grid-column: span 2;
  }

  .form-group input,
  textarea,
  select {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    font-family: Arial, sans-serif;
  }
</style>
