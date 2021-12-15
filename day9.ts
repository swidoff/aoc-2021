import {readFileSync} from "fs";
import {Vector} from "prelude-ts";

export function readInput(): string {
    const buf = readFileSync("inputs/day9.txt");
    return buf.toString();
}

export function parseInput(input: string): number[][] {
    return input.split("\n").map(line => line.split("").map(c => parseInt(c)))
}

function isLowPoint(heightMap: number[][], row: number, col: number): boolean {
    let val = heightMap[row][col]
    return (row <= 0 || heightMap[row - 1][col] > val) && (row == heightMap.length - 1 || heightMap[row + 1][col] > val) &&
        (col <= 0 || heightMap[row][col - 1] > val) && (col == heightMap[row].length - 1 || heightMap[row][col + 1] > val)
}

export function sumOfRiskLevels(heightMap: number[][]): number {
    let sum = 0;
    for (let r = 0; r < heightMap.length; r++) {
        for (let c = 0; c < heightMap[r].length; c++) {
            if (isLowPoint(heightMap, r, c)) {
                sum += heightMap[r][c] + 1
            }
        }
    }

    return sum;
}

function sizeOfBasin(heightMap: number[][], row: number, col: number): number {
    // Perform a bfs adding all points surrounding the low point.
    // The point is in the basin if it is less than every surrounding point that is not in the basin.
    let q = Vector.of([row, col])
    let basin = new Set<number>();
    let numRows = heightMap.length;
    let numCols = heightMap[0].length;

    while (!q.isEmpty()) {
        let [r, c] = q.head().getOrThrow();
        q = q.tail().getOrThrow();

        let value = heightMap[r][c];
        if (value == 9) {
            continue;
        }

        let surroundingPoints = Vector.of([r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1])
            .filter(([nr, nc]) => nr >= 0 && nr < numRows && nc >= 0 && nc < numCols)
            .filter(([nr, nc]) => !basin.has(nr * numCols + nc))

        if (surroundingPoints.allMatch(([nr, nc]) => heightMap[nr][nc] >= value)) {
            basin.add(r * numCols + c);
            q = q.appendAll(surroundingPoints).sortOn(([nr, nc]) => heightMap[nr][nc])
        }
    }

    return basin.size;
}

export function prodOfBasinSizes(heightMap: number[][]): number {
    let basins = []
    for (let r = 0; r < heightMap.length; r++) {
        for (let c = 0; c < heightMap[r].length; c++) {
            basins.push(sizeOfBasin(heightMap, r, c))
        }
    }

    basins = basins.sort((a, b) => a - b)
    return basins.pop()! * basins.pop()! * basins.pop()!;
}