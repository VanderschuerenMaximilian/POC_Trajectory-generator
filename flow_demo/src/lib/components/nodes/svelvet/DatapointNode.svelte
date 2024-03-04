<script lang="ts">
  import { Node, Anchor } from 'svelvet';
  import NodeOptions from '../Node';

  export let node: any;

  const nodeOptions = new NodeOptions();
</script>

<Node
  id={node.id}
  let:grabHandle
  let:selected
  position={{ x: 200 * (parseInt(node.id) - 1), y: 600 }}
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
    <span>{nodeOptions.capatalizeFirstLetter(node.data.datapoint.name)}</span>
  </div>
</Node>

<style scoped>
  .input {
    position: absolute;
    top: 0;
    left: 45%;
    transform: translateY(-50%);
  }

  .my-component {
    position: relative;
    padding: 10px;
    color: white;
  }
</style>
