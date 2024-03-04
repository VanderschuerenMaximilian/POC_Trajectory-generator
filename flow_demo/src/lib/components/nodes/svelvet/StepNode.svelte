<script lang="ts">
  import { onMount } from 'svelte';
  import { Node, Anchor, type Connections } from 'svelvet';
  import { svelvetEdges } from '$lib/store';

  export let node: any;

  let connections: Connections = [];

  onMount(async () => {
    for (let edge of $svelvetEdges) {
        // console.log('edge: ', edge);
      if (edge[1].includes(`anchor-${node.id}-`)) {
        connections.push(edge);
      }
    }
  });
</script>

<Node
  id={node.id}
  let:grabHandle
  let:selected
  position={{ x: 200 * (parseInt(node.id) - 1), y: 400 }}
>
  <div
    use:grabHandle
    class:selected
    class="my-component"
    style="background-color: {node.data.color}"
  >
    <div class="input">
      <Anchor
        id="anchor-{node.data.parent}-{node.id}"
        input
        direction={"north"}
      />
    </div>
    <div class="output">
      <Anchor output direction={"south"} {connections} />
    </div>
    <span>Step</span>
  </div>
</Node>

<style scoped>
  .input {
    position: absolute;
    top: 0;
    left: 45%;
    transform: translateY(-50%);
  }

  .output {
    position: absolute;
    bottom: 0;
    left: 45%;
    transform: translateY(50%);
  }

  .my-component {
    position: relative;
    padding: 10px;
    color: white;
  }
</style>
