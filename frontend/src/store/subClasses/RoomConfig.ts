import { RefreshPlayersResponse, RoomMate } from "@/classes/serverResponses";
import { ref, Ref } from "vue";
import socket from "@/socket";
import { serverVotingResponse } from "shared/interfaces/voting";

export interface Answer {
    category: string;
    answer: Ref<string>;
}

export default class Room {
    private roomId: string | null = null;
    private players: RoomMate[] = [];
    private _answers: Answer[] = [];
    public time: Ref<number> = ref(0);
    private _currentVotingLabel: string[] = []; //put interfaces there

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
        this._answers = categories.map((category) => ({ category: category, answer: ref("") })); // ERROR .map is not a function
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

    public set updateVotingLabel(playersAnswears: string[] ){ 
        this._currentVotingLabel = playersAnswears;
    }

    public get votingLabel(){
        return this._currentVotingLabel;
    }

    // public get time(){
    //     return this._time;
    // }

    public get answears(): Answer[] {
        return this._answers;
    }

    public get roomMates() {
        return this.players;
    }

    public get id() {
        return this.roomId;
    }
}