<script>
  import { Handle, Position } from '@xyflow/svelte';
  import { TrajectoryColors } from '$lib/enum';
  
  const styling = `width: 18px; height: 18px; background-color: ${TrajectoryColors.trajectory}; border: none;`;
</script>

<Handle
  id="trajectoryBottom"
  style={styling}
  type="source"
  position={Position.Bottom}
/>
