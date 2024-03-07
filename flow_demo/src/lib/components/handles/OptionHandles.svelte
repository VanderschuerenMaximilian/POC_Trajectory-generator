<script>
  import { Handle, Position } from '@xyflow/svelte';
  import { TrajectoryColors } from '$lib/enum';

  const styling = `width: 18px; height: 18px; background-color: ${TrajectoryColors.option}; border: none;`;
</script>

<Handle id="stepTop" style={styling} type="target" position={Position.Top} />
