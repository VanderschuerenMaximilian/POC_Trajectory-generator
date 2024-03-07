import type { IStepNode, ICarouselData, IEventNode, IPhaseNode, ITrajectoryNode, IOptionNode, IOptionNodeLocation, IDataNodeLocation, IDatapointNode } from "$lib/components/types";
import type { ITrajectoryObject, IDatapointJSON, IEventJSON, IPhaseJSON, IStepJSON, IMainItemsJSON, IMainItemJSON, IOptionJSON } from "$lib/types";
import { TrajectoryTypes, TrajectoryNodeTypes, TrajectoryColors } from "$lib/enum";
import { type XYPosition, type Node, type Edge, Position } from "@xyflow/svelte";

const nodeConfig = { targetPosition: Position.Left, sourcePosition: Position.Right }
let count: number = 0;

export default class Extraction {
    position: XYPosition = { x: 0, y: 0 };
    nodes: Node[] = [];
    edges: Edge[] = [];
    stringList: string[] = ['history', 'trigger', 'diagnostic', 'diagnose', 'treatment', 'outcome', 'follow-up'];
    carouselItemsData: ICarouselData = {
        history: { nodes: [], edges: []},
        trigger: { nodes: [], edges: []},
        diagnostic: { nodes: [], edges: []},
        diagnose: { nodes: [], edges: []},
        treatment: { nodes: [], edges: []},
        outcome: { nodes: [], edges: []},
        'follow-up': { nodes: [], edges: []},
    }

    async extractFullTrajectory(trajectory: ITrajectoryObject, items: IMainItemsJSON): Promise<{ nodes: Node[]; edges: Edge[], carouselData: ICarouselData }> {
        this.reset()
        const { id: trajectoryId, version_number, episode_object } = trajectory
        const specifics: ITrajectoryNode = { id: trajectoryId, version_number, episode_object, color: TrajectoryColors.trajectory } 
        const node = await this.assembleNode(TrajectoryNodeTypes.trajectory, specifics)
        this.nodes = [...this.nodes, node]
        for (const step of items) await this.extractNodes(step, node.id)
        await this.assembleEdgesForCarouselData()
        return { nodes: this.nodes, edges: this.edges, carouselData: this.carouselItemsData }
    }

    private async extractNodes(item: IMainItemJSON, parentId: string): Promise<void> {
        if (item.type === TrajectoryTypes.event) return await this.extractFromEvent(item as IEventJSON, parentId)
        else return await this.extractFromPhase(item as IPhaseJSON, parentId)
    }

    private async extractFromEvent(event: IEventJSON, parentId: string): Promise<void> {
        const { options, ...eventInfo } = event
        const specificInfo: IEventNode = { event: eventInfo, color: TrajectoryColors.event}
        const id = this.assembleNodeAndReturnId(TrajectoryNodeTypes.event, specificInfo)
        this.assembleEdge(parentId, id)
        for (const opt of event.options) await this.extractFromOption(opt, id, event.name)
    }

    private async extractFromPhase(phase: IPhaseJSON, parentId: string): Promise<void> {
        const { steps, ...phaseInfo } = phase
        const specificInfo: IPhaseNode = { phase: phaseInfo, color: TrajectoryColors.phase }
        const id = this.assembleNodeAndReturnId(TrajectoryNodeTypes.phase, specificInfo)
        this.assembleEdge(parentId, id)
        for (const step of phase.steps) await this.extractFromStep(step, id, phase.name)
    }

    private async extractFromStep(step: IStepJSON, parentId: string, phaseName: string): Promise<void> {
        const { datapoints, ...stepInfo } = step
        const specificInfo: IStepNode = { step: stepInfo, phaseName: phaseName, color: TrajectoryColors.step }
        const id = this.assembleNodeAndReturnId(TrajectoryNodeTypes.step, specificInfo, datapoints)
        this.assembleEdge(parentId, id)
        for (const datapoint of step.datapoints) await this.extractFromDatapoint(datapoint, id, phaseName, step.name)
    }

    private async extractFromOption(opt: IOptionJSON, parentId: string, eventName: string): Promise<void> {
        const location: IOptionNodeLocation = { option: opt, type: TrajectoryTypes.option, eventName }
        const specificInfo: IOptionNode = { option: opt, location, eventName }
        const id = this.assembleNodeAndReturnId(TrajectoryNodeTypes.option, specificInfo)
        this.assembleEdge(parentId, id)
    }

    private async extractFromDatapoint(dp: IDatapointJSON, parentId: string, phaseName: string, stepName: string): Promise<void> {
        const location: IDataNodeLocation = { phaseName, stepName, datapoint: dp, type: TrajectoryTypes.datapoint }
        const specificInfo: IDatapointNode = { datapoint: dp, location }
        const id = this.assembleNodeAndReturnId(TrajectoryNodeTypes.datapoint, specificInfo)
        this.assembleEdge(parentId, id)
    }

    private getNodeId(): string {
        count++
        return count.toString()
    }

    // TODO: make a type for the child (right now it's only datapoints but who knows)
    private assignNodeToCarousel(node: Node, childs: any): void {
        const parentName = node.data.phaseName?  node.data.phaseName : node.data.eventName
        if (childs && node.data.step) node.data.step.datapoints = childs
        // node.position = { x: this.position.x, y: this.position.y}
        // this.changePosition()
        // TODO: Can I make this type safe?
        // @ts-expect-error
        this.carouselItemsData[parentName].nodes = [...this.carouselItemsData[parentName].nodes, node]
    }

    private assembleNodeAndReturnId(type: string, specifics: any, childs: any = []): string {
        const id = this.getNodeId()
        // this.changePositionFullTrajectory(type)
        const baseConfig = { id, type, position: this.position }
        const node: Node = { ...baseConfig, ...{ data: specifics }, ...nodeConfig }
        this.nodes = [...this.nodes, node]
        if (type === TrajectoryNodeTypes.step || type === TrajectoryNodeTypes.option) {
            if (childs) this.assignNodeToCarousel(node, childs)
        }
        return id
    }

    private async assembleEdgesForCarouselData() {
        let count = 0
        for (const string of this.stringList) {
            // @ts-expect-error
            const nodes = this.carouselItemsData[string].nodes
            for (const node of nodes) {
                count++
                if (nodes[count]) await this.assembleCarouselEdge(node.id, nodes[count].id, string)
            }
            count = 0
        }
    }

    private async assembleCarouselEdge(currentId: string, nextId: string, parentName: string){
        const edge: Edge = { id: crypto.randomUUID(), source: currentId, target: nextId, type: 'step' }
        // @ts-expect-error
        this.carouselItemsData[parentName].edges = [...this.carouselItemsData[parentName].edges, edge]
    }

    private assembleEdge(parentId: string, id: string): void {
        const edge: Edge = { id: crypto.randomUUID(), source: parentId, target: id, type: 'step' }
        this.edges = [...this.edges, edge]
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
        return node
    }

    private async changePosition() {
        if (this.position.x > 1000) this.position = { x: 0, y: this.position.y + 350 }
        else {
            this.position = { x: this.position.x + 350, y: this.position.y }
        }
    }

    private reset(): void {
        this.position = { x: 0, y: 0 };
        this.nodes = [];
        this.edges = [];
        count = 0;
    }
}