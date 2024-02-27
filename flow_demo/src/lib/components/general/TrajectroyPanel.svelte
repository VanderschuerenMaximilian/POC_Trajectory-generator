<script lang="ts">
  import type { ITrajectory } from '../types';
  import { Panel } from '@xyflow/svelte';

  export let trajectory: ITrajectory;
</script>

{#if trajectory}
    <Panel position="top-left">
    <div>
        <h1>{trajectory?.episode_object.name}</h1>
        <p>{trajectory?.episode_object.description}</p>
    </div>
    </Panel>
{/if}

<style scoped>
  div {
    background-color: #f3f3f3;
    padding: 16px;
    border-radius: 15px;
  }

  h1,
  p {
    margin: 0;
  }
</style>
