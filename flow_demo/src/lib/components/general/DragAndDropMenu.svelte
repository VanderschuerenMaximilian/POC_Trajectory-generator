<script lang="ts">
  import { Panel } from '@xyflow/svelte';
  import { ChevronRight } from 'lucide-svelte';

  let fold = false;

  function foldPanel() {
    fold = !fold;
  }

  function onDragStart(event: DragEvent, nodeType: string) {
    if (!event.dataTransfer) return;

    event.dataTransfer.setData('application/svelteflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }
</script>

<Panel position="top-right">
  <aside style='transition: all 0.2s ease-out; {fold ? 'width: 2px; padding: 0px;' : 'width: fit-content; padding: 12px 24px;'}'>
    <h3 style={fold ? 'display: none' : 'display: block'}
    >Drag & Drop Components</h3>
    <div class="nodes__container"
    style={fold ? 'display: none' : 'display: flex'}
    >
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="node"
        on:dragstart={(e) => onDragStart(e, 'stepNode')}
        draggable={true}
      >
        StepNode
      </div>
    </div>
    <button class="fold__button" on:click={foldPanel}>
      <ChevronRight size={24} style='transition: all 0.25s ease-in; {fold ? 'transform: rotate(-180deg)' : ''}' />
    </button>
  </aside>
</Panel>

<style scoped>
  aside {
    position: relative;
    padding: 12px 24px;
    background-color: #f5f5f5;
    border-radius: 5px;
  }

  h3 {
    margin: 0 0 12px 0;
    font-size: 16px;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fold__button {
    position: absolute;
    top: 35%;
    left: -16px;
    padding: 4px;
    background-color: #f5f5f5;
    border-radius: 50px;
    box-shadow: 0 0 5px 0 #00000033;
    transition: all 0.15s ease-in;
  }

  .fold__button:hover {
    background-color: #e0e0e0;
  }

  .nodes__container {
    display: flex;
    gap: 4px;
  }

  .node {
    padding: 8px;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    cursor: move;
  }
</style>
