<script lang="ts">
  import JsonExtraction from '$lib/utilClasses/Json';
  import SvelvetExtraction from '$lib/utilClasses/SvelvetNodes'
  import Header from '$lib/components/general/Header.svelte';
  import ToggleConcepten from '$lib/components/general/ToggleConcepten.svelte';
  import SvelvetFlow from '$lib/components/SvelvetFlow.svelte';
  import IDBJson from '$lib/data/IBD_Crohn_Disease.json';
  import { onMount } from 'svelte';
  import {
    trajectory as trajectoryStore,
    items as itemsStore,
    svelvetNodes,
    svelvetEdges,
  } from '$lib/store';
  import type { IPhase, IEvent } from '$lib/components/types';
  import DragAndDrop from '$lib/components/general/svelvet/DragAndDrop.svelte';

  const extraction = new JsonExtraction();
  const svelvetExtraction = new SvelvetExtraction();
  let items: (IPhase | IEvent)[] = [];
  let toggleState: boolean = false;

  onMount(async () => {
    const { trajectory: trajectoryObj, items: PhasesAndEvents } =
      await extraction.getTrajectory(IDBJson);
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
    // console.log('nodes: ', nodes, 'edges: ', edges);
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
  <SvelvetFlow />
</main>

<style scoped>
    main {
        height: 81vh;
        text-align: center;
    }
</style>
