<script lang="ts">
  import Flow from '$lib/components/Flow.svelte';
  import Header from '$lib/components/general/Header.svelte';
  import { SvelteFlowProvider } from '@xyflow/svelte';
  import { onMount } from 'svelte';
  import IDBJson from '$lib/data/IBD_Crohn_Disease.json';
  import { trajectory, items as itemsStore } from '$lib/store';
  import type { IPhase, IEvent } from '$lib/components/types';
  import JsonExtraction from '$lib/utilClasses/Json';

  const extraction = new JsonExtraction();
  let items: (IPhase | IEvent)[] = [];

  onMount(async () => {
    const { trajectory: trajectoryObj, items: PhasesAndEvents } =
      await extraction.getTrajectory(IDBJson);
    trajectory.set(trajectoryObj);
    itemsStore.set(PhasesAndEvents);
    items = PhasesAndEvents;
  });
</script>

<main>
  <!-- <Header {JSON.stringify(itemsStore)} /> -->
  <Header {items} />
  <section>
    <SvelteFlowProvider>
      <Flow />
    </SvelteFlowProvider>
  </section>
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
