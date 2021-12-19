import {countInitialVelocities, maximizeY, simulateFire} from "./day17";

test('part1 example', () => {
    expect(simulateFire(6, 9, 20, 30, -10, -5)).toEqual({
        passesThroughTarget: true,
        maxY: 45
    })
    expect(maximizeY(20, 30, -10, -5)).toEqual(45);
})


test('part1', () => {
    // target area: x=192..251, y=-89..-59
    expect(maximizeY(192, 251, -89, -59)).toEqual(3916);
})

test('part2 example', () => {
    expect(countInitialVelocities(20, 30, -10, -5)).toEqual(112);
})

test('part2', () => {
    // target area: x=192..251, y=-89..-59
    expect(countInitialVelocities(192, 251, -89, -59)).toEqual(2986);
})
