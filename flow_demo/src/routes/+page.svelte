<script lang="ts">
  import Flow from '$lib/components/Flow.svelte';
  import FullTrajectFlow from '$lib/components/FullTrajectFlow.svelte';
  import Header from '$lib/components/general/Header.svelte';
  import { SvelteFlowProvider, type Node, type Edge } from '@xyflow/svelte';
  import { onMount } from 'svelte';
  import IDBJson from '$lib/data/IBD_Crohn_Disease.json';
  import {
    trajectory as trajectoryStore,
    items as itemsStore,
    carouselData as carouselDataStore,
  } from '$lib/store';
  import type { ICarouselItem } from '$lib/types';
  import JsonExtraction from '$lib/utilClasses/Json';
  import ToggleConcepten from '$lib/components/general/ToggleConcepten.svelte';
  import Extraction from '$lib/utilClasses/Nodes';

  const extractionJSON = new JsonExtraction();
  const extraction = new Extraction();
  let items: ICarouselItem[] = [];
  let toggleState: boolean = false;
  let trajectoryNodes: Node[];
  let trajectoryEdges: Edge[];
  let header: HTMLDivElement;

  onMount(async () => {
    const {
      trajectoryObj,
      PhasesAndEvents,
      carouselItems,
      carouselData,
      nodes,
      edges,
    } = await getData();
    trajectoryStore.set(trajectoryObj);
    itemsStore.set(PhasesAndEvents);
    items = carouselItems;
    carouselDataStore.set(carouselData);
    trajectoryNodes = nodes;
    trajectoryEdges = edges;
  });

  async function getData() {
    const {
      trajectoryObject: trajectoryObj,
      items: PhasesAndEvents,
      carouselItems,
    } = await extractionJSON.getTrajectoryFromJSON(IDBJson);
    const { carouselData, nodes, edges } =
      await extraction.extractFullTrajectory(trajectoryObj, PhasesAndEvents);
    return {
      trajectoryObj,
      PhasesAndEvents,
      carouselItems,
      carouselData,
      nodes,
      edges,
    };
  }

  function onToggle() {
    toggleState = !toggleState;
  }

  $: mainHeight = `calc(100vh - (${header?.clientHeight}px + 46px))`;
</script>

<div bind:this={header}>
  <div style="opacity: 0;">
    <Header {items} />
  </div>
  <ToggleConcepten on:toggle={onToggle} />
</div>
<main style="height: {mainHeight ? mainHeight : '72vh'};">
  {#if toggleState}
    <Header {items} />
  {/if}
  <section class="flow__container">
    <SvelteFlowProvider>
      {#if toggleState}
        <Flow />
      {:else}
        <FullTrajectFlow {trajectoryNodes} {trajectoryEdges} />
      {/if}
    </SvelteFlowProvider>
  </section>
</main>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
  }

  .flow__container {
    flex: 1;
  }
</style>
