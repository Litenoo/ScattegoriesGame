import { ref } from "vue";
import characterSet from "../store/alphabet.json";

class Settings {
    constructor(
        public maxPlayersQuantity = ref(10),
        public playTimeInSeconds = ref(90),
        public roundsQuantity = ref(10),
    ) { }
}

export default class defaultConfig {
    private settings = new Settings();
    readonly characters: string[] = characterSet.alphabet;
    readonly categories: string[] = ["City", "Country", "River"];

    public get getSettings(): Settings {
        return this.settings;
    }

    public pushCategory(category: string): void {
        this.categories.push(category);
    }

    public removeCategory(category: string): void {
        const index = this.categories.findIndex(current => current === category);
        if (index !== -1) {
            this.categories.splice(index, 1);
        }
    }

    public switchCharacter(character: string): void {
        const index = this.characters.findIndex(current => current === character);
        if (character.length === 1) {
            if (index !== -1) {
                this.characters.splice(index, 1)
            } else {
                this.characters.push(character);
            }
        }
        console.log(this.characters)
    }

    public get settingsRefs(){
        return this.settings;
    }
}