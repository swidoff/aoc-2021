import {readFileSync} from "fs";
import {HashSet, Vector} from "prelude-ts";

export function readInput(): string {
    const buf = readFileSync("inputs/day13.txt");
    return buf.toString();
}


type Fold = {
    axis: "x" | "y"
    value: number
}

type Input = {
    dots: HashSet<Vector<number>>
    folds: Vector<Fold>
}

export function parseInput(input: string): Input {
    let dots: Vector<number>[] = [];
    let folds: Fold[] = [];

    let lines = input.split("\n");
    let line = lines.shift()!;
    while (line != "") {
        const [x, y] = line.split(",")!
        dots.push(Vector.of(parseInt(x), parseInt(y)));
        line = lines.shift()!;
    }

    for (const line of lines) {
        const [axis, value] = line.substring("fold along ".length).split("=")!;
        if (axis === "x" || axis === "y") {
            folds.push({axis: axis, value: parseInt(value)})
        }
    }
    return {dots: HashSet.ofIterable(dots), folds: Vector.ofIterable(folds)};
}

export function fold1(input: Input): Input {
    return input.folds.head().match({
        Some: fold => {
            return {
                dots: input.dots.map(dot => {
                        let x = dot.get(0).getOrThrow();
                        let y = dot.get(1).getOrThrow();
                        if (fold.axis == "x") {
                            return x <= fold.value ? dot : Vector.of(fold.value - (x - fold.value), y);
                        } else {
                            return y <= fold.value ? dot : Vector.of(x, fold.value - (y - fold.value));
                        }
                    }
                ),
                folds: input.folds.tail().getOrThrow()
            }
        },
        None: () => input
    })
}

export function foldN(input: Input): Input {
    let state = input;
    while (!state.folds.isEmpty()) {
        state = fold1(state);
    }
    return state;
}

export function printDots(dots: HashSet<Vector<number>>) {
    let maxX = dots.maxOn(v => v.get(0).getOrThrow()).getOrThrow().get(0).getOrThrow();
    let maxY = dots.maxOn(v => v.get(1).getOrThrow()).getOrThrow().get(1).getOrThrow();

    let rows = [];
    for (let y = 0; y <= maxY; y++) {
        let cols = []
        for (let x = 0; x <= maxX; x++) {
            if (dots.contains(Vector.of(x, y))) {
                cols.push("#");
            } else {
                cols.push(".");
            }
        }
        rows.push(cols.join(""));
    }
    console.log(rows.join("\n"));
}
