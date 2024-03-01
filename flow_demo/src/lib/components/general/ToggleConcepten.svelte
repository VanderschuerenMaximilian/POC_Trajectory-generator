<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function toggleSwitch() {
    dispatch('toggle');
  }
</script>

<section>
  <button on:click={toggleSwitch} class="switch">
    <span class="slider"></span>
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
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background: #9fccfa;
    border-radius: 50px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .slider:before {
    position: absolute;
    content: '';
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2em;
    width: 2em;
    inset: 0;
    background-color: white;
    border-radius: 50px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
</style>
