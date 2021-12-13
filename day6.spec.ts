import {parseInput, readInput, simulateLanternFish} from "./day6";

const example = "3,4,3,1,2";

test('part1 example', () => {
    const input = parseInput(example);
    expect(simulateLanternFish(input)).toEqual(5934);
})

test('part1', () => {
    const input = parseInput(readInput());
    expect(simulateLanternFish(input)).toEqual(391671);
})

test('part2 example', () => {
    const input = parseInput(example);
    expect(simulateLanternFish(input, 256)).toEqual(26984457539);
})

test('part2', () => {
    const input = parseInput(readInput());
    expect(simulateLanternFish(input, 256)).toEqual(1754000560399);
})