export class SpellData {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.cooldown = data.cooldown;
    this.iconPath = data.iconPath;
    this.gameModes = data.gameModes;
  }
}
