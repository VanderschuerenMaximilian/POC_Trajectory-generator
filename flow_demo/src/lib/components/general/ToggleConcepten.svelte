<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let isOn = false;
  function toggleSwitch() {
    dispatch('toggle');
    isOn = !isOn;
  }
</script>

<section>
  <button on:click={toggleSwitch} class="switch">
    <span class="slider" style="{isOn? 'right: 0;' : 'left: 0;'}"></span>
  </button>
</section>

<style scoped>
  section {
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 10px 120px;
  }

  button {
    background: inherit;
    border: none;
    border-radius: 15px;
    padding: 0;
    cursor: pointer;
    height: fit-content;
    margin: 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease-in;
  }

  /* The switch - the box around the slider */
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
    cursor: pointer;
    background: #9fccfa;
    border-radius: 50px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .slider {
    position: absolute;
    content: '';
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2em;
    width: 2em;
    top: 0;
    background-color: white;
    border-radius: 50px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
</style>
