import {readFileSync} from "fs";

export function readInput(): string {
    const buf = readFileSync("inputs/day5.txt");
    return buf.toString();
}

type Point = {
    x: number,
    y: number
}
type Line = [Point, Point]

export function parseInput(input: string): Line[] {
    let res = new Array<Line>();
    for (let line of input.split("\n")) {
        const [lhs, rhs] = line.split(" -> ");
        let [x1, y1] = lhs.split(",").map((v) => Number.parseInt(v));
        let [x2, y2] = rhs.split(",").map((v) => Number.parseInt(v));
        res.push([{x: x1, y: y1}, {x: x2, y: y2}])
    }
    return res
}

export function countCoveredPoints1(lines: Line[], includeDiag: boolean = false): number {
    let overlapping = new Map<string, number>();

    function incrementCount(x: number, y: number) {
        let p = `${x},${y}`;
        let count = overlapping.get(p)
        let newCount = (count === undefined) ? 1 : count + 1;
        overlapping.set(p, newCount);
    }

    for (const line of lines) {
        const [{x: x1, y: y1}, {x: x2, y: y2}] = line;
        if (includeDiag || (x1 == x2) || (y1 === y2)) {
            let deltaX = x1 - x2;
            let deltaY = y1 - y2;
            for (let i = 0; i <= Math.max(Math.abs(deltaX), Math.abs(deltaY)); i++) {
                incrementCount(x1 - i * Math.sign(deltaX), y1 - i * Math.sign(deltaY));
            }
        }
    }

    let count = 0;
    for (const value of overlapping.values()) {
        if (value > 1) {
            count += 1
        }
    }

    return count;
}
