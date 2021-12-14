import {readFileSync} from "fs";

export function readInput(): string {
    const buf = readFileSync("inputs/day7.txt");
    return buf.toString();
}

/**
 * Returns a map of position to count at that position.
 */
export function parseInput(input: string): Map<number, number> {
    let numbers = input.split(",").map((v) => Number.parseInt(v));
    return numbers.reduce((m, v) => {
        let count = m.get(v)
        let newCount = (count === undefined) ? 1 : count + 1;
        m.set(v, newCount)
        return m
    }, new Map<number, number>())
}

function costToAlign(crabs: Map<number, number>, targetPos: number, costFunction: (distance: number) => number): number {
    let cost = 0
    for (let [pos, count] of crabs.entries()) {
        cost += count * costFunction(Math.abs(pos - targetPos));
    }
    return cost
}

export function leastCostToAlign(crabs: Map<number, number>, cost: "constant" | "increasing" = "constant"): number {
    let costFunction = cost === "constant" ? (v: number) => v : (v: number) => v * (v + 1) / 2

    let minPos = 1e100;
    let maxPos = 0;
    for (let pos of crabs.keys()) {
        minPos = Math.min(pos, minPos);
        maxPos = Math.max(pos, maxPos);
    }

    let leastCost = 1e100;
    for (let pos = minPos; pos <= maxPos; pos++) {
        leastCost = Math.min(leastCost, costToAlign(crabs, pos, costFunction))
    }
    return leastCost
}