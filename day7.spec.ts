import {leastCostToAlign, parseInput, readInput} from "./day7";

const example = "16,1,2,0,4,2,7,1,2,14";

test('part1 example', () => {
    const input = parseInput(example);
    expect(leastCostToAlign(input)).toEqual(37);
})

test('part1', () => {
    const input = parseInput(readInput());
    expect(leastCostToAlign(input)).toEqual(328262);
})

test('part2 example', () => {
    const input = parseInput(example);
    expect(leastCostToAlign(input, "increasing")).toEqual(168);
})

test('part1', () => {
    const input = parseInput(readInput());
    expect(leastCostToAlign(input, "increasing")).toEqual(90040997);
})