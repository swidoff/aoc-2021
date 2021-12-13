import {readFileSync} from 'fs';

export function readInput(): number[] {
    const buf = readFileSync("inputs/day1.txt");
    return parseInput(buf.toString());
}

export function parseInput(input: string): number[] {
    return input.split("\n").map((n: string) => Number.parseInt(n));
}

export function countAscending(depths: number[]): number {
    return depths.reduce(
        (count: number, current: number, currentIndex: number, array: number[]) => {
            return currentIndex > 0 && array[currentIndex] > array[currentIndex - 1] ? count + 1 : count;
        }, 0);
}

export function tripleSums(depths: number[]): number[] {
    const [sums, _buf, _sum] = depths.reduce(
        (prev, current: number) => {
            const [sums, buf, sum] = prev;
            let newSum = sum + current;
            buf.push(current);
            if (buf.length > 3) {
                newSum -= buf.shift()!;
            }
            if (buf.length == 3) {
                sums.push(newSum)
            }
            return [sums, buf, newSum];
        }, [new Array<number>(), new Array<number>(), 0]);
    return sums;
}