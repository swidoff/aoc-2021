import PriorityQueue from "ts-priority-queue/src/PriorityQueue";
import _ from "lodash";

export class State {

    constructor(readonly rooms: number[][],
                readonly hallway: number[],
                readonly cost: number = 0) {
    }

    isComplete(): boolean {
        for (let room = 0; room < this.rooms.length; room++) {
            for (let pos = 0; pos < this.rooms[room].length; pos++) {
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

    isClearPath(room: number, pos: number, hallway: number): boolean {
        let roomHallway = (room + 1) * 2;
        if (roomHallway < hallway) {
            hallway -= 1;
        } else {
            hallway += 1;
        }

        // Room clear
        for (let i = this.rooms[room].length - 1; i > pos; i--) {
            if (this.rooms[room][i] > -1) {
                return false;
            }
        }

        // Hallway clear
        for (let i = Math.min(hallway, roomHallway); i <= Math.max(hallway, roomHallway); i++) {
            if (this.hallway[i] > -1) {
                return false;
            }
        }
        return true;
    }

    move(room: number, pos: number, hallway: number, fromRoom: boolean): State {
        let newHallway = _.cloneDeep(this.hallway);
        let newRooms = _.cloneDeep(this.rooms);
        let roomHallway = (room + 1) * 2;
        let amphipod = fromRoom ? newRooms[room][pos] : this.hallway[hallway]
        let hI = Math.min(hallway, roomHallway);
        let hJ = Math.max(hallway, roomHallway);
        let steps = (hJ - hI) + (this.rooms[room].length - pos);
        let newCost = Math.pow(10, amphipod) * steps + this.cost;
        newHallway[hallway] = fromRoom ? amphipod : -1;
        newRooms[room][pos] = fromRoom ? -1 : amphipod
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
                // The row is already complete
                if (_.every(state.rooms[room], r => r == room)) {
                    continue;
                }

                // Move from the top of the room to a free hallway space.
                for (let pos = state.rooms[room].length - 1; pos >= 0; pos--) {
                    if (state.rooms[room][pos] > -1 && (pos > 0 || state.rooms[room][pos] != room)) {
                        for (let hallway of [0, 1, 3, 5, 7, 9, 10]) {
                            if (state.hallway[hallway] == -1 && state.isClearPath(room, pos, hallway)) {
                                q.queue(state.move(room, pos, hallway, true));
                            }
                        }
                        break;
                    }
                }
            }

            // Move hallway amphipods into rooms.
            for (let hallway of [0, 1, 3, 5, 7, 9, 10]) {
                let amphipod = state.hallway[hallway];
                if (amphipod > -1) {
                    // Move from a hallway space to the room stack if the room stack has only amphipods of the room
                    // type.
                    for (let pos = 0; pos < state.rooms[amphipod].length; pos++) {
                        if (state.rooms[amphipod][pos] == -1
                            && state.isClearPath(amphipod, pos, hallway)
                            && _.every(state.rooms[amphipod], r => r == -1 || r == amphipod)) {
                            q.queue(state.move(amphipod, pos, hallway, false))
                            break;
                        }
                    }
                }
            }

            seen.add(key);
        }
    }

    return -1;
}
