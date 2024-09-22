import nicknames from "@/store/nicknames.json";
import axios from "axios";
import { useGameConfigStore } from "@/store/store";
import { ref, Ref } from "vue";

const store = useGameConfigStore();

export interface Answear {
    category: string;
    answear: string;
}

export default class Player {
    private username: string | undefined;
    private userId: string | undefined;
    private isHost: boolean = false;
    public answears: Ref<Answear>[] = store.gameConfig.getCategories.map((category: string) => ref({ category: category, answear: "" }));

    public async init(username: string | undefined) {
        await this.generateUserId();
        this.setUsername(username);
    }

    private async generateUserId(): Promise<void> {
        try {
            const response = await axios.get<string>("http://localhost:3000/userId"); // think about putting link in .env file
            const newUserId = response.data;
            this.userId = newUserId;
        } catch (err) {
            console.log(err);
        }
    }

    public setUsername(newUsername: string | undefined = undefined) {
        this.username = newUsername ? newUsername : randomName();

        function randomName() {
            const name = nicknames.adjectives[Math.floor(Math.random() * nicknames.adjectives.length)] +
                nicknames.animals[Math.floor(Math.random() * nicknames.animals.length)];
            return name;
        }
    }

    public set setIsHost(isHost: boolean) {
        this.isHost = isHost;
    }

    public get getUsername() {
        return this.username;
    }

    public get getIsHost() {
        return this.isHost;
    }

    public get getUserId() {
        return this.userId;
    }
}