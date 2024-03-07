<script>
  import { Handle, Position } from '@xyflow/svelte';
  import { TrajectoryColors } from '$lib/enum';

  const styling =
    `width: 18px; height: 18px; background-color: ${TrajectoryColors.phase}; border: none;`;
</script>

<Handle id="phaseTop" style={styling} type="target" position={Position.Top} />
<Handle
  id="phaseBottom"
  style={styling}
  type="source"
  position={Position.Bottom}
/>
