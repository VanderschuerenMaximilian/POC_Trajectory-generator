<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let i: number;

  const dispatch = createEventDispatcher();

  function setNumber(index: number) {
    return index + 1;
  }

  function handleClick() {
    dispatch('onSubNavClick', i);
  }
</script>

<button id={i.toString()} on:click={handleClick}>
  {setNumber(i)}
</button>

<style scoped>
  button {
    background-color: #f3f3f3;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: all 0.15s ease-in;
  }

  button:hover {
    background-color: #e0e0e0;
  }
</style>
