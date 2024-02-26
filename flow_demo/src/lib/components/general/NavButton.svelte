<script lang="ts">
  import type { IPhase, IEvent } from '../types';
  import { createEventDispatcher } from 'svelte';

  export let i: number;
  export let item: IPhase | IEvent;

  const dispatch = createEventDispatcher();

  function handleClick(event: any) {
    // console.log('clicked', event.target);
    dispatch('onClick', event.target);
  }
</script>

<button id="{i.toString()}" class="carousel__button" on:click={handleClick}>
  {item.name}
</button>

<style scoped>
  button {
    background: none;
    border: none;
    border-radius: 15px;
    padding: 0;
    cursor: pointer;
    outline: inherit;
    font-size: 16px;
    width: 100%;
    height: 100%;
  }
</style>
