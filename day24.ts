import {readFileSync} from "fs";
import _, {constant, parseInt, toString} from "lodash";
import PriorityQueue from "ts-priority-queue/src/PriorityQueue";

export function readInput(): string {
    const buf = readFileSync("inputs/day24.txt");
    return buf.toString();
}

let regMap = new Map();
regMap.set("w", 0);
regMap.set("x", 1);
regMap.set("y", 2);
regMap.set("z", 3);


export function runALU(prog: string, inp: number[], reg: number[] = [0, 0, 0, 0]): number[] {
    for (let line of prog.split("\n")) {
        let [op, arg1, arg2] = line.split(" ")
        let i = regMap.get(arg1)!;
        let v;
        if (regMap.has(arg2)) {
            v = reg[regMap.get(arg2)!];
        } else {
            v = parseInt(arg2);
        }
        if (op === "add") {
            reg[i] += v;
        } else if (op === "mul") {
            reg[i] *= v;
        } else if (op == "div") {
            reg[i] = Math.floor(reg[i] / v);
        } else if (op == "mod") {
            reg[i] %= v;
        } else if (op == "eql") {
            reg[i] = reg[i] == v ? 1 : 0;
        } else if (op == "inp") {
            reg[i] = inp.shift()!;
        }
    }

    return reg;
}

class State {
    constructor(readonly digits: string, readonly requiredZ: number) {
    }

    number(): number {
        return this.digits.length > 0 ? parseInt(this.digits) : 0;
    }

    compareBiggestLongest(other: State): number {
        let byLength = other.digits.length - this.digits.length;
        if (byLength != 0) {
            return byLength;
        } else {
            return other.number() - this.number();
        }
    }

    compareSmallestLongest(other: State): number {
        let byLength = other.digits.length - this.digits.length;
        if (byLength != 0) {
            return byLength;
        } else {
            return this.number() - other.number();
        }
    }

}

export function findModelNumber(largest: boolean = true): string {
    // let digitPrograms = input.split("inp w\n");
    // digitPrograms.shift();
    // digitPrograms = digitPrograms.map(s => "inp w\n" + s)
    let comparator = largest ?
        (s1: State, s2: State) => s1.compareBiggestLongest(s2) :
        (s1: State, s2: State) => s1.compareSmallestLongest(s2);
    let q = new PriorityQueue<State>({comparator: comparator})
    q.queue(new State("", 0));

    while (q.length > 0) {
        let state = q.dequeue();
        if (state.digits.length == 14) {
            return state.digits;
        }

        let i =14 - state.digits.length - 1;
        let [c1, c2, c3] = constants[i];
        // let program = digitPrograms[14 - state.digits.length - 1];
        for (let digit = 1; digit <= 9; digit++) {
            let outputZ = inverseFoo(digit, state.requiredZ, c1, c2, c3)
            for (let z of outputZ) {
                q.queue(new State(digit + state.digits, z));
            }
        }
    }
    return "";
}

let constants = [
    [1, 12, 1],
    [1, 13, 9],
    [1, 12, 11],
    [26, -13, 6],
    [1, 11, 6],
    [1, 15, 13],
    [26, -14, 13],
    [1, 12, 5],
    [26, -8, 7],
    [1, 14, 2],
    [26, -9, 10],
    [26, -11, 4],
    [26, -6, 7],
    [26, -5, 1],
]

// mul x 0  mul x 0  mul x 0  mul x 0   mul x 0  mul x 0  mul x 0   mul x 0  mul x 0  mul x 0  mul x 0  mul x 0
// add x z  add x z  add x z  add x z   add x z  add x z  add x z   add x z  add x z  add x z  add x z  add x z
// mod x 26 mod x 26 mod x 26 mod x 26  mod x 26 mod x 26 mod x 26  mod x 26 mod x 26 mod x 26 mod x 26 mod x 26
// div z 1  div z 1  div z 1  div z 26  div z 1  div z 1  div z 26  div z 1  div z 26 div z 1  div z 26 div z 26
// add x 12 add x 13 add x 12 add x -13 add x 11 add x 15 add x -14 add x 12 add x -8 add x 14 add x -9 add x -11
// eql x w  eql x w  eql x w  eql x w   eql x w  eql x w  eql x w   eql x w  eql x w  eql x w  eql x w  eql x w
// eql x 0  eql x 0  eql x 0  eql x 0   eql x 0  eql x 0  eql x 0   eql x 0  eql x 0  eql x 0  eql x 0  eql x 0
// mul y 0  mul y 0  mul y 0  mul y 0   mul y 0  mul y 0  mul y 0   mul y 0  mul y 0  mul y 0  mul y 0  mul y 0
// add y 25 add y 25 add y 25 add y 25  add y 25 add y 25 add y 25  add y 25 add y 25 add y 25 add y 25 add y 25
// mul y x  mul y x  mul y x  mul y x   mul y x  mul y x  mul y x   mul y x  mul y x  mul y x  mul y x  mul y x
// add y 1  add y 1  add y 1  add y 1   add y 1  add y 1  add y 1   add y 1  add y 1  add y 1  add y 1  add y 1
// mul z y  mul z y  mul z y  mul z y   mul z y  mul z y  mul z y   mul z y  mul z y  mul z y  mul z y  mul z y
// mul y 0  mul y 0  mul y 0  mul y 0   mul y 0  mul y 0  mul y 0   mul y 0  mul y 0  mul y 0  mul y 0  mul y 0
// add y w  add y w  add y w  add y w   add y w  add y w  add y w   add y w  add y w  add y w  add y w  add y w
// add y 1  add y 9  add y 11 add y 6   add y 6  add y 13 add y 13  add y 5  add y 7  add y 2  add y 10 add y 14
// mul y x  mul y x  mul y x  mul y x   mul y x  mul y x  mul y x   mul y x  mul y x  mul y x  mul y x  mul y x
// add z y  add z y  add z y  add z y   add z y  add z y  add z y   add z y  add z y  add z y  add z y  add z y
//
// mul x 0  mul x 0
// add x z  add x z
// mod x 26 mod x 26
// div z 26 div z 26
// add x -6 add x -5
// eql x w  eql x w
// eql x 0  eql x 0
// mul y 0  mul y 0
// add y 25 add y 25
// mul y x  mul y x
// add y 1  add y 1
// mul z y  mul z y
// mul y 0  mul y 0
// add y w  add y w
// add y 7  add y 1
// mul y x  mul y x
// add z y  add z y


export function foo(w: number, z: number, c1: number, c2: number, c3: number): number {
    if (z % 26 + c2 == w) {
        return Math.floor(z / c1);
    } else {
        return 26 * Math.floor(z / c1) + (w + c3)
    }
}

// [26, -5, 1], // inZ = 6, outZ=0, w=1
export function inverseFoo(w: number, outputZ: number, c1: number, c2: number, c3: number) : number[] {
    let res  = [];

    // Branch 1
    for (let inZ = outputZ*c1; inZ < (outputZ+1)*c1; inZ++) {
        if (inZ % 26 + c2 == w) {
            res.push(inZ);
        }
    }

    // Branch 2
    // z_out = 26 * Math.floor(z_in / c1) + (w + c3)
    // (z_out - (w + c3))  = 26*Math.floor(z_in / c1)
    let rhs = (outputZ - (w + c3));
    if (rhs >= 0 && rhs % 26 == 0 ) {
        rhs /= 26;
        for (let inZ = rhs * c1; inZ < (rhs + 1) * c1; inZ++) {
            if (inZ % 26 + c2 != w) {
                res.push(inZ);
            }
        }
    }
    return res;
}
