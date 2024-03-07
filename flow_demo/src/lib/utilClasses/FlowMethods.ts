import type { IEdge, IStepNode } from "$lib/components/types";
import { TrajectoryColors } from "$lib/enum";
import { type Edge, type Node } from "@xyflow/svelte";

const MIN_DISTANCE: number = 450;

export default class FlowMethods {
    onEdgeDrop(event: MouseEvent | TouchEvent, connectingId: string, amountOfNodes: number, activeCarouselItem: string, screenToFlowPosition: Function) {
        if (!connectingId) return;
        const targetIsPane = (event.target as Element).classList.contains(
        'svelte-flow__pane'
        );
        if (!targetIsPane) return;
        const newNodeId = (amountOfNodes + 1).toString();
        const newStepNode: IStepNode = {
            phaseName: activeCarouselItem,
            step: {
                name: `StepNode ${newNodeId}`,
                description: `StepNode ${newNodeId}`,
                concept: { domain_name: 'Episode' },
            },
            color: TrajectoryColors.step,
        }
        const newNode: Node = {
            id: newNodeId,
            type: 'stepNode',
            data: newStepNode,
            position: screenToFlowPosition({
                // @ts-expect-error
                x: event?.clientX,
                // @ts-expect-error
                y: event?.clientY,
            }),
            origin: [0, 0],
        };
        const newEdge: IEdge = {
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

    onDrop(event: DragEvent, amountOfNodes: number, activeCarouselItem: string, screenToFlowPosition: Function) {
        event.preventDefault();

        if (!event.dataTransfer) return null;

        const type = event.dataTransfer.getData('application/svelteflow');
        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });
        const newStepNode: IStepNode = {
            phaseName: activeCarouselItem,
            step: {
                name: `StepNode ${amountOfNodes + 1}`,
                description: `StepNode ${amountOfNodes + 1}`,
                concept: { domain_name: 'Episode' },
            },
            color: TrajectoryColors.step,
        }
        const newNode: any = {
            id: `${amountOfNodes + 1}`,
            type,
            position,
            data: newStepNode,
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
                n.id !== node.id && 
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