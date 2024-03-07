import type { Node, Edge } from "@xyflow/svelte";
import { writable } from "svelte/store";
import type { ICarouselItem, IMainItemsJSON, ITrajectoryObject } from "./types";
import type { ICarouselData } from "./components/types";

export const nodes = writable<Node[]>([])
export const edges = writable<Edge[]>([])
export const carousel = writable<ICarouselItem[]>([])
export const carouselData = writable<ICarouselData>()
export const activeCarouselItemName = writable<string>("history")
export const trajectory = writable<ITrajectoryObject>()
export const items = writable<IMainItemsJSON>()


// TODO: make interfaces for svelvet
export const svelvetNodes =  writable<any>()
export const svelvetEdges = writable<any>()
