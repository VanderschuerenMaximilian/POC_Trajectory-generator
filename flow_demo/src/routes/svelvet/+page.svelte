<script lang="ts">
  import JsonExtraction from '$lib/utilClasses/Json';
  import SvelvetExtraction from '$lib/utilClasses/SvelvetNodes'
  import Header from '$lib/components/general/Header.svelte';
  import SvelvetFlow from '$lib/components/SvelvetFlow.svelte';
  import IDBJson from '$lib/data/IBD_Crohn_Disease.json';
  import { onMount } from 'svelte';
  import {
    trajectory as trajectoryStore,
    items as itemsStore,
    svelvetNodes,
    svelvetEdges,
  } from '$lib/store';
  import type { IMainItemsJSON } from '$lib/types';

  const extraction = new JsonExtraction();
  const svelvetExtraction = new SvelvetExtraction();
  let items: IMainItemsJSON = [];

  onMount(async () => {
    const { trajectoryObject: trajectoryObj, items: PhasesAndEvents } =
      await extraction.getTrajectoryFromJSON(IDBJson);
    trajectoryStore.set(trajectoryObj);
    itemsStore.set(PhasesAndEvents);
    items = PhasesAndEvents;
    const { nodes, edges } =
      await svelvetExtraction.configureTrajectory(
        trajectoryObj,
        PhasesAndEvents
      );
    svelvetNodes.set(nodes);
    svelvetEdges.set(edges);
  });
</script>

<div style="opacity: 0;">
  <Header {items} />
</div>
<main>
  <SvelvetFlow />
</main>

<style scoped>
    main {
        height: 86vh;
        text-align: center;
    }
</style>
