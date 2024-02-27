<script lang="ts">
  import type { ITrajectory } from '../types';
  import { Panel } from '@xyflow/svelte';
  import { ChevronDown, Pen } from 'lucide-svelte';

  export let trajectory: ITrajectory;

  let fold = false;

  function foldPanel() {
    fold = !fold;
  }
</script>

{#if trajectory}
  <Panel position="top-left">
    <div class="container">
      <div class="header">
        <div class="title">
          <h1 class={fold ? 'one-line' : ''}>
            {trajectory?.episode_object.name}
          </h1>
          <button>
            <Pen size={24} />
          </button>
        </div>
        <button on:click={foldPanel}>
          <ChevronDown
            size={32}
            style="transition: all 0.15s ease-in;
          {fold ? 'transform: rotate(180deg)' : ''}"
          />
        </button>
      </div>
      <div style={fold ? 'display: none' : 'display: block'} class="body">
        <p>{trajectory?.episode_object.description}</p>
      </div>
      {#if !fold}
        <p class="version">{trajectory?.version}</p>
      {/if}
    </div>
  </Panel>
{/if}

<style scoped>
  .container {
    background-color: #f3f3f3;
    padding: 16px;
    border-radius: 15px;
    position: relative;
    min-width: 320px;
    max-width: 320px;
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
    margin-top: 16px;
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
</style>
