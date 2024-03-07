<script>
  import { Handle, Position } from '@xyflow/svelte';
  import { TrajectoryColors } from '$lib/enum';

  const styling = `width: 18px; height: 18px; background-color: ${TrajectoryColors.event}; border: none;`;
</script>

<Handle id="eventTop" style={styling} type="target" position={Position.Top} />
<Handle
  id="eventBottom"
  style={styling}
  type="source"
  position={Position.Bottom}
/>
