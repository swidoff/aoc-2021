import {autocorrectScore, parseInput, readInput, syntaxErrorScore} from "./day10";

let example = "[({(<(())[]>[[{[]{<()<>>\n" +
    "[(()[<>])]({[<{<<[]>>(\n" +
    "{([(<{}[<>[]}>{[]{[(<()>\n" +
    "(((({<>}<{<{<>}{[]{[]{}\n" +
    "[[<[([]))<([[{}[[()]]]\n" +
    "[{[{({}]{}}([{[{{{}}([]\n" +
    "{<[[]]>}<{[{[{[]{()[[[]\n" +
    "[<(<(<(<{}))><([]([]()\n" +
    "<{([([[(<>()){}]>(<<{{\n" +
    "<{([{{}}[<[[[<>{}]]]>[]]"

test('part1 example', () => {
    const input = parseInput(example);
    expect(syntaxErrorScore(input)).toEqual(26397);
})

test('part1', () => {
    const input = parseInput(readInput());
    expect(syntaxErrorScore(input)).toEqual(321237);
})

test('part2 example', () => {
    const input = parseInput(example);
    expect(autocorrectScore(input)).toEqual(288957);
})

test('part2', () => {
    const input = parseInput(readInput());
    expect(autocorrectScore(input)).toEqual(2360030859);
})