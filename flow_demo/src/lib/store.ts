import type { Node, Edge } from "@xyflow/svelte";
import { writable } from "svelte/store";
import type { ICarouselItem, IEventJSON, IPhaseJSON, ITrajectoryObject } from "./types";
import type { ICarouselData, IEdge, INode } from "./components/types";

export const nodes = writable<Node[]>([])
export const edges = writable<Edge[]>([])

// in use while refactoring
export const nodesRefactoring = writable<Node[]>([])
export const edgesRefactoring = writable<Edge[]>([])
export const carousel = writable<ICarouselItem[]>([])
export const carouselData = writable<ICarouselData>()
export const activeCarouselItemName = writable<string>("history")


// TODO: change types on every writable below
export const svelvetNodes =  writable<any>()
export const svelvetEdges = writable<any>()

export const trajectory = writable<ITrajectoryObject>()
export const items = writable<(IPhaseJSON|IEventJSON)[]>()
export const activeItem = writable<IPhaseJSON|IEventJSON>()