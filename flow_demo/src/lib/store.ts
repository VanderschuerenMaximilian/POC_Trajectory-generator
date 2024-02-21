import type { Node, Edge } from "@xyflow/svelte";
import { writable } from "svelte/store";
import { initialNodes, initialEdges } from "./nodes-and-edges";

export const nodes = writable<Node[]>(initialNodes)
export const edges = writable<Edge[]>(initialEdges)