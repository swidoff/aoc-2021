import {orderAmphipods, State} from './day23';

test('part1 isComplete', () => {
    let example = new State([[0, 1], [3, 2], [2, 1], [0, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(example.isComplete()).toEqual(false);

    example = new State([[0, 0], [1, 1], [2, 2], [3, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(example.isComplete()).toEqual(true);
})

test('part1 isClearPath', () => {
    let example = new State([[0, 1], [3, 2], [2, 1], [0, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(example.isClearPath(0, 5)).toEqual(true);

    example = new State([[0, 1], [3, 2], [2, 1], [0, -1]], [-1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1]);
    expect(example.isClearPath(0, 5)).toEqual(false);
    expect(example.isClearPath(0, 3)).toEqual(true);
    expect(example.isClearPath(1, 3)).toEqual(true);
    expect(example.isClearPath(1, 0)).toEqual(false);
})

test('part1 move', () => {
    let example = new State([[0, 1], [3, 2], [2, 1], [0, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(example.moveToHallway(0, 1, 4)).toEqual(new State([[0, -1], [3, 2], [2, 1], [0, 3]], [-1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1], 30));
    expect(example.moveToHallway(1, 0, 6)).toEqual(new State([[0, 1], [-1, 2], [2, 1], [0, 3]], [-1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1], 4000));

    example = new State([[0, 1], [3, 2], [2, 1], [-1, 3]], [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(example.moveToRoom(3, 0, 0)).toEqual(new State([[0, 1], [3, 2], [2, 1], [0, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 10));

    example = new State([[0, 1], [3, -1], [2, 1], [0, 3]], [-1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(example.moveToRoom(1, 1, 1)).toEqual(new State([[0, 1], [3, 2], [2, 1], [0, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 400));
})

test('part1 example', () => {
    let example = new State([[0, 1], [3, 2], [2, 1], [0, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(orderAmphipods(example)).toEqual(12521);
})

test('part1', () => {
    let example = new State([[2, 2], [0, 0], [3, 1], [1, 3]], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(orderAmphipods(example)).toEqual(11536);
})