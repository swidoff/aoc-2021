import {readFileSync} from "fs";
import {HashMap} from "prelude-ts";

export function readInput(): string {
    const buf = readFileSync("inputs/day10.txt");
    return buf.toString();
}

export function parseInput(input: string): string[] {
    return input.split("\n");
}

export function syntaxErrorScore(inputs: string[]): number {
    return inputs.map(line => illegalLineScore(line)).reduce((s1, s2) => s1 + s2, 0);
}

const CloseChars: HashMap<string, [string, number]> = HashMap.of([")", ["(", 3]], ["]", ["[", 57]], ["}", ["{", 1197]], [">", ["<", 25137]]);

function illegalLineScore(line: string): number {
    let stack = [];
    for (let i = 0; i < line.length; i++) {
        let c = line.charAt(i);
        let closeChar = CloseChars.get(c)
        if (closeChar.isSome()) {
            let [openChar, score] = closeChar.getOrThrow();
            let top = stack.pop()!
            if (top === undefined || top !== openChar) {
                return score;
            }
        } else {
            stack.push(c);
        }
    }

    return 0;
}

export function autocorrectScore(inputs: string[]): number {
    let scores = inputs.filter(line => illegalLineScore(line) == 0)
        .map(line => autocorrectLineScore(line))
        .sort((a, b) => a - b);
    return scores[Math.floor(scores.length / 2)];
}

const OpenChars = HashMap.of(["(", 1], ["[", 2], ["{", 3], ["<", 4]);

function autocorrectLineScore(line: string): number {
    let stack = [];
    for (let i = 0; i < line.length; i++) {
        let c = line.charAt(i);
        let closeChar = CloseChars.get(c)
        if (closeChar.isSome()) {
            let openChar = closeChar.getOrThrow()[0];
            let top = stack.pop()!
            if (top === undefined || top !== openChar) {
                return 0;
            }
        } else {
            stack.push(c);
        }
    }

    return stack.reverse().reduce((score, char) => score * 5 + OpenChars.get(char).getOrThrow(), 0);
}

