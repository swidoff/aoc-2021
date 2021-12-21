import {deterministicPlay, quantumPlay} from "./day21";

test('part1 example', () => {
    expect(deterministicPlay(4, 8)).toEqual(739785);
});

test('part1', () => {
    expect(deterministicPlay(5, 9)).toEqual(989352);
});

test('part2 example', () => {
    let res = quantumPlay([4, 8])
    expect(Math.max(res[0], res[1])).toEqual(444356092776315);
});

test('part2', () => {
    let res = quantumPlay([5, 9])
    expect(Math.max(res[0], res[1])).toEqual(430229563871565);
});