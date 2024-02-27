export interface IDatapoint {
    name: string
    description: string
    concept: IConcept
    source?: any // TODO: define source type
    required?: boolean
    date_range_after?: number
    date_range_before?: number
    catalog?: any // TODO: define catalog type
}

export interface IStep {
    name: string
    description: string
    concept: IConcept
    source?: ISource
    repeat?: IRepeat
    required?: boolean
    date_range_after?: number
    date_range_before?: number
    datapoints: IDatapoint[]
}

export interface IEvent extends IItem {
    options: any[];
}

export interface IPhase extends IItem {
    steps: any[];
}

export interface IItem {
    name: string;
    type: string;
}

export interface IConcept {
    domain_name: string;
}

export interface IEpisode {
    name: string;
    description: string;
    concept: IConcept;
}

export interface ITrajectoryObj {
    id: string;
    title: string;
    description: string;
    version: string;
    domain: string;
}

export interface ITrajectory {
    id: string;
    episode_object: IEpisode;
    version: string;
}