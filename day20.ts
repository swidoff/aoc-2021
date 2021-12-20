import {readFileSync} from "fs";
import {HashMap, Vector} from "prelude-ts";

export function readInput(): string {
    const buf = readFileSync("inputs/day20.txt");
    return buf.toString();
}

type Point = Vector<number>

type Input = {
    algo: string
    image: HashMap<Point, string>
    dim: number,
    offset: number
    lit: number,
}

export function parseInput(input: string): Input {
    let lines = input.split("\n");
    let algo = lines.shift()!;
    lines.shift();

    let lit = 0;
    let image: HashMap<Point, string> = HashMap.empty();
    for (let r = 0; r < lines.length; r++) {
        for (let c = 0; c < lines.length; c++) {
            let char = lines[r].charAt(c);
            if (char == "#") {
                lit++;
            }
            image = image.put(Vector.of(r, c), char);
        }
    }
    return {algo: algo, image: image, dim: lines.length, offset: 0, lit: lit};
}

function defaultCharFor(algo: string, offset: number): string {
    if (algo.charAt(0) == "#") {
        // The pixels off the image toggle with each enhancement.
        return offset % 2 == 1 ? "#" : ".";
    } else {
        return "."
    }
}

export function enhance(input: Input): Input {
    let newImage: HashMap<Point, string> = HashMap.empty();
    let lit = 0;
    let defaultChar = defaultCharFor(input.algo, input.offset);
    let newOffset = input.offset + 1;
    for (let r = -newOffset; r < input.dim + newOffset; r++) {
        for (let c = -newOffset; c < input.dim + newOffset; c++) {
            let index = 0;
            for (let dr = -1; dr < 2; dr++) {
                for (let dc = -1; dc < 2; dc++) {
                    let pixel = input.image.get(Vector.of(r + dr, c + dc)).getOrElse(defaultChar)
                    let digit = pixel === "#" ? 1 : 0;
                    index = (index << 1) | digit;
                }
            }
            let char = input.algo.charAt(index);
            if (char == "#") {
                lit++;
            }
            newImage = newImage.put(Vector.of(r, c), char);
        }
    }

    let res = {algo: input.algo, image: newImage, dim: input.dim, offset: newOffset, lit: lit};
    // printImage(res);
    return res;
}

export function printImage(input: Input) {
    let res = []
    let defaultChar = defaultCharFor(input.algo, input.offset);
    for (let r = -input.offset; r < input.dim + input.offset; r++) {
        let line = [];
        for (let c = -input.offset; c < input.dim + input.offset; c++) {
            let pixel = input.image.get(Vector.of(r, c)).getOrElse(defaultChar)
            line.push(pixel);
        }
        res.push(line.join(""));
    }
    console.log(res.join("\n"))
}