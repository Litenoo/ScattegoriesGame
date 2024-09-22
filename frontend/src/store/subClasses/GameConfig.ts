import characterSet from "../alphabet.json";

class Settings {
    constructor(
        public maxPlayersQuantity = 10,
        public playTimeInSeconds = 90,
        public roundsQuantity = 10,
    ) { }

    public set setMaxPlayerQuantity(value: number) {
        this.maxPlayersQuantity = value;
    }
    public set setPlayTimeInSeconds(value: number) {
        this.playTimeInSeconds = value;
    }
    public set setRoundsQuantity(value: number) {
        this.maxPlayersQuantity = value;
    }
}

export default class defaultConfig {
    readonly settings = new Settings();
    readonly characters: string[] = characterSet.alphabet;
    private _categories: string[] = ["City", "Country", "River"];

    public get getSettings(): Settings {
        return this.settings;
    }

    public set setCategories(categories: string[]) {
        this._categories = categories;
    }

    public get getCategories() {
        return this._categories;
    }

    public pushCategory(category: string): void {
        this._categories.push(category);
    }

    public removeCategory(category: string): void {
        const index = this._categories.findIndex(current => current === category);
        if (index !== -1) {
            this._categories.splice(index, 1);
        }
    }

    public switchCharacter(character: string): void {
        const index = this.characters.findIndex(current => current === character);
        if (character.length === 1) {
            if (index !== -1) {
                this.characters.splice(index, 1);
            } else {
                this.characters.push(character);
            }
        }
        console.log(this.characters)
    }
}