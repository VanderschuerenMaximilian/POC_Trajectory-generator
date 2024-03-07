<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ICarouselItem } from '../../types';
  import { activeCarouselItemName } from '$lib/store';

  export let i: number;
  export let item: ICarouselItem;

  let selectedName: string;

  const dispatch = createEventDispatcher();

  function handleClick(): void {
    dispatch('onSubNavClick', i);
  }

  $: selectedName = $activeCarouselItemName;
</script>

<button
  id={i.toString()}
  on:click={handleClick}
  class="{item.type === 'event' ? 'event' : 'phase'}
  {item.name === selectedName && item.type === 'event'
    ? 'event_active'
    : ''}
{item.name === selectedName && item.type === 'phase' ? 'phase_active' : ''}
  "
>
  {item.name.charAt(0).toUpperCase() + item.name.charAt(1)}
</button>

<style scoped>
  button {
    background-color: inherit;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: all 0.15s ease-in;
    font:
      14px Arial,
      sans-serif;
    font-weight: 500;
  }

  .phase_active {
    background-color: crimson;
    color: white;
  }

  .event_active {
    background-color: #62caed;
    color: white;
  }

  .phase:hover {
    background-color: rgb(170, 33, 58);
    color: white;
  }

  .event:hover {
    background-color: #4a9dbf;
    color: white;
  }
</style>
