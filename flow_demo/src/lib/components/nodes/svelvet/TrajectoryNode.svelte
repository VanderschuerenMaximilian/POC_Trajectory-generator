<script lang="ts">
  import { onMount } from 'svelte';
  import { Node, Anchor, type Connections } from 'svelvet';
  import { svelvetEdges } from '$lib/store';

  export let node: any;

  let connections: Connections = [];

  onMount(async () => {
    for (let edge of $svelvetEdges) {
      if (edge[1].includes(`anchor-${node.id}-`)) {
        connections.push(edge);
        console.log(connections);
      }
    }
  });

  function handleClick(e: CustomEvent) {
    console.log(e);
    const { detail } = e;
    console.log(detail);
  }
</script>

<Node
  id={node.id}
  let:grabHandle
  let:selected
  position={{ x: 600, y: 0 }}
  on:nodeClicked={handleClick}
>
  <div
    use:grabHandle
    class:selected
    class="my-component"
    style="background-color: {node.data.color}"
  >
    <div class="output">
      <Anchor id="anchor-{node.id}" output direction="south" {connections} />
    </div>
    <span>Trajectoy</span>
  </div>
</Node>

<style scoped>
  .my-component {
    position: relative;
    padding: 10px;
    cursor: pointer;
    color: white;
  }

  .output {
    position: absolute;
    bottom: 0;
    left: 45%;
    transform: translateY(50%);
  }
</style>
