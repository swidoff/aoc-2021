import {readFileSync} from "fs";

export function readInput(): string {
    const buf = readFileSync("inputs/day3.txt");
    return buf.toString();
}

export function parseInput(input: string): string[] {
    return input.split("\n");
}

function mostCommonValue(input: string[], digits: number, i: number): number {
    let sum = input.reduce((sum: number, line: string): number => {
        sum += line[i] === '0' ? -1 : 1;
        return sum;
    }, 0);
    return sum >= 0 ? 1 : 0;
}

export function powerConsumption(input: string[]): number {
    const digits = input[0].length;
    let gammaRate = 0;
    let epsilonRate = 0;
    for (let i = 0; i < digits; i++) {
        let value = mostCommonValue(input, digits, digits - i - 1);
        if (value == 1) {
            gammaRate += Math.pow(2, i);
        } else {
            epsilonRate += Math.pow(2, i);
        }
    }

    return gammaRate * epsilonRate;
}

export function lifeSupport(input: string[]): number {
    function rating(filterCondition: "most common" | "least common"): number {
        const digits = input[0].length;
        let remaining = input;
        for (let i = 0; i < digits && remaining.length > 1; i++) {
            let value = mostCommonValue(remaining, digits, i);
            let keep = (filterCondition == "most common" ? value : value ^ 1).toString()
            remaining = remaining.filter((v) => v[i] === keep)
        }
        return Number.parseInt(remaining[0], 2);
    }

    const oxygenRating = rating("most common");
    const co2Rating = rating("least common")
    return oxygenRating * co2Rating;
}
