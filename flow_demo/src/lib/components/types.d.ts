import type { TrajectoryColors, TrajectoryTypes } from "$lib/enum";
import type { IConcept, ISource, IRepeat, IEpisodeJSON, IEventJSON, IItem, IStepJSON, IDatapointJSON } from "$lib/types";
import { type Node, type Edge } from "@xyflow/svelte";
import { type ElkExtendedEdge, type ElkNode } from "elkjs";

export interface ICarouselData {
    history: ICarouselDataItem;
    trigger: ICarouselDataItem;
    diagnostic: ICarouselDataItem;
    diagnose: ICarouselDataItem;
    treatment: ICarouselDataItem;
    outcome: ICarouselDataItem;
    'follow-up': ICarouselDataItem;
}

export interface ICarouselDataItem {
    nodes: ICarouselDataItemNode[];
    edges: IEdge[];
}

export type ICarouselDataItemNode = IStepNode | IOptionNode;

export interface IDatapointNode extends INode {
    datapoint: IDatapointNodeData
    location: IDataNodeLocation   
}

export type IDatapointNodeData = IDatapointJSON

export interface IDataNodeLocation {
    datapoint: IDatapointNodeData
    phaseName: string
    stepName: string
    type: TrajectoryTypes
}

export interface IStepNode extends INode {
    phaseName: string
    step: IStepNodeData
    color: TrajectoryColors
}

export interface IStepNodeData {
  name: string
  description: string
  concept: IConcept
  source?: ISource
  repeat?: IRepeat
  required?: boolean
  date_range_after?: number
  date_range_before?: number
  datapoints?: IDatapointJSON[]
}

export interface IOptionNode extends INode {
    option: IOptionNodeData
    location: IOptionNodeLocation
    eventName: string
}

export interface IOptionNodeData {
  name: string
  description: string
  concept: IConcept
  catalog: any // TODO: make catalog interface
}

export interface IOptionNodeLocation {
  eventName: string
  option: IOptionNodeData
  type: TrajectoryTypes
}

export interface IPhaseNode extends INode {
    phase: IItem
    color: TrajectoryColors
}

export interface IEventNode extends INode {
    event: IItem
    color: TrajectoryColors
}

export interface ITrajectoryNode extends INode {
    id: number
    version_number: string
    episode_object: IEpisodeJSON
    color: TrajectoryColors
}

export type IEdge = Edge | ElkExtendedEdge;

export type INode = Node | ElkNode;

export interface ITrajectoryObj {
    id: string;
    title: string;
    description: string;
    version: string;
    domain: string;
}