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

export interface ITrajectory {
    id: string;
    episode_object: IEpisode;
    version: string;
}