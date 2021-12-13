import {followCommands, parseInput, readInput} from "./day2";

const example = "forward 5\n" +
    "down 5\n" +
    "forward 8\n" +
    "up 3\n" +
    "down 8\n" +
    "forward 2";

test('part1 example', () => {
    const {horizontal, depth} = followCommands(parseInput(example))
    expect(horizontal * depth).toEqual(150);
})

test('part1', () => {
    const {horizontal, depth} = followCommands(parseInput(readInput()))
    console.log(horizontal * depth);
})

test('part2 example', () => {
    const {horizontal, depth} = followCommands(parseInput(example), true)
    expect(horizontal * depth).toEqual(900);
})

test('part2', () => {
    const {horizontal, depth} = followCommands(parseInput(readInput()), true)
    console.log(horizontal * depth);
})