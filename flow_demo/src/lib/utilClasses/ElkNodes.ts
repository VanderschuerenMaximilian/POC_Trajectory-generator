import { flattenArray } from '$lib/utils';
import ELK, { type ElkExtendedEdge, type ElkNode, type LayoutOptions } from 'elkjs'

const elk = new ELK();
const elkOptions: LayoutOptions = {
    'elk.algorithm': 'mrtree',
    'elk.spacing.nodeNode': '280',
    'elk.direction': 'DOWN', 
}

export default class ElkExtraction {

    async getTreeLayout(nodes: any[], edges: any[]): Promise<{ nodes: ElkNode[], edges: ElkExtendedEdge[] }> {
        const transformedNodes = nodes.map((node) => ({
        ...node,
        children: node.data.children ?? [],
        layoutOptions: elkOptions,
        }));

        const graph = {
            id: 'root',
            layoutOptions: elkOptions,
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