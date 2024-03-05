<script lang="ts">
  import { Node, Anchor, Resizer } from 'svelvet';
  import NodeOptions from '../Node';

  export let node: any;

  const nodeOptions = new NodeOptions();
</script>

<Node
  id={node.id}
  let:grabHandle
  let:selected
  position={{ x: 250 * (parseInt(node.id) - 1), y: 600 }}
>
  <div
    use:grabHandle
    class:selected
    class="container__node"
    style="background-color: {node.data.color}"
  >
    <Resizer width height rotation />
    <div class="input">
      <Anchor
        id="anchor-{node.data.parent}-{node.id}"
        input
        direction={"north"}
      />
    </div>
    <h1>{nodeOptions.capatalizeFirstLetter(node.data.datapoint.name)}</h1>
  </div>
</Node>

<style scoped>
  .input {
    position: absolute;
    top: 0;
    left: 45%;
    transform: translateY(-50%);
  }

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
</style>
