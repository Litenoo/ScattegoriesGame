import { RefreshPlayersResponse, RoomMate } from "@/classes/serverResponses";
import { ref, Ref } from "vue";
import socket from "@/socket";

export interface Answear {
    category: string;
    answear: Ref<string>;
}

export default class Room {
    private roomId: string | null = null;
    private players: RoomMate[] = [];
    private _answears: Answear[] = [];
    public time: Ref<number> = ref(0);

    constructor(){
        console.log(this.time);
    }

    public leaveRoom() {
        this.roomId = null;
        this.players = [];
    }

    public updateRoom(roomData: RefreshPlayersResponse) {
        this.players = roomData.players;
        this.roomId = roomData.id;
    }

    public setupAnswears(categories: string[]) {
        this._answears = categories.map((category) => ({ category: category, answear: ref("") })); // ERROR .map is not a function
    }

    public commitAnswears() {
        socket.emit("AnswearsEmit", this.answears);
    }

    public timeInterval(){
        if(this.time.value > 0){
            setTimeout(()=>{
                this.time.value++;
                this.timeInterval();
            }, 1000);
        }
    }

    public setTime(time: number) {
        if (this.time && typeof this.time.value === 'number') {
            this.time.value = time;
            this.timeInterval();
        } else {
            console.error('this.time is not a ref.', this.time);
        }
    }

    // public get time(){
    //     return this._time;
    // }

    public get answears(): Answear[] {
        return this._answears;
    }

    public get roomMates() {
        return this.players;
    }

    public get id() {
        return this.roomId;
    }
}