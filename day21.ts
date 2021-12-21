import _ from "lodash";

export function deterministicPlay(startPos1: number, startPos2: number): number {
    let die = 1;
    let pos = [startPos1, startPos2];
    let score = [0, 0];
    let turn = 0;
    let rolls = 0;

    while (score[0] < 1000 && score[1] < 1000) {
        let roll = 0;
        for (let j = 0; j < 3; j++) {
            roll += die;
            die = die % 100 + 1;
            rolls++;
        }
        pos[turn] = (pos[turn] + roll - 1) % 10 + 1
        score[turn] += pos[turn];
        turn = (turn + 1) % 2;
    }

    return Math.min(score[0], score[1]) * rolls;
}


export function quantumPlay(pos: number[],
                            scores: number[] = [0, 0],
                            turn: number = 0,
                            cache: Map<String, number[]> = new Map()): number[] {
    let state = `${pos.join(",")},${scores.join(",")},${turn}`;
    if (cache.has(state)) {
        return cache.get(state)!;
    } else {
        let res: number[];
        if (scores[0] >= 21) {
            res = [1, 0];
        } else if (scores[1] >= 21) {
            res = [0, 1];
        } else {
            res = [0, 0]
            for (let roll1 = 1; roll1 <= 3; roll1++) {
                for (let roll2 = 1; roll2 <= 3; roll2++) {
                    for (let roll3 = 1; roll3 <= 3; roll3++) {
                        let newPos = _.clone(pos);
                        let newScores = _.clone(scores);
                        newPos[turn] = (pos[turn] + roll1 + roll2 + roll3 - 1) % 10 + 1;
                        newScores[turn] += newPos[turn];

                        let universe = quantumPlay(newPos, newScores, (turn + 1) % 2, cache);
                        res[0] += universe[0];
                        res[1] += universe[1];
                    }
                }
            }
        }

        cache.set(state, res);
        return res;
    }
}

