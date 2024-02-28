import type { Node, XYPosition } from "@xyflow/svelte"
import type { IConcept, IDatapoint } from "./types"

export interface IStepNode {
    label?: string
    description?: string
    date_range_before?: number
    date_range_after?: number
    repeat?: any
    domain?: string
    datapoints?: IDatapoint[]
}