<script lang="ts">
  import type { IPhase, IEvent } from '../types';
  import { createEventDispatcher } from 'svelte';

  export let i: number;
  export let item: IPhase | IEvent;

  const dispatch = createEventDispatcher();

  function handleClick(event: any): void {
    dispatch('onClick', event.target);
  }
</script>

<button
  id={i.toString()}
  class={item.type === 'event' ? 'event' : 'phase'}
  on:click={handleClick}
>
  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
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
    transition: all 0.15s ease-in;
    color: white;
  }

  .phase {
    border-radius: 5px;
    background-color: crimson;
  }

  .phase:hover {
    background-color: rgb(170, 33, 58);
  }

  .event {
    border-radius: 55px;
    background-color: #62caed;
  }

  .event:hover {
    background-color: #4a9dbf;
  }
</style>
