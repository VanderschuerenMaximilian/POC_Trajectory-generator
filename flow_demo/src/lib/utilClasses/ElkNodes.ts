import { flattenArray } from '$lib/utils';
import ELK, { type ElkExtendedEdge, type ElkNode, type LayoutOptions } from 'elkjs'

const elk = new ELK();
const mrTreeOptions: LayoutOptions = {
    'elk.algorithm': 'mrtree',
    'elk.spacing.nodeNode': '280',
    'elk.direction': 'DOWN', 
}
const boxOptions: LayoutOptions = {
    'elk.algorithm': 'rectpacking',
    // 'elk.spacing.componentComponent': '40f',
    // 'elk.padding': '40',
    // 'elk.box.packingMode': 'GROUP_INC',
    'elk.rectpacking.compaction.iterations': '4',
    'elk.rectpacking.packing.strategy': 'SIMPLE',
    // 'elk.contentAlignment': 'V_TOP H_CENTER',
    'elk.spacing.nodeNode': '350',
}

export default class ElkExtraction {

    async getTreeLayout(nodes: any[], edges: any[]): Promise<{ nodes: ElkNode[], edges: ElkExtendedEdge[] }> {
        const transformedNodes = nodes.map((node) => ({
        ...node,
        children: node.data.children ?? [],
        layoutOptions: mrTreeOptions,
        }));

        const graph = {
            id: 'root',
            layoutOptions: mrTreeOptions,
            children: transformedNodes,
            edges,
        };
        
        const elkGraph = await elk.layout(graph);
        const elkChildren = elkGraph.children ?? [];
        const flattenedArray = flattenArray(elkChildren, 'children').map(
            (node: ElkNode) => ({
                ...node,
                position: { x: node.x, y: node.y },
            })
        );

        return { nodes: flattenedArray, edges: elkGraph.edges ?? [] };
    }

    async getBoxLayout(nodes: any[], edges: any[]): Promise<{ nodes: ElkNode[], edges: ElkExtendedEdge[] }> {
        const transformedNodes = nodes.map((node) => ({
            ...node,
            children: node.data.children ?? [],
            layoutOptions: boxOptions,
        }));
        const graph = {
            id: 'root',
            layoutOptions: boxOptions,
            children: transformedNodes,
            edges,
        };

        const elkGraph = await elk.layout(graph);
        const elkChildren = elkGraph.children ?? [];
        const flattenedArray = flattenArray(elkChildren, 'children').map(
            (node: ElkNode) => ({
                ...node,
                position: { x: node.x, y: node.y },
            })
        );

        return { nodes: flattenedArray, edges: elkGraph.edges ?? [] };
    }
}