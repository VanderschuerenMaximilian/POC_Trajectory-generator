<script lang="ts">
  import Flow from '$lib/components/Flow.svelte';
  import Header from '$lib/components/general/Header.svelte';
  import { SvelteFlowProvider } from '@xyflow/svelte';
  import { onMount } from 'svelte';
  import IDBJson from '$lib/data/IBD_Crohn_Disease.json';
  import {
    trajectory as trajectoryStore,
    items as itemsStore,
    activeItem,
  } from '$lib/store';
  import type { IPhase, IEvent } from '$lib/components/types';
  import JsonExtraction from '$lib/utilClasses/Json';

  const extraction = new JsonExtraction();
  let items: (IPhase | IEvent)[] = [];

  onMount(async () => {
    const { trajectory: trajectoryObj, items: PhasesAndEvents } =
      await extraction.getTrajectory(IDBJson);
    trajectoryStore.set(trajectoryObj);
    itemsStore.set(PhasesAndEvents);
    items = PhasesAndEvents;
  });
</script>

<main>
  <div style="opacity: 0;">
    <Header {items} />
  </div>
  <Header {items} />
  <!-- TODO: change the responsiveness not by key but by an different method -->
  {#key $activeItem}
    <section>
      <SvelteFlowProvider>
        <Flow />
      </SvelteFlowProvider>
    </section>
  {/key}
</main>

<style scoped>
  main {
    min-height: 90vh;
  }

  section {
    height: 68vh;
  }
</style>
