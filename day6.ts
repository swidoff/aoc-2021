import {readFileSync} from "fs";

export function readInput(): string {
    const buf = readFileSync("inputs/day6.txt");
    return buf.toString();
}

export function parseInput(input: string): number[] {
    let res = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i of input.split(",")) {
        res[Number.parseInt(i)] += 1
    }
    return res
}

export function simulateLanternFish(timerCounts: number[], days: number = 80): number {
    for (let day = 0; day < days; day++) {
        let newTimerCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0];

        newTimerCounts[6] = timerCounts[0]; // Counters reset after 0.
        newTimerCounts[8] = timerCounts[0]; // New lantern fish are born.

        // Decrement all other counters.
        for (let i = 1; i <= 8; i++) {
            newTimerCounts[i - 1] += timerCounts[i];
        }

        timerCounts = newTimerCounts;
    }

    return timerCounts.reduce((s, v) => s + v, 0)
}

