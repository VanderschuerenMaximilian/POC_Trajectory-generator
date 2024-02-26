<script lang="ts">
  import Flow from '$lib/components/Flow.svelte';
  import Header from '$lib/components/general/Header.svelte';
  import { SvelteFlowProvider } from '@xyflow/svelte';
  import { onMount } from 'svelte';
  import trajectoryJson from '$lib/data/test.json';
  import IDBJson from '$lib/data/IBD_Crohn_Disease.json';
  import { trajectory, items as itemsStore } from '$lib/store';
  import type { ITrajectory, IPhase, IEvent } from '$lib/components/types';

  let items: (IPhase | IEvent)[] = [];

  onMount(async () => {
    const { trajectory: trajectoryObj, items: PhasesAndEvents } =
      await getTrajectory(IDBJson);
    trajectory.set(trajectoryObj);
    itemsStore.set(PhasesAndEvents);
    items = PhasesAndEvents;
  });

  async function getTrajectory(
    json: any
  ): Promise<{ trajectory: ITrajectory; items: (IPhase | IEvent)[] }> {
    const trajectory = json.trajectory;
    return {
      trajectory: {
        id: trajectory.id,
        episode_object: trajectory.episode_object,
        version: trajectory.version_number,
      },
      items: trajectory.items,
    };
  }
</script>

<main>
  <!-- <Header {JSON.stringify(itemsStore)} /> -->
  <Header {items} />
  <!-- <section>
    <SvelteFlowProvider>
      <Flow />
    </SvelteFlowProvider>
  </section> -->
</main>

<style scoped>
  main {
    min-height: 90vh;
  }

  section {
    height: 80vh;
    border: 1px solid black;
  }
</style>
