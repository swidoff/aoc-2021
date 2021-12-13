import {readFileSync} from 'fs';

export function readInput(): number[] {
    const buf = readFileSync("inputs/day1.txt");
    return parseInput(buf.toString());
}

export function parseInput(input: string): number[] {
    return input.split("\n").map((n: string) => Number.parseInt(n));
}

export function countAscending(depths: number[]): number {
    const [total, last] = depths.reduce(
        (prev: number[], current: number, currentIndex: number, array: number[]) => {
            const [total, last] = prev;
            let newTotal = current > last ? total + 1 : total;
            return [newTotal, current]
        }, [0, 1e6])
    return total;
}

export function tripleSums(depths: number[]): number[] {
    return depths.reduce(
        (sums: number[], current: number, currentIndex: number, array: number[]) => {
            if (currentIndex >= 2) {
                let sum = 0;
                for (let j = currentIndex - 2; j <= currentIndex; j++) {
                    sum += array[j];
                }
                sums.push(sum);
            }
            return sums;
        }, new Array<number>())
}

export function part1(): number {
    const input = readInput();
    return countAscending(input);
}