import {findModelNumber, foo, inverseFoo, readInput, runALU} from "./day24";
import * as assert from "assert";
test('foo', () => {
    console.log(foo(1, 0, 1, 12, 1));
    console.log(foo(2, 0, 1, 12, 1));
    console.log(foo(3, 0, 1, 12, 1));
    console.log(foo(4, 0, 1, 12, 1));
    console.log(foo(5, 0, 1, 12, 1));
    console.log(foo(6, 0, 1, 12, 1));
    console.log(foo(7, 0, 1, 12, 1));
    console.log(foo(8, 0, 1, 12, 1));
    console.log(foo(9, 0, 1, 12, 1));

    for (let z = 0; z < 26; z++) {
        for (let d = 1; d <= 9; d++) {
            let r = foo(d, z, 26, -5, 1)
            if (r == 0) {
                console.log("r=", r, "d=", d, "z=", z)
            }
        }
    }

    let example = "inp w\n" +
        "mul x 0\n" +
        "add x z\n" +
        "mod x 26\n" +
        "div z 26\n" +
        "add x -5\n" +
        "eql x w\n" +
        "eql x 0\n" +
        "mul y 0\n" +
        "add y 25\n" +
        "mul y x\n" +
        "add y 1\n" +
        "mul z y\n" +
        "mul y 0\n" +
        "add y w\n" +
        "add y 1\n" +
        "mul y x\n" +
        "add z y";
    expect(runALU(example, [1], [0, 0, 0, 6])[3]).toEqual(0);
});

test('inverseFoo', () => {
    for (let zIn = 0; zIn < 26; zIn++) {
        for (let d = 1; d <= 9; d++) {
            let zOut = foo(d, zIn, 26, -5, 1)
            if (zOut == 0) {
                expect(inverseFoo(d, zOut, 26, -5, 1)).toEqual([zIn]);
            }
        }
    }
})

test('part1', () => {
    let inp = readInput();
    expect(findModelNumber()).toEqual("96979989692495");
})

test('part2', () => {
    let inp = readInput();
    expect(findModelNumber(false)).toEqual("51316214181141");
})
