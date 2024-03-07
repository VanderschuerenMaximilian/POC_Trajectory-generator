export interface IDatapointJSON {
    name: string
    description: string
    concept: IConcept
    source?: ISource    
    required?: boolean
    date_range_after?: number
    date_range_before?: number
    catalog?: any // TODO: define catalog type (it's alot, see original repo)
}

export interface IStepJSON {
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

export interface IOptionJSON {
  name: string
  description: string
  concept: IConcept
  catalog: any // TODO: define catalog type (it's alot, see original repo)
}

// export interface ICarouselItem {
//     name: string;
//     type: string;
// }

export type IMainItemsJSON = (IEventJSON | IPhaseJSON)[]

export type IMainItemJSON = IEventJSON | IPhaseJSON

export type ICarouselItem = IItem

export interface IEventJSON extends IItem {
    options: any[];
}

export interface IPhaseJSON extends IItem {
    steps: any[];
}

export interface IItem {
    name: string;
    type: string;
}

export interface ISource {
  usagi_query: string
  etl_query: string
  available: boolean
}

export interface IRepeat {
  value: boolean
  description?: string
}

export interface IConcept {
    domain_name: string;
}

export interface IEpisodeJSON {
    name: string;
    description: string;
    concept: IConcept;
}

export interface ITrajectoryJSON {
    id: number;
    episode_object: IEpisode;
    version_number: string;
    items: IMainItemsJSON;
}

export interface ITrajectoryObject {
    id: number;
    episode_object: IEpisodeJSON;
    version_number: string;
}