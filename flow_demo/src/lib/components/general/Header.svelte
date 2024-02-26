<script lang="ts">
  import type { IEvent, IPhase } from '../types';
  import NavButton from './NavButton.svelte';
  import SubNavButton from './SubNavButton.svelte';
  import { onMount } from 'svelte';

  export let items: (IPhase | IEvent)[];

  let carouselList: HTMLUListElement | null;
  let carouselItems: HTMLCollection;
  let active: number = 0;

  onMount(async () => {
    if (carouselList) carouselItems = carouselList?.children;
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
    active = parseInt(event.detail.id);
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
    const current = elems.find((elem: any) => elem.dataset.pos == 0);
    const prev = elems.find((elem: any) => elem.dataset.pos == -1);
    const next = elems.find((elem: any) => elem.dataset.pos == 1);
    const second = elems.find((elem: any) => elem.dataset.pos == -2);
    const secondToLast = elems.find((elem: any) => elem.dataset.pos == 2);
    const first = elems.find((elem: any) => elem.dataset.pos == -3);
    const last = elems.find((elem: any) => elem.dataset.pos == 3);

    // console.log({
    //   current: current,
    //   prev: prev,
    //   next: next,
    //   second: second,
    //   secondToLast: secondToLast,
    //   first: first,
    //   last: last,
    // })

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

  function getNext() {
    let newActiveId = active + 1;
    if (newActiveId === items.length) newActiveId = 0;
    let newActive = getCorrespondingItem(newActiveId.toString());
    if (!newActive) return;
    update(newActive);
    active++;
    if (active === items.length) active = 0;
    console.log(active);
  }

  function getPrev() {
    let newActiveId = active - 1;
    if (newActiveId < 0) newActiveId = items.length - 1;
    let newActive = getCorrespondingItem(newActiveId.toString());
    if (!newActive) return;
    update(newActive);
    active--;
    if (active < 0) active = items.length - 1;
    console.log(active);
  }

  // TODO: something is going wrong when changing the data pos when clicking on the subnav
  function onSubNavClick(event: any) {
    let newActive = getCorrespondingItem(event.detail.toString());
    if (!newActive) return;
    update(newActive);
    active = parseInt(event.detail);
  }
</script>

<header>
  <nav class="carousel">
    <div class="carousel__container">
      <button class="previous" on:click={getPrev}>prev</button>
      <ul class="carousel__list" bind:this={carouselList}>
        {#each items as item, i}
          <li
            id={i.toString()}
            data-pos={assignIndex(items, i)}
            class="carousel__item {item.type === 'phase' ? 'phase' : 'event'}"
          >
            <NavButton {i} {item} on:onClick={onNavClick} />
          </li>
        {/each}
      </ul>
      <button class="next" on:click={getNext}>next</button>
    </div>
    <ul class="subnav">
      {#each items as item, i}
        <SubNavButton {i} on:onSubNavClick={onSubNavClick} />
      {/each}
    </ul>
  </nav>
</header>

<style scoped>
  header {
    background-color: #f3f3f3;
    padding: 0.25rem;
    border-bottom: 1px solid #e0e0e0;
  }

  nav {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-family: Arial;
  }

  .carousel__list {
    display: flex;
    list-style: none;
    position: relative;
    width: 100%;
    height: 46px;
    padding: 0;
    justify-content: center;
    perspective: 46px;
  }

  .carousel__item {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 0px;
    width: 200px;
    height: 50px;
    box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.5);
    position: absolute;
    transition: all 0.3s ease-in;

    &[data-pos='0'] {
      z-index: 5;
    }

    &[data-pos='-1'],
    &[data-pos='1'] {
      opacity: 0.7;
      filter: blur(0.5px) grayscale(10%);
    }

    &[data-pos='-1'] {
      transform: translateX(-70%) translateY(-20%) scale(0.9);
      z-index: 4;
    }

    &[data-pos='1'] {
      transform: translateX(70%) translateY(-20%) scale(0.9);
      z-index: 4;
    }

    &[data-pos='-2'],
    &[data-pos='2'] {
      opacity: 0;
      /* filter: blur(3px) grayscale(20%); */
    }

    /* &[data-pos='-2'] {
      transform: translateX(-70%) scale(0.8);
      z-index: 3;
    }

    &[data-pos='2'] {
      transform: translateX(70%) scale(0.8);
      z-index: 3;
    } */

    &[data-pos='-3'],
    &[data-pos='3'] {
      opacity: 0;
      /* filter: blur(5px) grayscale(30%); */
    }

    /* &[data-pos='-3'] {
      transform: translateX(-100%) scale(0.7);
      z-index: 2;
    }

    &[data-pos='3'] {
      transform: translateX(100%) scale(0.7);
      z-index: 2;
    } */
  }

  .phase {
    border-radius: 5px;
  }

  .event {
    border-radius: 55px;
  }

  .carousel__container {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 40%;
    margin-top: 0.5rem;
    margin-bottom: 0rem;
  }

  .carousel__container button {
    position: absolute;
    background-color: #f3f3f3;
    border: 1px solid #e0e0e0;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    transition: all 0.15s ease-in;
    z-index: 10;
  }

  .carousel__container button:hover {
    background-color: #e0e0e0;
  }

  .previous {
    left: 0px;
    top: 50%;
  }

  .next {
    right: 0px;
    top: 50%;
  }

  .subnav {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0rem;
    padding: 0;
    list-style: none;
  }
</style>
