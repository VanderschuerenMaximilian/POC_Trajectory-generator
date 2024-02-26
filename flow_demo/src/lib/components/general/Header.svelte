<script lang="ts">
  import { updateEdge } from '@xyflow/svelte';
  import type { IPhase, IEvent } from '../types';
  import NavButton from './NavButton.svelte';
  import { onMount } from 'svelte';

  export let items: (IPhase | IEvent)[];

  let carouselList: HTMLUListElement | null;
  let carouselItems: HTMLCollection;

  onMount(async () => {
    if (carouselList) {
      carouselItems = carouselList?.children;
      console.log(carouselItems);
    }
  });

  // $: console.log(items);

  function onNavClick(event: any) {
    if (!event.detail) return;
    let newActive = getCorrespondingItem(event.detail.id) as HTMLLIElement;
    if (!newActive) return;
    let isItem = newActive?.closest('.carousel__item');
    if (!isItem || newActive?.classList.contains('carousel__item_active'))
      return;

    update(newActive);
  }

  function getCorrespondingItem(buttonId: string): Element | undefined {
    for (let i = 0; i < carouselItems.length; i++) {
      if (carouselItems[i].id === buttonId) {
        return carouselItems[i];
      }
    }
  }

  function update(newActive: any) {
    const newActivePos = newActive.dataset.pos;
    const elems = Array.from(carouselItems);
    console.log(elems);
    const current = elems.find((elem: any) => elem.dataset.pos == 0);
    const prev = elems.find((elem: any) => elem.dataset.pos == -1);
    const next = elems.find((elem: any) => elem.dataset.pos == 1);
    const second = elems.find((elem: any) => elem.dataset.pos == -2);
    const secondToLast = elems.find((elem: any) => elem.dataset.pos == 2);
    const first = elems.find((elem: any) => elem.dataset.pos == -3);
    const last = elems.find((elem: any) => elem.dataset.pos == 3);

    current?.classList.remove('carousel__item_active');

    [current, prev, next, second, secondToLast, first, last].forEach(
      (item: any) => {
        if (!item) return;
        let itemPos = item?.dataset.pos;
        item.dataset.pos = getPos(itemPos, newActivePos);
      }
    );
  }

  function getPos(current: any, active: any) {
    const diff = current - active;

    if (Math.abs(current - active) > 3) {
      return -current;
    }

    return diff;
  }

  function assignIndex(items: (IPhase | IEvent)[], index: number) {
    if (index + 3 === items.length) {
      return -3;
    } else if (index + 2 === items.length) {
      return -2;
    } else if (index + 1 === items.length) {
      return -1;
    } else {
      return index;
    }
  }
</script>

<header>
  <nav class="carousel">
    <ul bind:this={carouselList}>
      {#each items as item, i}
        <li
          id={i.toString()}
          data-pos={assignIndex(items, i)}
          class="carousel__item"
        >
          <NavButton {i} {item} on:onClick={onNavClick} />
        </li>
      {/each}
    </ul>
  </nav>
</header>

<style scoped>
  header {
    background-color: #f3f3f3;
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
  }

  nav {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    font-family: Arial;
  }

  nav ul {
    display: flex;
    list-style: none;
    position: relative;
    width: 100%;
    height: 300px;
    justify-content: center;
    perspective: 300px;
  }

  nav ul li {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 0px;
    width: 150px;
    height: 250px;
    border-radius: 12px;
    box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.5);
    position: absolute;
    transition: all 0.3s ease-in;

    &:nth-child(1) {
      background: linear-gradient(45deg, #2d35eb 0%, #904ed4 100%);
    }
    &:nth-child(2) {
      background: linear-gradient(45deg, #2d35eb 0%, #fdbb2d 100%);
    }
    &:nth-child(3) {
      background: linear-gradient(45deg, #2d35eb 0%, #22c1c3 100%);
    }
    &:nth-child(4) {
      background: linear-gradient(45deg, #fdbb2d 0%, #904ed4 100%);
    }
    &:nth-child(5) {
      background: linear-gradient(45deg, #22c1c3 0%, #904ed4 100%);
    }
    &:nth-child(6) {
      background: linear-gradient(45deg, #fdbb2d 0%, #22c1c3 100%);
    }
    &:nth-child(7) {
      background: linear-gradient(45deg, #904ed4 0%, #fdbb2d 100%);
    }

    &[data-pos='0'] {
      z-index: 5;
    }

    &[data-pos='-1'],
    &[data-pos='1'] {
      opacity: 0.7;
      filter: blur(1px) grayscale(10%);
    }

    &[data-pos='-1'] {
      transform: translateX(-40%) scale(0.9);
      z-index: 4;
    }

    &[data-pos='1'] {
      transform: translateX(40%) scale(0.9);
      z-index: 4;
    }

    &[data-pos='-2'],
    &[data-pos='2'] {
      opacity: 0.4;
      filter: blur(3px) grayscale(20%);
    }

    &[data-pos='-2'] {
      transform: translateX(-70%) scale(0.8);
      z-index: 3;
    }

    &[data-pos='2'] {
      transform: translateX(70%) scale(0.8);
      z-index: 3;
    }

    &[data-pos='-3'],
    &[data-pos='3'] {
      opacity: 0.25;
      filter: blur(5px) grayscale(30%);
    }

    &[data-pos='-3'] {
      transform: translateX(-100%) scale(0.7);
      z-index: 2;
    }

    &[data-pos='3'] {
      transform: translateX(100%) scale(0.7);
      z-index: 2;
    }
  }
</style>
