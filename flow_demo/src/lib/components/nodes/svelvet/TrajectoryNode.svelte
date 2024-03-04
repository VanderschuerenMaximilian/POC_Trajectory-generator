<script lang="ts">
  import { onMount } from 'svelte';
  import { Node, Anchor, type Connections, type CSSColorString } from 'svelvet';
  import { svelvetEdges } from '$lib/store';
  import { writable } from 'svelte/store';

  export let node: any;
  console.log(node)
  const edgeColor = writable<CSSColorString>('rgb(150,0,0)');
  let connections: Connections = [];

  onMount(async () => {
    for (let edge of $svelvetEdges) {
      if (edge[1].includes(`anchor-${node.id}-`)) {
        connections.push(edge);
      }
    }
  });
</script>

<Node id={node.id} let:grabHandle let:selected position={{ x: 600, y: 0 }}>
  <div
    use:grabHandle
    class:selected
    class="my-component"
    style="background-color: {node.data.color}"
  >
    <div class="output">
      <Anchor
        id="anchor-{node.id}"
        output
        {edgeColor}
        direction="south"
        {connections}
      />
    </div>
    <span>{node.data.episode_object.name}</span>
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
