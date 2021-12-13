import {countAscending, parseInput, readInput, tripleSums} from "./day1";

const example = '199\n' +
    '200\n' +
    '208\n' +
    '210\n' +
    '200\n' +
    '207\n' +
    '240\n' +
    '269\n' +
    '260\n' +
    '263';

test('part1 example', () => {
    expect(countAscending(parseInput(example))).toEqual(7);
})

test('part1', () => {
    const input = readInput();
    const res = countAscending(input);
    console.log(res);
})

test('part2 example', () => {
    let input = parseInput(example);
    const sums = tripleSums(input);
    const res = countAscending(sums);
    expect(res).toEqual(5);
})

test('part2', () => {
    const input = readInput();
    const sums = tripleSums(input);
    const res = countAscending(sums);
    console.log(res);
})


