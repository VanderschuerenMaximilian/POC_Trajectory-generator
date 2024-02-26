import type { IEvent, IPhase, ITrajectory } from "$lib/components/types";

export default class JsonExtraction {
    
    async getTrajectory(
    json: any
    ): Promise<{ trajectory: ITrajectory; items: (IPhase | IEvent)[] }> {
    const trajectory = json.trajectory;
    return {
      trajectory: {
        id: trajectory.id,
        episode_object: trajectory.episode_object,
        version: trajectory.version_number,
      },
      items: trajectory.items,
    };
  }
}