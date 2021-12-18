import {readFileSync} from "fs";
import {HashMap, Vector} from "prelude-ts";
import PriorityQueue from "ts-priority-queue/src/PriorityQueue";

export function readInput(): string {
    const buf = readFileSync("inputs/day15.txt");
    return buf.toString();
}

export function parseInput(input: string): number[][] {
    return input.split("\n").map(line => line.split("").map(c => parseInt(c)));
}

interface Cave {
    dim: number
    risk(r: number, c: number): number
}

export class SimpleCave implements Cave {
    dim: number

    constructor(readonly input: number[][]) {
        this.dim = input.length
    }

    risk(r: number, c: number): number {
        return this.input[r][c];
    }
}

export class ExtendedCave implements Cave {
    dim: number

    constructor(readonly input: number[][]) {
        this.dim = input.length * 5
    }

    risk(r: number, c: number): number {
        const nr = r % this.input.length;
        const mr = Math.floor(r / this.input.length);
        const nc = c % this.input.length;
        const mc = Math.floor(c / this.input.length);

        let res = this.input[nr][nc] + mr + mc;
        return res < 10 ? res : res % 9;
    }
}

type Point = Vector<number>;

/** This is just Dijkstra's shortest path algorithm... */
export function lowestTotalRisk(cave: Cave): number {
    const n = cave.dim;
    let origin = Vector.of(0, 0);
    let risk = HashMap.of([origin, 0]);
    let q = new PriorityQueue<[Point, number]>({comparator: (v1, v2) => v1[1] - v2[1]})
    q.queue([origin, 0]);

    let res = 0
    while (q.length > 0) {
        let [pt, totalRisk] = q.dequeue();
        let [r, c] = pt.toArray();

        if (r == n - 1 && c == n - 1) {
            res = totalRisk;
            break;
        }

        for (let [nr, nc] of [[r + 1, c], [r, c + 1], [r - 1, c], [r, c - 1]]) {
            let newPt = Vector.of(nr, nc);
            if (nr >= 0 && nc >= 0 && nr < n && nc < n) {
                let newRisk = risk.get(pt).getOrThrow() + cave.risk(nr, nc);
                if (newRisk < risk.get(newPt).getOrElse(1e100)) {
                    risk = risk.put(newPt, newRisk);
                    q.queue([newPt, newRisk]);
                }
            }
        }
    }

    return res;
}

