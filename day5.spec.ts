import {countCoveredPoints1, parseInput, readInput} from "./day5";

const example = "0,9 -> 5,9\n" +
    "8,0 -> 0,8\n" +
    "9,4 -> 3,4\n" +
    "2,2 -> 2,1\n" +
    "7,0 -> 7,4\n" +
    "6,4 -> 2,0\n" +
    "0,9 -> 2,9\n" +
    "3,4 -> 1,4\n" +
    "0,0 -> 8,8\n" +
    "5,5 -> 8,2";

test('part1 example', () => {
    const lines = parseInput(example);
    expect(countCoveredPoints1(lines)).toEqual(5);
})

test('part1', () => {
    const lines = parseInput(readInput());
    expect(countCoveredPoints1(lines)).toEqual(7644);
})

test('part2 example', () => {
    const lines = parseInput(example);
    expect(countCoveredPoints1(lines, true)).toEqual(12);
})

test('part2', () => {
    // Too low: 18610
    const lines = parseInput(readInput());
    expect(countCoveredPoints1(lines, true)).toEqual(18627);
})
