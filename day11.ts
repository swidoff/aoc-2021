import {readFileSync} from "fs";

export function readInput(): string {
    const buf = readFileSync("inputs/day11.txt");
    return buf.toString();
}

export function parseInput(input: string): number[][] {
    return input.split("\n").map(line => line.split("").map(c => parseInt(c)));
}

export function countFlashes(input: number[][], steps: number = 100): number {
    const len = input[0].length;
    let flashes = 0

    for (let step = 0; step < steps; step++) {
        let flash: [number, number][] = [];

        // Increase energy levels by 1, record initial flashes
        for (let r = 0; r < len; r++) {
            for (let c = 0; c < len; c++) {
                input[r][c]++;
                if (input[r][c] == 10) {
                    flash.push([r, c]);
                }
            }
        }

        // Start flash cycles
        while (flash.length > 0) {
            const [r, c] = flash.shift()!;
            for (let nr = r - 1; nr <= r + 1; nr++) {
                for (let nc = c - 1; nc <= c + 1; nc++) {
                    if (!(nr == r && nc == c) && nr >= 0 && nc >= 0 && nr < len && nc < len) {
                        input[nr][nc]++;
                        if (input[nr][nc] == 10) {
                            flash.push([nr, nc]);
                        }
                    }
                }
            }
        }

        // Reset flashed to 0.
        for (let r = 0; r < len; r++) {
            for (let c = 0; c < len; c++) {
                if (input[r][c] > 9) {
                    input[r][c] = 0;
                    flashes++;
                }
            }
        }

        if ((step + 1) % 10 == 0) {
            printGrid(input, step + 1);
        }
    }

    return flashes;
}

export function stepsToSynchronized(input: number[][]): number {
    let steps = 0;
    while (!isSynced(input)) {
        countFlashes(input, 1);
        steps++;
    }
    return steps;
}

function isSynced(input: number[][]): boolean {
    const len = input[0].length;

    for (let r = 0; r < len; r++) {
        for (let c = 0; c < len; c++) {
            if (input[r][c] > 0) {
                return false;
            }
        }
    }
    return true;
}

function printGrid(input: number[][], step: number) {
    console.log("Step: " + step)
    console.log(input.map(line => line.join("")).join("\n"))
}