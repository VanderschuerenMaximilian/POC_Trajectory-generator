import { TrajectoryColors, TrajectoryTypes } from "$lib/enum";
let count: number = 0;

export default class SvelvetExtraction {
    nodes: any[] = []
    edges: any[] = []

    async configureTrajectory(trajectoryObject: any, items: any[]) {
        this.reset()
        const nodeId = await this.assembleNodeAndReturnId(TrajectoryTypes.trajectory, TrajectoryColors.trajectory, trajectoryObject)
        for (const item of items) await this.extractNodes(item, nodeId)
        return { nodes: this.nodes, edges: this.edges }
    }

    private async extractNodes(item: any, parentId: string) {
        if (item.type === TrajectoryTypes.event) return await this.extractFromEvent(item, parentId)
        else return await this.extractFromPhase(item, parentId)
    }

    private async extractFromEvent(event: any, parentId: string) {
        const { options, ...eventInfo } = event
        const specificInfo: any = { event: eventInfo, parent: parentId }
        const id = await this.assembleNodeAndReturnId(TrajectoryTypes.event, TrajectoryColors.event, specificInfo)
        this.assembleEdge(parentId, id)
        for (const opt of event.options) await this.extractFromOption(opt, id, event.name)
    }

    private async extractFromPhase(phase: any, parentId: string) {
        const { steps, ...phaseInfo } = phase
        const specificInfo: any = { phase: phaseInfo, parent: parentId }
        const id = await this.assembleNodeAndReturnId(TrajectoryTypes.phase, TrajectoryColors.phase, specificInfo)
        this.assembleEdge(parentId, id)
        for (const step of phase.steps) await this.extractFromStep(step, id, phase.name)
    }

    private async extractFromOption(option: any, parentId: string, phaseName: string) {
        const specificInfo: any = { option, parent: parentId, phase: phaseName }
        const id = await this.assembleNodeAndReturnId(TrajectoryTypes.option, TrajectoryColors.option, specificInfo)
        this.assembleEdge(parentId, id)
    }

    private async extractFromStep(step: any, parentId: string, phaseName: string) {
        const { datapoints, ...stepInfo } = step
        const specificInfo: any = { step:stepInfo, parent: parentId, phase: phaseName }
        const id = await this.assembleNodeAndReturnId(TrajectoryTypes.step, TrajectoryColors.step, specificInfo)
        this.assembleEdge(parentId, id)
        for (const datapoint of step.datapoints) await this.extractFromDatapoint(datapoint, id, phaseName, step.name)
    }

    private async extractFromDatapoint(datapoint: any, parentId: string, phaseName: string, stepName: string) {
        const specificInfo: any = { datapoint, parent: parentId, phase: phaseName, step: stepName }
        const id = await this.assembleNodeAndReturnId(TrajectoryTypes.datapoint, TrajectoryColors.datapoint, specificInfo)
        this.assembleEdge(parentId, id)
    }


    private assembleEdge(parentId:string, target: string) {
        const edge = [target, `anchor-${parentId}-${target}`]
        this.edges.push(edge)
    }

    private async assembleNodeAndReturnId(type: string, color: string, specifics: any) {
        const data = {...specifics, color: color}
        const id = this.getNodeId()
        const node = { id, type: type, data}
        this.nodes.push(node)
        return id
    }

    private getNodeId(): string {
        count++
        return count.toString()
    }

    private reset() {
        count = 0
        this.nodes = []
        this.edges = []
    }
}