<script>
  import { Handle, Position } from '@xyflow/svelte';
  import NodeOptions from '../nodes/Node';

  const nodeOptions = new NodeOptions();

  const styling = `width: 18px; height: 18px; background-color: ${nodeOptions.handleColors.datapoint}; border: none;`;
</script>

<Handle id="stepTop" style={styling} type="target" position={Position.Top} />
