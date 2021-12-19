import {add, explode, largestMagnitudeSumOfPairs, magnitude, parseInput, parseInputLine, readInput} from "./day18";

function checkExplode(input: string, output: string) {
    let s = parseInputLine(input);
    expect(explode(s)).toEqual(true);
    expect(s.join("")).toEqual(output)
}

test('part1 explode', () => {
    checkExplode("[[[[[9,8],1],2],3],4]", "[[[[0,9],2],3],4]");
    checkExplode("[7,[6,[5,[4,[3,2]]]]]", "[7,[6,[5,[7,0]]]]");
    checkExplode("[[6,[5,[4,[3,2]]]],1]", "[[6,[5,[7,0]]],3]");
    checkExplode("[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]", "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]");
    checkExplode("[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]", "[[3,[2,[8,0]]],[9,[5,[7,0]]]]");
})


test('part1 add', () => {
    expect(add(parseInputLine("[[[[4,3],4],4],[7,[[8,4],9]]]"), parseInputLine("[1,1]")).join(""))
        .toEqual("[[[[0,7],4],[[7,8],[6,0]]],[8,1]]");

    let example1 = "[1,1]\n" +
        "[2,2]\n" +
        "[3,3]\n" +
        "[4,4]";
    expect(parseInput(example1).reduce((n1, n2) => add(n1, n2)).join("")).toEqual("[[[[1,1],[2,2]],[3,3]],[4,4]]");

    let example2 = "[1,1]\n" +
        "[2,2]\n" +
        "[3,3]\n" +
        "[4,4]\n" +
        "[5,5]";
    expect(parseInput(example2).reduce((n1, n2) => add(n1, n2)).join("")).toEqual("[[[[3,0],[5,3]],[4,4]],[5,5]]");

    let example3 = "[1,1]\n" +
        "[2,2]\n" +
        "[3,3]\n" +
        "[4,4]\n" +
        "[5,5]\n" +
        "[6,6]";
    expect(parseInput(example3).reduce((n1, n2) => add(n1, n2)).join("")).toEqual("[[[[5,0],[7,4]],[5,5]],[6,6]]");

    let example4 = "[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]\n" +
        "[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]\n" +
        "[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]\n" +
        "[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]\n" +
        "[7,[5,[[3,8],[1,4]]]]\n" +
        "[[2,[2,2]],[8,[8,1]]]\n" +
        "[2,9]\n" +
        "[1,[[[9,3],9],[[9,0],[0,7]]]]\n" +
        "[[[5,[7,4]],7],1]\n" +
        "[[[[4,2],2],6],[8,7]]";
    expect(parseInput(example4).reduce((n1, n2) => add(n1, n2)).join("")).toEqual("[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]");
})


test('part1 magnitude', () => {
    expect(magnitude(parseInputLine("[[9,1],[1,9]]"))).toEqual(129)
    expect(magnitude(parseInputLine("[[1,2],[[3,4],5]]"))).toEqual(143)
    expect(magnitude(parseInputLine("[[[[0,7],4],[[7,8],[6,0]]],[8,1]]"))).toEqual(1384)
    expect(magnitude(parseInputLine("[[[[1,1],[2,2]],[3,3]],[4,4]]"))).toEqual(445)
    expect(magnitude(parseInputLine("[[[[3,0],[5,3]],[4,4]],[5,5]]"))).toEqual(791)
    expect(magnitude(parseInputLine("[[[[5,0],[7,4]],[5,5]],[6,6]]"))).toEqual(1137)
    expect(magnitude(parseInputLine("[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]"))).toEqual(3488)
});

test("part1 example", () => {
    let example = "[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]\n" +
        "[[[5,[2,8]],4],[5,[[9,9],0]]]\n" +
        "[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]\n" +
        "[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]\n" +
        "[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]\n" +
        "[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]\n" +
        "[[[[5,4],[7,7]],8],[[8,3],8]]\n" +
        "[[9,3],[[9,9],[6,[4,9]]]]\n" +
        "[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]\n" +
        "[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]";
    let sum = parseInput(example).reduce((n1, n2) => add(n1, n2));
    expect(sum.join("")).toEqual("[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]")
    expect(magnitude(sum)).toEqual(4140)
})

test("part 1", () => {
    let sum = parseInput(readInput()).reduce((n1, n2) => add(n1, n2));
    expect(magnitude(sum)).toEqual(4457)
})

test("part 2 example", () => {
    let example = "[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]\n" +
        "[[[5,[2,8]],4],[5,[[9,9],0]]]\n" +
        "[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]\n" +
        "[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]\n" +
        "[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]\n" +
        "[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]\n" +
        "[[[[5,4],[7,7]],8],[[8,3],8]]\n" +
        "[[9,3],[[9,9],[6,[4,9]]]]\n" +
        "[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]\n" +
        "[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]";
    expect(largestMagnitudeSumOfPairs(parseInput(example))).toEqual(3993)
})

test("part 2", () => {
    expect(largestMagnitudeSumOfPairs(parseInput(readInput()))).toEqual(4784)
})