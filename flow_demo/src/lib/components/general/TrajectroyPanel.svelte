<script lang="ts">
  import type { ITrajectoryObject } from '../../types';
  import { Panel } from '@xyflow/svelte';
  import { ChevronLeft, Pen } from 'lucide-svelte';
  import EditTrajectoryDialog from '../dialogs/EditTrajectoryDialog.svelte';

  export let trajectory: ITrajectoryObject;

  let fold = false;
  let dialog: HTMLDialogElement;

  function foldPanel() {
    fold = !fold;
  }

  function editTrajectory() {
    dialog.showModal();
  }
</script>

{#if trajectory}
  <EditTrajectoryDialog bind:dialog trajectoryObject={trajectory} />

  <Panel position="top-left">
    <div
      class="container"
      style="transition: all 0.35s ease-out; {fold
        ? 'min-width: 0px; width: 0px; padding: 0px; margin-left: 16px;'
        : 'min-width: 300px; width: fit-content;'}"
    >
      {#if !fold}
        <div class="header">
          <div class="title">
            <h1 class={fold ? 'one-line' : ''}>
              {trajectory?.episode_object.name}
            </h1>
            <button on:click={editTrajectory}>
              <Pen size={24} />
            </button>
          </div>
        </div>
        <div class="body">
          <p>{trajectory?.episode_object.description}</p>
        </div>
        <p class="version">{trajectory?.version_number}</p>
      {/if}
      <button on:click={foldPanel} class="fold__button">
        <ChevronLeft
          size={32}
          style="transition: all 0.15s ease-in;
          {fold ? 'transform: rotate(180deg)' : ''}"
        />
      </button>
    </div>
  </Panel>
{/if}

<style scoped>
  h1,
  p {
    margin: 0;
  }

  button {
    background: inherit;
    border: none;
    border-radius: 25px;
    padding: 2px;
    cursor: pointer;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button:hover {
    background-color: #8d8d8d;
  }

  .container {
    background-color: #f3f3f3;
    padding: 12px;
    border-radius: 15px;
    position: relative;
    min-width: 300px;
    max-width: 300px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .title button {
    padding: 6px;
  }

  .body {
    margin-top: 8px;
    min-height: 50px;
    max-width: 250px;
    color: #686868;
  }

  .version {
    position: absolute;
    bottom: 8px;
    right: 12px;
    font-size: 0.8rem;
    color: #686868;
  }

  .one-line {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px;
  }

  .fold__button {
    position: absolute;
    top: 35%;
    right: -16px;
    padding: 4px;
    background-color: #f5f5f5;
    border-radius: 50px;
    box-shadow: 0 0 5px 0 #00000033;
    transition: all 0.15s ease-in;
  }
</style>
