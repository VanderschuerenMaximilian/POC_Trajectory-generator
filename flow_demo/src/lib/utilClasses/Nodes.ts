import type { IStepNode } from "$lib/components/nodes/types";
import type { IDatapoint, IEvent, IPhase, IStep, ITrajectory } from "$lib/components/types";
import { type XYPosition, type Node, type Edge, Position } from "@xyflow/svelte";

const nodeConfig = { targetPosition: Position.Left, sourcePosition: Position.Right }
let count: number = 0;

export default class Extraction {
    position: XYPosition = { x: 0, y: 0 };
    // for full trajectory
    nodes: Node[] = [];
    edges: Edge[] = [];
    // for header trajectory
    steps: Node[] = [];
    options: Node[] = [];
    stepsEdges: Edge[] = [];
    optionsEdges: Edge[] = [];

    async extractFullTrajectory(trajectory: ITrajectory, items: (IPhase|IEvent)[]): Promise<{ nodes: Node[]; edges: Edge[]}> {
        this.reset()
        const { id: trajectoryId, version, episode_object } = trajectory
        const specifics = { id: trajectoryId, version, episode_object } 
        const node = await this.assembleNode('trajectoryNode', specifics)
        this.nodes = [...this.nodes, node]
        for (const step of items) await this.extractNodes(step, node.id)
        return { nodes: this.nodes, edges: this.edges }
    }

    async extractSteps(steps: any) {
        this.reset()
        for (const step of steps) await this.assembleFlow('phase', step)
        return { steps: this.steps, stepsEdges: this.stepsEdges }
    }

    async extractOptions(options: any) {
        this.reset()
        for (const option of options) await this.assembleFlow('event', option)
    }

    // functions for full trajectory 

    private async extractNodes(item: IEvent | IPhase, parentId: string) {
        if (item.type === 'event') return await this.extractFromEvent(item as IEvent, parentId)
        else return await this.extractFromPhase(item as IPhase, parentId)
    }

    private async extractFromEvent(event: IEvent, parentId: string) {
        // TODO: make event node interface
        const specificInfo: any = { event }
        const id = this.assembleNodeAndReturnId('eventNode', specificInfo)
        this.assembleEdge(parentId, id)
        // for (const opt of event.options) await this.extractFromOption(opt, color, id, event.name)
    }

    private async extractFromPhase(phase: IPhase, parentId: string) {
        // TODO: make phase node interface
        const specificInfo: any = { phase }
        const id = this.assembleNodeAndReturnId('phaseNode', specificInfo)
        this.assembleEdge(parentId, id)
        for (const step of phase.steps) await this.extractFromStep(step, id, phase.name)
    }

    private async extractFromStep(step: IStep, parentId: string, phaseName: string) {
        // TODO: make step node interface
        const specificInfo: any = { step, phaseName }
        const id = this.assembleNodeAndReturnId('stepNode', specificInfo)
        this.assembleEdge(parentId, id)
        for (const datapoint of step.datapoints) await this.extractFromDatapoint(datapoint, id, phaseName, step.name)
    }

    private async extractFromDatapoint(
        dp: IDatapoint,
        parentId: string,
        phaseName: string,
        stepName: string
    ) {
        // TODO: make datapointlocation interface
        const location: any = { phaseName, stepName, datapoint: dp, type: 'datapoint' }
        // TODO: make datapoint node interface
        const specificInfo: any = { datapoint: dp, location }
        const id = this.assembleNodeAndReturnId('datapointNode', specificInfo)
        this.assembleEdge(parentId, id)
    }

    private getNodeId(): string {
        count++
        return count.toString()
    }

    private assembleNodeAndReturnId(type: string, specifics: object): string {
        const id = this.getNodeId()
        this.changePositionFullTrajectory(type)
        const baseConfig = { id, type, position: this.position }
        const node: Node = { ...baseConfig, ...{ data: specifics }, ...nodeConfig }
        this.nodes = [...this.nodes, node]
        return id
    }

    private assembleEdge(parentId: string, id: string): void {
        const edge: Edge = { id: crypto.randomUUID(), source: parentId, target: id }
        this.edges = [...this.edges, edge]
    }

    // end of functions for full trajectory

    // functions for header trajectory

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

    private async changePositionFullTrajectory(type: string) {
        if (type === 'phaseNode' || type === 'eventNode') {
            this.position = { x: this.position.x + 350, y: 350 }
        } else if (type === 'stepNode') {
            this.position = { x: this.position.x + 350, y: 700 }
        } else if (type === 'datapointNode') {
            this.position = { x: this.position.x + 350, y: 1050 }
        }
    }

    private assembleStepEdge(parentId: any, targetId: any): void {
        const edge: Edge = { id: crypto.randomUUID(), source: parentId, target: targetId, type: 'step' }
        this.stepsEdges = [...this.stepsEdges, edge]
    }

    // end of functions for header trajectory

    private reset(): void {
        this.position = { x: 0, y: 0 };
        this.nodes = [];
        this.edges = [];
        this.steps = [];
        this.options = [];
        this.stepsEdges = [];
        this.optionsEdges = [];
        count = 0;
    }
}