<script lang="ts">
  import Flow from '$lib/components/Flow.svelte';
  import Header from '$lib/components/general/Header.svelte';
  import { SvelteFlowProvider } from '@xyflow/svelte';
  import { onMount } from 'svelte';
  import IDBJson from '$lib/data/IBD_Crohn_Disease.json';
  import {
    trajectory as trajectoryStore,
    items as itemsStore,
    activeCarouselItemName,
  } from '$lib/store';
  import type { IMainItemsJSON } from '$lib/types';
  import JsonExtraction from '$lib/utilClasses/Json';

  const extraction = new JsonExtraction();
  let items: IMainItemsJSON = [];

  onMount(async () => {
    const { trajectoryObject: trajectoryObj, items: PhasesAndEvents } =
      await extraction.getTrajectoryFromJSON(IDBJson);
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
  <section>
    <SvelteFlowProvider>
      {#key $activeCarouselItemName}
        <Flow />
      {/key}
    </SvelteFlowProvider>
  </section>
</main>

<style scoped>
  main {
    min-height: 90vh;
  }

  section {
    height: 68vh;
  }
</style>
