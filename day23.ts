import PriorityQueue from "ts-priority-queue/src/PriorityQueue";
import _ from "lodash";

export class State {

    constructor(readonly rooms: number[][],
                readonly hallway: number[],
                readonly cost: number = 0) {
    }

    isComplete(): boolean {
        for (let room = 0; room < this.rooms.length; room++) {
            for (let pos = 0; pos < 2; pos++) {
                if (this.rooms[room][pos] != room) {
                    return false;
                }
            }
        }
        return true;
    }

    key(): string {
        return `${this.rooms.join(",")}${this.hallway.join(',')}`
    }

    isClearPath(room: number, hallway: number): boolean {
        let roomHallway = (room + 1) * 2;
        if (roomHallway < hallway) {
            hallway -= 1;
        } else {
            hallway += 1;
        }

        for (let i = Math.min(hallway, roomHallway); i <= Math.max(hallway, roomHallway); i++) {
            if (this.hallway[i] > -1) {
                return false;
            }
        }
        return true;
    }

    moveToHallway(room: number, pos: number, hallway: number): State {
        let newHallway = _.cloneDeep(this.hallway);
        let newRooms = _.cloneDeep(this.rooms);
        let amphipod = newRooms[room][pos];
        let roomHallway = (room + 1) * 2;
        let hI = Math.min(hallway, roomHallway);
        let hJ = Math.max(hallway, roomHallway);
        let steps = (hJ - hI) + (2 - pos);
        let newCost = Math.pow(10, amphipod) * steps + this.cost;
        newHallway[hallway] = amphipod;
        newRooms[room][pos] = -1;
        return new State(newRooms, newHallway, newCost);
    }

    moveToRoom(room: number, pos: number, hallway: number): State {
        let newHallway = _.cloneDeep(this.hallway);
        let newRooms = _.cloneDeep(this.rooms);
        let amphipod = this.hallway[hallway];
        let roomHallway = (room + 1) * 2;
        let hI = Math.min(hallway, roomHallway);
        let hJ = Math.max(hallway, roomHallway);
        let steps = (hJ - hI) + (2 - pos);
        let newCost = Math.pow(10, amphipod) * steps + this.cost;
        newHallway[hallway] = -1;
        newRooms[room][pos] = amphipod;
        return new State(newRooms, newHallway, newCost);
    }
}

export function orderAmphipods(initial: State): number {
    let seen = new Set();
    let q = new PriorityQueue<State>({comparator: (s1, s2) => s1.cost - s2.cost})
    q.queue(initial)

    while (q.length > 0) {
        let state = q.dequeue();
        if (state.isComplete()) {
            return state.cost;
        } else {
            let key = state.key();
            if (seen.has(key)) {
                continue;
            }

            // Move room amphipods into the hallway.
            for (let room = 0; room < state.rooms.length; room++) {
                if (state.rooms[room][0] == room && state.rooms[room][1] == room) {
                    continue;
                }
                if (state.rooms[room][1] > -1) {
                    for (let hallway of [0, 1, 3, 5, 7, 9, 10]) {
                        if (state.hallway[hallway] == -1 && state.isClearPath(room, hallway)) {
                            q.queue(state.moveToHallway(room, 1, hallway));
                        }
                    }
                } else if (state.rooms[room][0] > -1 && state.rooms[room][0] != room) {
                    for (let hallway of [0, 1, 3, 5, 7, 9, 10]) {
                        if (state.hallway[hallway] == -1 && state.isClearPath(room, hallway)) {
                            q.queue(state.moveToHallway(room, 0, hallway));
                        }
                    }
                }
            }

            // Move hallway amphipods into rooms.
            for (let hallway of [0, 1, 3, 5, 7, 9, 10]) {
                let amphipod = state.hallway[hallway];
                if (amphipod > -1) {
                    if (state.rooms[amphipod][0] == -1 && state.rooms[amphipod][1] == -1 && state.isClearPath(amphipod, hallway)) {
                        q.queue(state.moveToRoom(amphipod, 0, hallway));
                    } else if (state.rooms[amphipod][1] == -1 && state.isClearPath(amphipod, hallway)) {
                        q.queue(state.moveToRoom(amphipod, 1, hallway));
                    }
                }
            }

            seen.add(key);
        }
    }

    return -1;
}
