import {applyRules, efficientCharCount, parseInput, readInput} from "./day14";

let example1 = "NNCB\n" +
    "\n" +
    "CH -> B\n" +
    "HH -> N\n" +
    "CB -> H\n" +
    "NH -> C\n" +
    "HB -> C\n" +
    "HC -> B\n" +
    "HN -> C\n" +
    "NN -> C\n" +
    "BH -> H\n" +
    "NC -> B\n" +
    "NB -> B\n" +
    "BN -> B\n" +
    "BB -> N\n" +
    "BC -> B\n" +
    "CC -> N\n" +
    "CN -> C";

test('part1 example', () => {
    let [template, rules] = parseInput(example1);
    let res = applyRules(template, rules, 10);
    expect(res).toEqual(1588);
})

test('part1', () => {
    let [template, rules] = parseInput(readInput());
    let res = applyRules(template, rules, 10);
    expect(res).toEqual(3284);
})

test('part2 example', () => {
    let [template, rules] = parseInput(example1);
    expect(efficientCharCount(template, rules, 10)).toEqual(1588);
    expect(efficientCharCount(template, rules, 40)).toEqual(2188189693529);
})

test('part2', () => {
    let [template, rules] = parseInput(readInput());
    let res = efficientCharCount(template, rules, 40);
    expect(res).toEqual(4302675529689);
})