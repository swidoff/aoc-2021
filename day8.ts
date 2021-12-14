import {readFileSync} from "fs";

export function readInput(): string {
    const buf = readFileSync("inputs/day8.txt");
    return buf.toString();
}

type Input = {
    lhs: string[]
    rhs: string[]
}

export function parseInput(input: string): Input[] {
    let res = new Array<Input>();
    for (let line of input.split("\n")) {
        let [lhs, rhs] = line.split(" | ");
        res.push({
            lhs: lhs.split(" "),
            rhs: rhs.split(" "),
        })
    }
    return res
}

export function countUniqueOutputDigits(input: Input[]): number {
    let count = 0;
    for (let {lhs: lhs, rhs: rhs} of input) {
        for (let digits of rhs) {
            switch (digits.length) {
                case 2:
                case 3:
                case 4:
                case 7:
                    count += 1;
            }
        }
    }
    return count;
}

export function translateAll(input: Input[]): number {
    let res = 0;
    for (let inp of input) {
        res += translate(inp);
    }
    return res
}

let digits = new Map<string, number>();
digits.set("abcefg", 0);
digits.set("cf", 1);
digits.set("acdeg", 2);
digits.set("acdfg", 3);
digits.set("bcdf", 4);
digits.set("abdfg", 5);
digits.set("abdefg", 6);
digits.set("acf", 7);
digits.set("abcdefg", 8);
digits.set("abcdfg", 9);

/**
 * acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf
 * ab = 1 [cf]
 * dab = 7 [acf]
 * eafb = 4 [bcdf]
 * acedgfb = 8 [abcdefg]
 *
 * abcdefg
 * -------
 * deaceac
 *  fbgfbg
 *
 */
export function translate(input: Input): number {
    let initial = initialDeduction(input.lhs);
    let candidates = allCandidateMappings(initial);

    let digitMap: Map<string, number> | undefined;
    for (let mapping of candidates) {
        digitMap = isValidMapping(mapping, input.lhs);
        if (digitMap !== undefined) {
            break;
        }
    }

    let res = 0
    for (let i = 0; i <= 3; i++) {
        res += Math.pow(10, i) * digitMap!.get(sortString(input.rhs[3 - i]))!;
    }
    return res
}

/**
 * Returns initial non-unique mapping from the expected letters to the actual letters.
 */
function initialDeduction(lhs: string[]): Map<string, string[]> {
    let byLen = lhs.reduce((m, d) => {
        m.set(d.length, d);
        return m;
    }, new Map<number, string>())

    let one = byLen.get(2)!.split("");
    let seven = byLen.get(3)!.split("");
    let four = byLen.get(4)!.split("");
    let eight = byLen.get(7)!.split("");

    let value = new Map<string, string[]>();
    value.set("a", new Array<string>());
    value.set("b", new Array<string>());
    value.set("c", new Array<string>());
    value.set("d", new Array<string>());
    value.set("e", new Array<string>());
    value.set("f", new Array<string>());
    value.set("g", new Array<string>());

    let taken = new Set<string>();
    for (let c of one) {
        value.get("c")!.push(c);
        value.get("f")!.push(c);
        taken.add(c)
    }
    for (let c of seven) {
        if (!taken.has(c)) {
            value.get("a")!.push(c);
            taken.add(c)
        }
    }
    for (let c of four) {
        if (!taken.has(c)) {
            value.get("b")!.push(c);
            value.get("d")!.push(c);
            taken.add(c)
        }
    }
    for (let c of eight) {
        if (!taken.has(c)) {
            value.get("e")!.push(c);
            value.get("g")!.push(c);
        }
    }
    return value;
}


/**
 * From the initial deduction, returns all legal combinations.
 * The resulting strings are the mappings from a-g in order.
 */
export function allCandidateMappings(initial: Map<string, string[]>): string[] {
    let res = new Array<string>();
    res.push("");

    for (let k of initial.keys()) {
        let newRes = new Array<string>();
        for (let v of initial.get(k)!) {
            for (let combo of res) {
                if (combo.search(v) == -1) {
                    newRes.push(combo + v)
                }
            }
        }
        res = newRes;
    }

    return res
}

/**
 * Returns a map from the sorted number to their digits if the mapping (produced by permutations) is valid,
 * otherwise returns undefined.
 */
export function isValidMapping(mapping: string, numbers: string[]): Map<string, number> | undefined {
    let res = new Map<string, number>();
    let lookup = new Map<string, string>();
    let target = "abcdefg"
    for (let i = 0; i < mapping.length; i++) {
        lookup.set(mapping.charAt(i), target.charAt(i));
    }

    for (let number of numbers) {
        let translation = new Array<string>();
        for (let c of number) {
            translation.push(lookup.get(c)!);
        }
        let digit = digits.get(translation.sort().join(""));
        if (digit === undefined) {
            return undefined;
        }
        res.set(sortString(number), digit);
    }

    return res;
}

function sortString(number: string): string {
    return number.split("").sort().join("");
}