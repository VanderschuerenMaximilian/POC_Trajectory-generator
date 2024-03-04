<script lang="ts">
  import Flow from '$lib/components/Flow.svelte';
  import FullTrajectFlow from '$lib/components/FullTrajectFlow.svelte';
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
  import ToggleConcepten from '$lib/components/general/ToggleConcepten.svelte';

  const extraction = new JsonExtraction();
  let items: (IPhase | IEvent)[] = [];
  let toggleState: boolean = false;

  onMount(async () => {
    const { trajectory: trajectoryObj, items: PhasesAndEvents } =
      await extraction.getTrajectory(IDBJson);
    trajectoryStore.set(trajectoryObj);
    itemsStore.set(PhasesAndEvents);
    items = PhasesAndEvents;
  });

  function onToggle() {
    toggleState = !toggleState;
  }
</script>

<div style="opacity: 0;">
  <Header {items} />
</div>
<ToggleConcepten on:toggle={onToggle} />
<main>
  {#if toggleState}
    <Header {items} />
  {/if}
  <section>
    <SvelteFlowProvider>
      {#if toggleState}
        {#key $activeItem}
          <Flow />
        {/key}
      {:else}
        <FullTrajectFlow />
      {/if}
    </SvelteFlowProvider>
  </section>
</main>

<style scoped>
  main {
    /* TODO: 100vh - the existing header height */
    height: 72vh;
    display: flex;
    flex-direction: column;
  }

  section {
    flex: 1;
  }
</style>
