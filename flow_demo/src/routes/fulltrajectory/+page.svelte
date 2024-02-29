<script lang="ts">
  import FullTrajectFlow from '$lib/components/FullTrajectFlow.svelte';
  import Header from '$lib/components/general/Header.svelte';
  import { SvelteFlowProvider } from '@xyflow/svelte';
  import { onMount } from 'svelte';
  import IDBJson from '$lib/data/IBD_Crohn_Disease.json';
  import Dummy from '$lib/data/dummy.json';
  import {
    trajectory as trajectoryStore,
    items as itemsStore,
  } from '$lib/store';
  import type { IPhase, IEvent } from '$lib/components/types';
  import JsonExtraction from '$lib/utilClasses/Json';
  import '$lib/components/nodes/basicNode.css'

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
  <!-- this is to replace the header the current application has -->
  <div style="opacity: 0;">
    <Header {items} />
  </div>
  <!-- TODO: change the responsiveness not by key but by an different method -->
  {#key $trajectoryStore}
    <section>
      <SvelteFlowProvider>
        <FullTrajectFlow />
      </SvelteFlowProvider>
    </section>
  {/key}
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
