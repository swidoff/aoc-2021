import {readFileSync} from "fs";
import {HashSet, Vector} from "prelude-ts";

export function readInput(): string {
    const buf = readFileSync("inputs/day22.txt");
    return buf.toString();
}

type Step = {
    on: boolean,
    cube: number[][]
}

export function parseInput(input: string): Step[] {
    return input.split("\n").map(line => {
        let [on_off, coords] = line.split(" ");
        let on = on_off === "on";
        let pairs = coords.split(",").map(pair => {
            return pair.split("=")[1].split("..").map(n => parseInt(n));
        });
        let corners = [
            [pairs[0][0], pairs[1][0], pairs[2][0]],
            [pairs[0][1], pairs[1][1], pairs[2][1]]
        ]
        return {on: on, cube: corners};
    })
}

export function initialize(steps: Step[]): number {
    let set = HashSet.empty();
    for (let step of steps) {
        let [x1, y1, z1] = step.cube[0];
        let [x2, y2, z2] = step.cube[1];
        for (let x = Math.max(x1, -50); x <= Math.min(x2, 50); x++) {
            for (let y = Math.max(y1, -50); y <= Math.min(y2, 50); y++) {
                for (let z = Math.max(z1, -50); z <= Math.min(z2, 50); z++) {
                    let p = Vector.of(x, y, z);
                    if (step.on) {
                        set = set.add(p);
                    } else if (set.contains(p)) {
                        set = set.remove(p)
                    }
                }
            }
        }
    }
    return set.length();
}


function dimension(cube: number[][]): number {
    let [x1, y1, z1] = cube[0];
    let [x2, y2, z2] = cube[1];
    return (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1) * (Math.abs(z2 - z1) + 1);
}

function find_overlap(cube1: number[][], cube2: number[][]): number[][] | undefined {
    let [x11, y11, z11] = cube1[0];
    let [x12, y12, z12] = cube1[1];

    let [x21, y21, z21] = cube2[0];
    let [x22, y22, z22] = cube2[1];

    let overlap = [
        [Math.max(x11, x21), Math.max(y11, y21), Math.max(z11, z21)],
        [Math.min(x12, x22), Math.min(y12, y22), Math.min(z12, z22)]
    ]
    return (overlap[0][0] <= overlap[1][0] && overlap[0][1] <= overlap[1][1] && overlap[0][2] <= overlap[1][2]) ?
        overlap :
        undefined;
}

export function subtract_overlap(cube1: number[][], cube2: number[][]): number[][][] {
    // Create a bunch of new cubes from cube1 with cube2 removed.
    let overlap = find_overlap(cube1, cube2);
    if (typeof overlap === "undefined") {
        return [cube1];
    }

    let [[xo1, yo1, zo1], [xo2, yo2, zo2]] = overlap;
    let res = []

    let [x11, y11, z11] = cube1[0];
    let [x12, y12, z12] = cube1[1];
    let xIntervals = [[x11, xo1 - 1], [xo1, xo2], [xo2 + 1, x12]]
    let yIntervals = [[y11, yo1 - 1], [yo1, yo2], [yo2 + 1, y12]]
    let zIntervals = [[z11, zo1 - 1], [zo1, zo2], [zo2 + 1, z12]]
    for (let [xi1, xi2] of xIntervals) {
        for (let [yi1, yi2] of yIntervals) {
            for (let [zi1, zi2] of zIntervals) {
                if (xi1 <= xi2 && yi1 <= yi2 && zi1 <= zi2 &&
                    !(xi1 == xo1 && xi2 == xo2 && yi1 == yo1 && yi2 == yo2 && zi1 == zo1 && zi2 == zo2)) {
                    res.push([[xi1, yi1, zi1], [xi2, yi2, zi2]])
                }
            }
        }
    }
    return res;
}

export function size_minus_overlap(step: Step, above_steps: Step[]): number {
    let pieces = [step.cube];
    for (let other_step of above_steps) {
        let newPieces: number[][][] = [];
        for (let piece of pieces) {
            newPieces = newPieces.concat(subtract_overlap(piece, other_step.cube));
        }
        pieces = newPieces;
    }
    return pieces.map(p => dimension(p)).reduce((d1, d2) => d1 + d2, 0);
}

export function reboot(steps: Step[]): number {
    // Algo:
    // Work backward from the list.
    // If a step is on, look through all actions above it on the stack and subtract out the overlap. Add the remainder
    // to the count.
    // An "off" step doesn't affect the count directly, other than subtracting from those cubes underneath it.
    let count = 0;
    for (let i = steps.length - 1; i >= 0; i--) {
        let step = steps[i]
        if (step.on) {
            let on_count = size_minus_overlap(step, steps.slice(i + 1))
            count += on_count;
        }
    }
    return count;
}
