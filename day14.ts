import {readFileSync} from "fs";
import {HashMap, Vector} from "prelude-ts";

export function readInput(): string {
    const buf = readFileSync("inputs/day14.txt");
    return buf.toString();
}

export function parseInput(input: string): [string, Map<string, string>] {
    let lines = input.split("\n");
    let template = lines.shift()!;
    lines.shift();

    let rules = new Map<string, string>();
    for (const line of lines) {
        let [pair, insertion] = line.split(" -> ");
        rules.set(pair, insertion);
    }

    return [template, rules];
}

function applyRule(template: string, rules: Map<string, string>): string {
    let res = [];
    for (let i = 0; i < template.length - 1; i++) {
        let pair = template.substring(i, i + 2);
        res.push(pair.charAt(0));

        let insertion = rules.get(pair)
        if (insertion !== undefined) {
            res.push(insertion);
        }
    }

    res.push(template.charAt(template.length - 1));
    return res.join("");
}

function charCounts(res: string): Map<string, number> {
    let counts = new Map<string, number>();
    for (let i = 0; i < res.length; i++) {
        let c = res.charAt(i);
        let count = counts.get(c);
        if (count === undefined) {
            count = 0;
        }
        let newCount = count + 1;
        counts.set(c, newCount);
    }
    return counts;
}

function minMaxCount(counts: Map<string, number>): [number, number] {
    let min = 1e6;
    let max = 0;
    for (let count of counts.values()) {
        min = Math.min(min, count);
        max = Math.max(max, count);

    }
    return [min, max];
}

export function applyRules(template: string, rules: Map<string, string>, steps: number): number {
    let res = template;
    console.log(res)
    for (let i = 0; i < steps; i++) {
        res = applyRule(res, rules);
        console.log(res)
        // let [minCount, maxCount] = minMaxCharCount(res);
        // console.log(minCount, maxCount)
    }

    let counts = charCounts(res);
    let [minCount, maxCount] = minMaxCount(counts);
    return maxCount - minCount;
}


export function efficientCharCount(template: string, rules: Map<string, string>, steps: number): number {
    let cache = new Map<string, HashMap<string, number>>();

    function countsFor(s: string, step: number): HashMap<string, number> {
        let key = `${s}-${step}`;
        if (cache.has(key)) {
            return cache.get(key)!;
        }

        let counts: HashMap<string, number>;
        if (step > steps) {
            counts = HashMap.ofIterable(charCounts(s));
        } else {
            // Create the string for the step.
            let arr = [];
            for (let i = 0; i < s.length - 1; i++) {
                let pair = s.substring(i, i + 2);
                arr.push(pair.charAt(0));

                let insertion = rules.get(pair)
                if (insertion !== undefined) {
                    arr.push(insertion);
                }
            }
            arr.push(s.charAt(s.length - 1));

            // Recursively aggregate the counts of the pairs.
            let newS = arr.join("");
            counts = HashMap.empty()
            for (let i = 0; i < newS.length - 1; i++) {
                let pair = newS.substring(i, i + 2);
                let pairCounts = countsFor(pair, step + 1);
                counts = counts.mergeWith(pairCounts, (v1, v2) => v1 + v2);
            }

            // Subtract the counts of the interior characters to avoid double counting.
            counts = counts.mergeWith(charCounts(newS.substring(1, newS.length - 1)), (v1, v2) => v1 - v2)
        }

        cache.set(key, counts);
        return counts
    }

    let counts = countsFor(template, 1);
    const countValues = Vector.ofIterable(counts.valueIterable());
    const minCount = countValues.minOn(v => v).getOrThrow();
    const maxCount = countValues.maxOn(v => v).getOrThrow();
    return maxCount - minCount;
}

