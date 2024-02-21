<script>
  import Flow from '$lib/components/Flow.svelte';
  import {SvelteFlowProvider} from '@xyflow/svelte';
</script>

<main>
    <SvelteFlowProvider>
        <Flow />
    </SvelteFlowProvider>
</main>

<style>
  main {
    height: 98vh;
  }
</style>
