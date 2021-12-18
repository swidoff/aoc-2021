import {readFileSync} from "fs";
import {HashMap, HashSet, Vector} from "prelude-ts";

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

/** This is just Dijkstra's shortest path algorithm... */
export function lowestTotalRisk(cave: Cave): number {
    let origin = Vector.of(0, 0);
    let q = HashSet.of(origin)
    let risk = HashMap.of([origin, 0]);
    let seen = HashSet.empty();
    const n = cave.dim;

    let res = 0
    while (!q.isEmpty()) {
        let pt = q.minOn(v => risk.get(v).getOrThrow()).getOrThrow();
        let [r, c] = pt.toArray();

        if (r == n - 1 && c == n - 1) {
            res = risk.get(pt).getOrThrow();
            break;
        }

        q = q.remove(pt);

        if (seen.contains(pt)) {
            continue;
        }
        seen = seen.add(pt);

        for (let [nr, nc] of [[r + 1, c], [r, c + 1]/*, [r - 1, c], [r, c - 1]*/]) {
            let newPt = Vector.of(nr, nc);
            if (/*nr >= 0 && nc >= 0 && */nr < n && nc < n) {
                let newRisk = risk.get(pt).getOrThrow() + cave.risk(nr, nc);
                if (newRisk < risk.get(newPt).getOrElse(1e100)) {
                    risk = risk.put(newPt, newRisk);
                    q = q.add(newPt);
                }
            }
        }
    }

    return res;
}

