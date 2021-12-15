import {parseInput, prodOfBasinSizes, readInput, sumOfRiskLevels} from "./day9";

const example = "2199943210\n" +
    "3987894921\n" +
    "9856789892\n" +
    "8767896789\n" +
    "9899965678";

test('part1 example', () => {
    const input = parseInput(example);
    expect(sumOfRiskLevels(input)).toEqual(15);
})

test('part1', () => {
    const input = parseInput(readInput());
    expect(sumOfRiskLevels(input)).toEqual(498);
})

test('part2 example', () => {
    const input = parseInput(example);
    expect(prodOfBasinSizes(input)).toEqual(1134);
})

test('part2', () => {
    // 778410 too low
    const input = parseInput(readInput());
    expect(prodOfBasinSizes(input)).toEqual(1071000);
})