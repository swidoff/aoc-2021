import {fold1, foldN, parseInput, printDots, readInput} from "./day13";

let example1 = "6,10\n" +
    "0,14\n" +
    "9,10\n" +
    "0,3\n" +
    "10,4\n" +
    "4,11\n" +
    "6,0\n" +
    "6,12\n" +
    "4,1\n" +
    "0,13\n" +
    "10,12\n" +
    "3,4\n" +
    "3,0\n" +
    "8,4\n" +
    "1,10\n" +
    "2,14\n" +
    "8,10\n" +
    "9,0\n" +
    "\n" +
    "fold along y=7\n" +
    "fold along x=5";

test('part1 example', () => {
    let input = parseInput(example1);
    printDots(input.dots)
    let res = fold1(input);
    printDots(res.dots)
    expect(res.dots.length()).toEqual(17);
})

test('part1', () => {
    let input = parseInput(readInput());
    let res = fold1(input);
    expect(res.dots.length()).toEqual(814);
})

test('part2 example', () => {
    let input = parseInput(example1);
    let res = foldN(input);
    printDots(res.dots)
})

test('part2', () => {
    let input = parseInput(readInput());
    let res = foldN(input);
    printDots(res.dots)
})
