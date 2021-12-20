import {enhance, parseInput, printImage, readInput} from "./day20";

let example = "..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##" +
    "#..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###" +
    ".######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#." +
    ".#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#....." +
    ".#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.." +
    "...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#....." +
    "..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#\n" +
    "\n" +
    "#..#.\n" +
    "#....\n" +
    "##..#\n" +
    "..#..\n" +
    "..###";


test('part1 example', () => {
    let input = parseInput(example);
    printImage(input);
    expect(enhance(enhance(input)).lit).toEqual(35);
});

test('part1', () => {
    let input = parseInput(readInput());
    printImage(input);
    // 4924
    // 4921
    expect(enhance(enhance(input)).lit).toEqual(4917);
});

test('part2 example', () => {
    let input = parseInput(example);
    // printImage(input);
    for (let i = 0; i < 50; i++) {
        input = enhance(input);
    }

    expect(input.lit).toEqual(3351);
});

test('part2', () => {
    let input = parseInput(readInput());
    // printImage(input);
    for (let i = 0; i < 50; i++) {
        input = enhance(input);
    }

    expect(input.lit).toEqual(16389);
});