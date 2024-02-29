<script>
  import { Handle, Position } from '@xyflow/svelte';
  import NodeOptions from '../nodes/Node';

  const nodeOptions = new NodeOptions();
  const styling = `width: 18px; height: 18px; background-color: ${nodeOptions.handleColors.event}; border: none;`;
</script>

<Handle id="eventTop" style={styling} type="target" position={Position.Top} />
<Handle
  id="eventBottom"
  style={styling}
  type="source"
  position={Position.Bottom}
/>
