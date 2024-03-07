<script lang="ts">
  import FullTrajectFlow from '$lib/components/FullTrajectFlow.svelte';
  import Header from '$lib/components/general/Header.svelte';
  import { SvelteFlowProvider } from '@xyflow/svelte';
  import { onMount } from 'svelte';
  import IDBJson from '$lib/data/IBD_Crohn_Disease.json';
  import {
    trajectory as trajectoryStore,
    items as itemsStore,
  } from '$lib/store';
  import type { IMainItemsJSON } from '$lib/types';
  import JsonExtraction from '$lib/utilClasses/Json';

  const extraction = new JsonExtraction();
  let items: IMainItemsJSON = [];

  onMount(async () => {
    const { trajectoryObject: trajectoryObj, items: PhasesAndEvents } =
      await extraction.getTrajectoryFromJSON(IDBJson);

    $trajectoryStore = trajectoryObj;
    $itemsStore = PhasesAndEvents;
    items = PhasesAndEvents;
  });
</script>

<main>
  <!-- this is to replace the header the current application has -->
  <div style="opacity: 0;">
    <Header {items} />
  </div>
  <section>
    <SvelteFlowProvider>
      <FullTrajectFlow />
    </SvelteFlowProvider>
  </section>
</main>

<style scoped>
  main {
    min-height: 90vh;
  }

  section {
    height: 82vh;
    outline: 1px solid black;
  }
</style>
