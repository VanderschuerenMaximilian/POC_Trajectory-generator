<!-- <script lang="ts">
  import {
    BaseEdge,
    getBezierPath,
    getStraightPath,
    EdgeLabelRenderer,
  } from '@xyflow/svelte';

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: 50,
    sourceY: 50,
    targetX: 0,
    targetY: 0,
  });
</script>

<BaseEdge path={edgePath} {...$$props} style="border-color: red" />
<EdgeLabelRenderer>
  <div
    style="
      position: 'absolute';
      transform: translate(-50%, -50%) translate({labelX}px,{labelY}px);
      background: '#ffcc00';
      padding: 10;
      borderRadius: 5;
      fontSize: 12;
      fontWeight: 700;
    "
    class="nodrag nopan"
  >
    {data.label}
    Edge Text
  </div>
</EdgeLabelRenderer> -->
