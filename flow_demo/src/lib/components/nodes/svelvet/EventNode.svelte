<script lang="ts">
  import { Node, Anchor } from 'svelvet';

  export let node: any;

  function handleClick(e: CustomEvent) {
    console.log(e);
    const { detail } = e;
  }
</script>

<Node
  id={node.id}
  let:grabHandle
  let:selected
  position={{ x: 200*(parseInt(node.id)-1), y: 200 }}
  on:nodeClicked={handleClick}
>
  <div use:grabHandle class:selected class="my-component" style="background-color: {node.data.color}">
    <div class="input">
      <Anchor id="anchor-{node.data.parent}-{node.id}" input/>
    </div>
    <div class="output">
      <Anchor output />
    </div>
    <span>Event</span>
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
