import { type Edge, type Node } from "@xyflow/svelte";

const MIN_DISTANCE: number = 550;

export default class FlowMethods {
    onEdgeDrop(event: MouseEvent | TouchEvent, connectingId: string, screenToFlowPosition: Function) {
        if (!connectingId) return;
        const targetIsPane = (event.target as Element).classList.contains(
        'svelte-flow__pane'
        );
        if (!targetIsPane) return;
        const newNodeId = (parseInt(connectingId) + 1).toString();
        const newNode: any = {
            id: newNodeId,
            type: 'stepNode',
            data: {
                label: `Step ${newNodeId}`,
                description: `Step ${newNodeId}`,
            },
            position: screenToFlowPosition({
                // @ts-expect-error
                x: event?.clientX,
                // @ts-expect-error
                y: event?.clientY,
            }),
            origin: [0, 0],
        };

        const newEdge: any = {
            id: crypto.randomUUID(),
            source: connectingId,
            target: newNodeId,
            type: 'step',
        };

        return { newNode, newEdge };
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        
        if (!event.dataTransfer) return
        
        event.dataTransfer.dropEffect = 'move';
        return event;
    }

    onDrop(event: DragEvent, amountOfNodes: number, screenToFlowPosition: Function) {
        event.preventDefault();

        if (!event.dataTransfer) return null;

        const type = event.dataTransfer.getData('application/svelteflow');
        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        const newNode: any = {
            id: `${amountOfNodes}`,
            type,
            position,
            data: { label: `StepNode ${amountOfNodes + 1}` },
            origin: [0, 0],
        };

        return newNode;
    }

    onNodeDrag(node: any, nodes: Node[], edges: Edge[]) {
        const closestEdge = this.getClosestEdge(node, nodes);

        let edgeAlreadyExists = false;
        edges.forEach((edge, i) => {
            if (edgeAlreadyExists) return;

            if (closestEdge) {
                // non-temporary edge already exists
                if (
                edge.source === closestEdge.source &&
                edge.target === closestEdge.target
                ) {
                edgeAlreadyExists = true;
                return;
                }

                if (edge.class !== 'temp') {
                return;
                }

                if (
                edge.source !== closestEdge.source ||
                edge.target !== closestEdge.target
                ) {
                edges[i] = closestEdge; // replace the edge
                edgeAlreadyExists = true;
                }
            } else if (edge.class === 'temp') {
                edges.splice(i, 1); // remove edge
            }
        });

        if (closestEdge && !edgeAlreadyExists) {
        edges.push(closestEdge);
        }

        return edges;
    }

    onNodeDragStop(edges: Edge[]) {
        edges.forEach((edge: Edge) => {
        if (edge.class === 'temp') delete edge.class;
        });
        return edges;
    }

    private getClosestEdge(node: Node, nodes: Node[]) {
        const closestNode = nodes.reduce((res, n) => {
            if (
                n.id !== node.id && parseInt(node.id) - 1 === parseInt(n.id) &&
                n.computed?.positionAbsolute && node.computed?.positionAbsolute
            ) {
                const dx = n.computed?.positionAbsolute.x - node.computed?.positionAbsolute.x;
                const dy = n.computed?.positionAbsolute.y - node.computed?.positionAbsolute.y;
                
                const d = Math.sqrt(dx * dx + dy * dy);

                if (d < res.distance && d <= MIN_DISTANCE) {
                    res.distance = d;
                    res.node = n;
                }
                }

                return res;
            },
            <{ distance: number; node: Node | null }>{
                distance: Number.MAX_VALUE,
                node: null,
            }
            );

        if (!closestNode.node) return;

        const edge: Edge = {
            id: crypto.randomUUID(),
            source: closestNode.node.id,
            target: node.id,
            class: 'temp',
            type: 'step',
            selected: false,
        }

        return edge;
    }
}