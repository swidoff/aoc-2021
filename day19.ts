import {readFileSync} from "fs";
import {fieldsHashCode, HasEquals, HashSet} from "prelude-ts";

export function readInput(): string {
    const buf = readFileSync("inputs/day19.txt");
    return buf.toString();
}

export class Point implements HasEquals {
    constructor(readonly x: number, readonly y: number, readonly z: number, private readonly hash: number = 0) {
        this.hash = fieldsHashCode(this.x, this.y, this.z);
    }

    equals(other: any): boolean {
        return (other instanceof Point) && other.x == this.x && other.y == this.y && other.z == this.z;
    }

    hashCode(): number {
        return this.hash;
    }
}

export function parseInput(input: string): Point[][] {
    let res: Point[][] = [];
    let lines = input.split("\n");
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.startsWith("--")) {
            res.push([])
        } else if (line !== "") {
            let [x, y, z] = line.split(",").map(n => parseInt(n))
            res[res.length - 1].push(new Point(x, y, z))
        }
    }
    return res;
}

type OverlapsResult = {
    overlaps: boolean,
    beacons: HashSet<Point>
    scannerPos: Point
}

export function overlaps(beacons: HashSet<Point>, scanner: Point[], required: number = 12): OverlapsResult {
    // There is definitely a better way to do this...
    for (let source of beacons) {
        for (let target of scanner) {
            let dx = source.x - target.x, dy = source.y - target.y, dz = source.z - target.z;
            let intersection = scanner.reduce((sum, b) => {
                let newBeacon = new Point(b.x + dx, b.y + dy, b.z + dz)
                return sum + (beacons.contains(newBeacon) ? 1 : 0);
            }, 0);

            if (intersection >= required) {
                return {
                    overlaps: true,
                    beacons: HashSet.ofIterable(scanner.map(b => new Point(b.x + dx, b.y + dy, b.z + dz))),
                    scannerPos: new Point(dx, dy, dz)
                };
            }
        }
    }
    return {overlaps: false, beacons: beacons, scannerPos: new Point(0, 0, 0)};
}

type Transform = (beacon: Point) => Point

let flips: Transform[] = [
    (b) => new Point(b.x, b.y, b.z),
    (b) => new Point(-b.x, b.y, b.z),
    (b) => new Point(b.x, -b.y, b.z),
    (b) => new Point(b.x, b.y, -b.z),
    (b) => new Point(-b.x, b.y, -b.z),
    (b) => new Point(-b.x, -b.y, b.z),
    (b) => new Point(b.x, -b.y, -b.z),
    (b) => new Point(-b.x, -b.y, -b.z),
]

let rotations: Transform[] = [
    (b) => new Point(b.x, b.y, b.z),
    (b) => new Point(b.x, b.z, b.y),
    (b) => new Point(b.y, b.x, b.z),
    (b) => new Point(b.y, b.z, b.x),
    (b) => new Point(b.z, b.y, b.x),
    (b) => new Point(b.z, b.x, b.y),
]

export function transformBeacons(scanner: Point[]): Point[][] {
    let res = []
    for (let flip of flips) {
        for (let rotation of rotations) {
            res.push(scanner.map(flip).map(rotation))
        }
    }
    return res
}

type BeaconMap = {
    beacons: HashSet<Point>,
    scanners: Point[]
}

export function mapBeacons(input: Point[][]): BeaconMap {
    let beacons: HashSet<Point> = HashSet.empty();
    let scanners = [];
    let q = [HashSet.ofIterable(input[0])];
    let remaining = [];
    for (let i = 1; i < input.length; i++) {
        remaining.push(transformBeacons(input[i]));
    }

    input.shift();
    while (q.length > 0) {
        let beaconList = q.shift()!;
        beacons = beacons.addAll(beaconList);

        let toRemove = []
        for (let i = 0; i < remaining.length; i++) {
            for (let transformed of remaining[i]) {
                let res = overlaps(beaconList, transformed);
                if (res.overlaps) {
                    q.push(res.beacons);
                    scanners.push(res.scannerPos);
                    toRemove.push(i);
                    break;
                }
            }
        }

        for (let i of toRemove.sort((a, b) => a - b).reverse()) {
            remaining.splice(i, 1);
        }
    }
    return {beacons: beacons, scanners: scanners};
}

/** Part 1 **/
export function countBeacons(scannerBeacons: Point[][]): number {
    let res = mapBeacons(scannerBeacons);
    return res.beacons.length();
}

/** Part 2 **/
export function maxScannerDistance(scannerBeacons: Point[][]): number {
    let res = mapBeacons(scannerBeacons);
    let scanners = res.scanners;
    let maxDistance = 0;
    for (let i = 0; i < scanners.length; i++) {
        for (let j = i + 1; j < scanners.length; j++) {
            let distance =
                Math.abs(scanners[i].x - scanners[j].x) +
                Math.abs(scanners[i].y - scanners[j].y) +
                Math.abs(scanners[i].z - scanners[j].z);
            maxDistance = Math.max(maxDistance, distance);
        }
    }
    return maxDistance;
}
