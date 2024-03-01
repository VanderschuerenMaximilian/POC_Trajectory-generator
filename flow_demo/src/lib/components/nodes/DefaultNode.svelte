<script lang="ts">
  import NodeOptions from './Node';

  export let color = '';
  export let info: any;

  const nodeOptions = new NodeOptions();
</script>

<div
  class="container__node"
  style="background-color: {color}; {info.typeOfObj === 'event'
    ? 'border-radius:50px'
    : ''}"
>
  <h1>{nodeOptions.capatalizeFirstLetter(info.name)}</h1>
  {#if info.domain}
    <p>Concept: {nodeOptions.capatalizeFirstLetter(info.domain)}</p>
  {/if}
  {#if info.typeOfObj}
    <p>Type: {nodeOptions.capatalizeFirstLetter(info.typeOfObj)}</p>
  {/if}
</div>

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
  }
</style>
