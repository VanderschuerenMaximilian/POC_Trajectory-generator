<script lang="ts">
  import { onMount } from 'svelte';
  import { Node, Anchor, type Connections, type CSSColorString } from 'svelvet';
  import { svelvetEdges } from '$lib/store';
  import { writable } from 'svelte/store';

  export let node: any;

  const edgeColor = writable<CSSColorString>('rgb(0,0,0)');
  let connections: Connections = [];

  onMount(async () => {
    for (let edge of $svelvetEdges) {
      if (edge[1].includes(`anchor-${node.id}-`)) {
        connections.push(edge);
      }
    }
  });
</script>

<Node id={node.id} let:grabHandle let:selected position={{ x: 8000, y: 0 }}>
  <div
    use:grabHandle
    class:selected
    class="container__node"
    style="background-color: {node.data.color}"
  >
    <div class="output">
      <Anchor
        id="anchor-{node.id}"
        output
        {edgeColor}
        direction="south"
        {connections}
        locked
      />
    </div>
    <h1>{node.data.episode_object.name}</h1>
  </div>
</Node>

<style scoped>
  .container__node {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 16px;
    border-radius: 5px;
    color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-width: 180px;
  }

  .container__node h1 {
    margin: 0;
    padding: 0;
    font-weight: 700;
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 2rem;
  }

  .output {
    position: absolute;
    bottom: 0;
    left: 45%;
    transform: translateY(50%);
  }
</style>
