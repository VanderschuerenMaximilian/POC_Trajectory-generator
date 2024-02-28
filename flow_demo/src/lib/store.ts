import type { Node, Edge } from "@xyflow/svelte";
import { writable } from "svelte/store";
import { initialNodes, initialEdges } from "./nodes-and-edges";
import type { IEvent, IPhase, ITrajectory } from "./components/types";

// export const nodes = writable<Node[]>(initialNodes)
export const nodes = writable<Node[]>([])
// export const edges = writable<Edge[]>(initialEdges)
export const edges = writable<Edge[]>([])

export const trajectory = writable<ITrajectory>()
export const items = writable<(IPhase|IEvent)[]>()
export const activeItem = writable<IPhase|IEvent>()