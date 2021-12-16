import {countPaths, countPathsExtraTime, parseInput, readInput} from "./day12";

let example1 = "start-A\n" +
    "start-b\n" +
    "A-c\n" +
    "A-b\n" +
    "b-d\n" +
    "A-end\n" +
    "b-end";

let example2 = "dc-end\n" +
    "HN-start\n" +
    "start-kj\n" +
    "dc-start\n" +
    "dc-HN\n" +
    "LN-dc\n" +
    "HN-end\n" +
    "kj-sa\n" +
    "kj-HN\n" +
    "kj-dc";

let example3 = "fs-end\n" +
    "he-DX\n" +
    "fs-he\n" +
    "start-DX\n" +
    "pj-DX\n" +
    "end-zg\n" +
    "zg-sl\n" +
    "zg-pj\n" +
    "pj-he\n" +
    "RW-he\n" +
    "fs-DX\n" +
    "pj-RW\n" +
    "zg-RW\n" +
    "start-pj\n" +
    "he-WI\n" +
    "zg-he\n" +
    "pj-fs\n" +
    "start-RW";

test('part1 example', () => {
    expect(countPaths(parseInput(example1))).toEqual(10);
    expect(countPaths(parseInput(example2))).toEqual(19);
    expect(countPaths(parseInput(example3))).toEqual(226);
})

test('part1', () => {
    expect(countPaths(parseInput(readInput()))).toEqual(5333);
})

test('part2 example', () => {
    expect(countPathsExtraTime(parseInput(example1))).toEqual(36);
    expect(countPathsExtraTime(parseInput(example2))).toEqual(103);
    expect(countPathsExtraTime(parseInput(example3))).toEqual(3509);
})

test('part2', () => {
    expect(countPathsExtraTime(parseInput(readInput()))).toEqual(146553);
})

