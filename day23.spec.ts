import {orderAmphipods, State} from './day23';
import _ from "lodash";

test('part1 isComplete', () => {
    let example = new State([[0, 1], [3, 2], [2, 1], [0, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(example.isComplete()).toEqual(false);

    example = new State([[0, 0], [1, 1], [2, 2], [3, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(example.isComplete()).toEqual(true);
})

test('part1 isClearPath', () => {
    let example = new State([[0, 1], [3, 2], [2, 1], [0, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(example.isClearPath(0, 1, 5)).toEqual(true);

    example = new State([[0, 1], [3, 2], [2, 1], [0, -1]], [-1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1]);
    expect(example.isClearPath(0, 1, 5)).toEqual(false);
    expect(example.isClearPath(0, 1, 3)).toEqual(true);
    expect(example.isClearPath(1, 1, 3)).toEqual(true);
    expect(example.isClearPath(1, 0, 3)).toEqual(false);
    expect(example.isClearPath(1, 1, 0)).toEqual(false);
})

test('part1 move', () => {
    let example = new State([[0, 1], [3, 2], [2, 1], [0, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(example.move(0, 1, 4, true)).toEqual(new State([[0, -1], [3, 2], [2, 1], [0, 3]], [-1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1], 30));
    expect(example.move(1, 0, 6, true)).toEqual(new State([[0, 1], [-1, 2], [2, 1], [0, 3]], [-1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1], 4000));

    example = new State([[0, 1], [3, 2], [2, 1], [-1, 3]], [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(example.move(3, 0, 0, false)).toEqual(new State([[0, 1], [3, 2], [2, 1], [0, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 10));

    example = new State([[0, 1], [3, -1], [2, 1], [0, 3]], [-1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(example.move(1, 1, 1, false)).toEqual(new State([[0, 1], [3, 2], [2, 1], [0, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 400));

    expect(_.every([], r=> r == 1)).toEqual(true);
})

test('part1 example', () => {
    let example = new State([[0, 1], [3, 2], [2, 1], [0, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(orderAmphipods(example)).toEqual(12521);
})

test('part1', () => {
    let example = new State([[2, 2], [0, 0], [3, 1], [1, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(orderAmphipods(example)).toEqual(11536);
})

test('part2 example', () => {
    // #############
    // #...........#
    // ###B#C#B#D###
    //   #D#C#B#A#
    //   #D#B#A#C#
    //   #A#D#C#A#
    //   #########
    let example = new State([[0, 3, 3, 1], [3, 1, 2, 2], [2, 0, 1, 1], [0, 2, 0, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(orderAmphipods(example)).toEqual(44169);
})

test('part2', () => {
    let example = new State([[2, 3, 3, 2], [0, 1, 2, 0], [3, 0, 1, 1], [1, 2, 0, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(orderAmphipods(example)).toEqual(55136);
})