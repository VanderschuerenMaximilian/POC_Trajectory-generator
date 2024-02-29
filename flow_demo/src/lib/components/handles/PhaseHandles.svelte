<script>
  import { Handle, Position } from '@xyflow/svelte';
  import NodeOptions from '../nodes/Node';

  const nodeOptions = new NodeOptions();

  const styling =
    `width: 18px; height: 18px; background-color: ${nodeOptions.handleColors.phase}; border: none;`;
</script>

<Handle id="phaseTop" style={styling} type="target" position={Position.Top} />
<Handle
  id="phaseBottom"
  style={styling}
  type="source"
  position={Position.Bottom}
/>
