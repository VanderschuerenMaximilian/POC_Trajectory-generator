let count: number = 0;

enum NodeColors {
    trajectory = 'rgba(0, 150, 0, 0.75)',
    phase = 'crimson',
    event = '#62caed',
    step = 'hotpink',
    option = 'orange',
    datapoint = '#f3ee09'
}

export enum NodeTypes {
    trajectory = 'trajectory',
    phase = 'phase',
    event = 'event',
    step = 'step',
    option = 'option',
    datapoint = 'datapoint'
}

export default class SvelvetExtraction {
    nodes: any[] = []
    edges: any[] = []

    async configureTrajectory(trajectoryObject: any, items: any[]) {
        this.reset()
        const nodeId = await this.assembleNodeAndReturnId(NodeTypes.trajectory, NodeColors.trajectory, trajectoryObject)
        for (const item of items) await this.extractNodes(item, nodeId)
        return { nodes: this.nodes, edges: this.edges }
    }

    private async extractNodes(item: any, parentId: string) {
        if (item.type === NodeTypes.event) return await this.extractFromEvent(item, parentId)
        else return await this.extractFromPhase(item, parentId)
    }

    private async extractFromEvent(event: any, parentId: string) {
        const { options, ...eventInfo } = event
        const specificInfo: any = { event: eventInfo, parent: parentId }
        const id = await this.assembleNodeAndReturnId(NodeTypes.event, NodeColors.event, specificInfo)
        this.assembleEdge(parentId, id)
        // for (const opt of event.options) await this.extractFromOption(opt, id, event.name)
    }

    private async extractFromPhase(phase: any, parentId: string) {
        const { steps, ...phaseInfo } = phase
        const specificInfo: any = { phase: phaseInfo, parent: parentId }
        const id = await this.assembleNodeAndReturnId(NodeTypes.phase, NodeColors.phase, specificInfo)
        this.assembleEdge(parentId, id)
        // for (const step of phase.steps) await this.extractFromStep(step, id, phase.name)
    }

    private assembleEdge(parentId:string, target: string) {
        const edge = [target, `anchor-${parentId}-${target}`]
        this.edges = [...this.edges, edge]
    }

    private async assembleNodeAndReturnId(type: string, color: string, specifics: any) {
        const data = {...specifics, color: color}
        const id = this.getNodeId()
        const node = {
            id: id,
            type: type,
            data
        }
        this.nodes = [...this.nodes, node]
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