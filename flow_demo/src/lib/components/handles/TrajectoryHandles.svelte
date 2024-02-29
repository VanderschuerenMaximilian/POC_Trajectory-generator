<script>
  import { Handle, Position } from '@xyflow/svelte';
  import NodeOptions from '../nodes/Node';

  const nodeOptions = new NodeOptions();
  const styling = `width: 18px; height: 18px; background-color: ${nodeOptions.handleColors.trajectory}; border: none;`;
</script>

<Handle
  id="trajectoryBottom"
  style={styling}
  type="source"
  position={Position.Bottom}
/>
