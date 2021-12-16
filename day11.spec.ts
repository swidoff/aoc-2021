import {countFlashes, parseInput, readInput, stepsToSynchronized} from "./day11";

let example1 = "11111\n" +
    "19991\n" +
    "19191\n" +
    "19991\n" +
    "11111";

let example2 = "5483143223\n" +
    "2745854711\n" +
    "5264556173\n" +
    "6141336146\n" +
    "6357385478\n" +
    "4167524645\n" +
    "2176841721\n" +
    "6882881134\n" +
    "4846848554\n" +
    "5283751526"

test('part1 example', () => {
    expect(countFlashes(parseInput(example1), 3)).toEqual(9);
    expect(countFlashes(parseInput(example2), 10)).toEqual(204);
    expect(countFlashes(parseInput(example2), 100)).toEqual(1656);
})


test('part1', () => {
    expect(countFlashes(parseInput(readInput()), 100)).toEqual(1647);
})

test('part2 example', () => {
    expect(stepsToSynchronized(parseInput(example2))).toEqual(195);
})

test('part2', () => {
    expect(stepsToSynchronized(parseInput(readInput()))).toEqual(348);
})