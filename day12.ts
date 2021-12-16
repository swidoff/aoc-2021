import {readFileSync} from "fs";

export function readInput(): string {
    const buf = readFileSync("inputs/day12.txt");
    return buf.toString();
}

export function parseInput(input: string): Map<string, string[]> {
    let res = new Map();
    for (let line of input.split("\n")) {
        const [node1, node2] = line.split("-");
        addToPathMap(res, node1, node2);
        addToPathMap(res, node2, node1);
    }
    return res;
}

function addToPathMap(pathMap: Map<string, string[]>, node1: string, node2: string) {
    let ls = pathMap.get(node1);
    if (ls === undefined) {
        ls = []
        pathMap.set(node1, ls);
    }
    ls.push(node2);
}


export function countPaths(pathMap: Map<string, string[]>): number {
    let pathCount = 0;
    let q = [["", "start"]]
    let seen = new Set();

    while (q.length > 0) {
        const [path, node] = q.shift()!;
        let newPath = `${path},${node}`;
        if (seen.has(newPath)) {
            continue;
        }
        seen.add(newPath);

        if (node == "end") {
            pathCount++;
        } else if (pathMap.has(node)) {
            for (let n of pathMap.get(node)!) {
                if (n.toUpperCase() == n || countInPath(path, n) == 0) {
                    q.push([newPath, n])
                }
            }
        }
    }

    return pathCount;
}

export function countPathsExtraTime(pathMap: Map<string, string[]>): number {
    let pathCount = 0;
    let q: [string, string, boolean][] = [["", "start", false]]
    let seen = new Set();

    while (q.length > 0) {
        const [path, node, twice] = q.shift()!;
        let newPath = `${path},${node}`;
        if (seen.has(newPath)) {
            continue;
        }
        seen.add(newPath);

        if (node == "end") {
            pathCount++;
        } else if (pathMap.has(node)) {
            for (let n of pathMap.get(node)!) {
                if (n.toUpperCase() == n || countInPath(path, n) == 0) {
                    q.push([newPath, n, twice])
                } else if (n !== "start" && n !== "end" && countInPath(path, n) == 1 && !twice) {
                    q.push([newPath, n, true]);
                }
            }
        }
    }

    return pathCount;
}


function countInPath(path: string, n: string): number {
    let match = path.match(n);
    return match !== null ? match.length : 0;
}