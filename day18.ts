import {readFileSync} from "fs";
import _ from "lodash";

export function readInput(): string {
    const buf = readFileSync("inputs/day18.txt");
    return buf.toString();
}

type Token = number | string

export function parseInput(input: string): Token[][] {
    return input.split("\n").map(l => parseInputLine(l));
}

export function parseInputLine(input: string): Token[] {
    return input.split("").map(c => {
        if (c === "[" || c === "," || c === "]") {
            return c;
        } else {
            return parseInt(c);
        }
    });
}

export function add(n1: Token[], n2: Token[]): Token[] {
    let n = _.concat("[", n1, ",", n2, "]")
    while (explode(n) || split(n)) ;
    return n
}

export function explode(n: Token[]): boolean {
    let level = 0;
    let exploded = false;
    for (let i = 0; i < n.length; i++) {
        let c = n[i]
        if (c === "[") {
            level++;
        } else if (c == "]") {
            level--;
        } else if (typeof c === "number" && level == 5) {
            let l = c;
            let r = n[i + 2];
            if (typeof r !== "number") {
                throw TypeError();
            }
            for (let j = i - 1; j >= 0; j--) {
                let o = n[j];
                if (typeof o == "number") {
                    n[j] = o + l;
                    break;
                }
            }
            for (let j = i + 3; j < n.length; j++) {
                let o = n[j];
                if (typeof o == "number") {
                    n[j] = o + r;
                    break;
                }
            }
            n.splice(i - 1, 5, 0);
            exploded = true;
            break;
        }
    }
    return exploded;
}

export function split(n: Token[]): boolean {
    let split = false;
    for (let i = 0; i < n.length; i++) {
        let c = n[i]
        if (typeof c === "number" && c > 9) {
            let l = Math.floor(c / 2);
            let r = Math.ceil(c / 2);
            n.splice(i, 1, "[", l, ",", r, "]");
            split = true;
            break;
        }
    }
    return split;
}

export function magnitude(n: Token[]): number {
    while (n.length > 1) {
        for (let i = 0; i <= n.length - 5; i++) {
            let [a, b, c, d, e] = n.slice(i, i + 5);
            if (a == "[" && c == "," && e == "]" && typeof b === "number" && typeof d === "number") {
                let magnitude = 3 * b + 2 * d;
                n.splice(i, 5, magnitude);
                break;
            }
        }
    }
    return <number>n[0];
}

export function largestMagnitudeSumOfPairs(numbers: Token[][]): number {
    let max = 0;
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            max = Math.max(max, magnitude(add(numbers[i], numbers[j])), magnitude(add(numbers[j], numbers[i])));
        }
    }
    return max;
}
