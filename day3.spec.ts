import {lifeSupport, parseInput, powerConsumption, readInput} from "./day3";

const example = "00100\n" +
    "11110\n" +
    "10110\n" +
    "10111\n" +
    "10101\n" +
    "01111\n" +
    "00111\n" +
    "11100\n" +
    "10000\n" +
    "11001\n" +
    "00010\n" +
    "01010";

test('part1 example', () => {
    const input = parseInput(example);
    expect(powerConsumption(input)).toEqual(198);
})

test('part1', () => {
    const input = parseInput(readInput());
    let res = powerConsumption(input);
    console.log(res);
})

test('part2 example', () => {
    const input = parseInput(example);
    expect(lifeSupport(input)).toEqual(230);
})

test('part2', () => {
    const input = parseInput(readInput());
    console.log(lifeSupport(input));
})
