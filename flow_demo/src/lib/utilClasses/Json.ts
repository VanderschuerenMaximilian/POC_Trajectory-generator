import type { ITrajectoryJSON, ITrajectoryObject, IMainItemsJSON, IEventJSON, IPhaseJSON, ICarouselItem } from "$lib/types";
import { TrajectoryTypes } from '$lib/enum';

export default class JsonExtraction {
    trajectory: ITrajectoryJSON | null = null;
    carouselItems: ICarouselItem[] = [];

    async getTrajectoryFromJSON(
    json: any
    ): Promise<{ trajectoryObject: ITrajectoryObject; items: IMainItemsJSON, carouselItems: ICarouselItem[] }> {
    this.trajectory = json.trajectory;
    if (!this.trajectory) throw new Error("No trajectory found in the JSON");
    await this.extractCarouselItems();
    return {
      trajectoryObject: {
        id: this.trajectory.id,
        episode_object: this.trajectory.episode_object,
        version_number: this.trajectory.version_number,
      },
      items: this.trajectory.items,
      carouselItems: this.carouselItems,
    };
  }

  private async extractCarouselItems() {
    const items = this.trajectory?.items;
    if (!items) throw new Error("No items found in the JSON");
    for (let item of items) {
      // TODO: make this typing better
      if (item.type === TrajectoryTypes.event) await this.extractEventJSON(item as IEventJSON);
      else await this.extractPhaseJSON(item as IPhaseJSON);
    }
  }

  private async extractEventJSON(event: IEventJSON) {
    const { options, ...eventInfo } = event;
    this.carouselItems.push(eventInfo);
  }

  private async extractPhaseJSON(phase: IPhaseJSON) {
    const { steps, ...phaseInfo } = phase;
    this.carouselItems.push(phaseInfo);
  }
}