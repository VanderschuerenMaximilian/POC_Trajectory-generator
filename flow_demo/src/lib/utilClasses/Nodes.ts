import { type XYPosition, type Node, type Edge, Position } from "@xyflow/svelte";

const nodeConfig = { targetPosition: Position.Left, sourcePosition: Position.Right }
let count: number = 0;

export default class Extraction {
    position: XYPosition = { x: 0, y: 0 };
    steps: Node[] = [];
    options: Node[] = [];
    stepsEdges: Edge[] = [];
    optionsEdges: Edge[] = [];

    async extractSteps(steps: any) {
        this.reset()
        for (const step of steps) await this.assembleFlow('phase', step)
        return { steps: this.steps, stepsEdges: this.stepsEdges }
    }

    async extractOptions(options: any) {
        this.reset()
        for (const option of options) await this.assembleFlow('event', option)
    }

    private async assembleFlow(type: any, item: any) {
        if (type === 'phase') {
            await this.assembleStep(item)
        } else if (type === 'event') {
            await this.assembleOption(item)
        }
    }   

    private async assembleStep(step: any) {
        const specifics = {
            label: step.name,
            description: step.description,
            date_range_before: step.date_range_before,
            date_range_after: step.date_range_after,
            repeat: step.repeat? step.repeat : null,
            domain: step.concept.domain_name,
            datapoints: step.datapoints,
        } 
        const node = await this.assembleNode('stepNode', specifics)
        if (this.steps.length >= 1) this.assembleStepEdge((parseInt(node.id) - 1).toString(), node.id)
        this.steps = [...this.steps, node]
    }

    private async assembleOption(option: any) {
        this.reset()
        console.log('still working on function "assebleOption"')
    }

    private async assembleNode(type: string, specifics: any): Promise<Node> {
        const id = count++
        const baseConfig = {
            id: id.toString(),
            type,
            position: this.position,
            dragHandle: '.header',
        }
        const node: Node = { ...baseConfig, ...{ data: specifics }, ...nodeConfig }
        // this.position = { x: this.position.x + 350, y: this.position.y }
        this.changePosition()
        return node
    }

    private async changePosition() {
        if (this.position.x > 1000) this.position = { x: 0, y: this.position.y + 350 }
        else {
            this.position = { x: this.position.x + 350, y: this.position.y }
        }
    }

    private assembleStepEdge(parentId: any, targetId: any): void {
        const edge: Edge = { id: crypto.randomUUID(), source: parentId, target: targetId, type: 'step' }
        console.log('edge', edge)
        this.stepsEdges = [...this.stepsEdges, edge]
    }

    private reset(): void {
        this.position = { x: 0, y: 0 };
        this.steps = [];
        this.options = [];
        this.stepsEdges = [];
        this.optionsEdges = [];
        count = 0;
    }
}