export class PerkData {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.majorChangePatchVersion = data.majorChangePatchVersion;
    this.tooltip = data.tooltip;
    this.shortDesc = data.shortDesc;
    this.longDesc = data.longDesc;
    this.recommendationDescriptor = data.recommendationDescriptor;
    this.iconPath = data.iconPath;
    this.endOfGameStatDescs = data.endOfGameStatDescs;
    this.recommendationDescriptorAttributes =
      data.recommendationDescriptorAttributes;
  }
}
