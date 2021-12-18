import {ExtendedCave, lowestTotalRisk, parseInput, readInput, SimpleCave} from "./day15";

let example1 = parseInput("1163751742\n" +
    "1381373672\n" +
    "2136511328\n" +
    "3694931569\n" +
    "7463417111\n" +
    "1319128137\n" +
    "1359912421\n" +
    "3125421639\n" +
    "1293138521\n" +
    "2311944581");


test('part1 example', () => {
    expect(lowestTotalRisk(new SimpleCave(example1))).toEqual(40);
})

test('part1', () => {
    expect(lowestTotalRisk(new SimpleCave(parseInput(readInput())))).toEqual(702);
})

test('part2 example', () => {
    expect(lowestTotalRisk(new ExtendedCave(example1))).toEqual(315);
})

test('part2', () => {
    expect(lowestTotalRisk(new ExtendedCave(parseInput(readInput())))).toEqual(702);
})