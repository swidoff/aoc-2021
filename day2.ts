import {readFileSync} from "fs";

export function readInput(): string {
    const buf = readFileSync("inputs/day2.txt");
    return buf.toString();
}

export type Command = {
    direction: string;
    amount: number;
}

export function parseInput(input: string): Command[] {
    return input.split("\n").map((line) => {
        const [direction, amount] = line.split(" ")
        return {
            direction: direction,
            amount: Number.parseInt(amount)
        };
    })
}

export class Position {
    constructor(public horizontal = 0, public depth = 0, public aim = 0) {
    }
}

export function followCommands(commands: Command[], hasAim: boolean = false): Position {
    let reduceFunc;
    if (hasAim) {
        reduceFunc = ({horizontal, depth, aim}: Position, {direction, amount}: Command): Position => {
            let newAim = aim;
            if (direction === "up") {
                newAim -= amount;
            } else if (direction === "down") {
                newAim += amount;
            }
            let newDepth = depth;
            let newHorizontal = horizontal;
            if (direction === "forward") {
                newHorizontal += amount;
                newDepth += newAim * amount;
            }

            return new Position(newHorizontal, newDepth, newAim);
        }
    } else {
        reduceFunc = ({horizontal, depth, aim}: Position, {direction, amount}: Command): Position => {
            let newDepth = depth;
            if (direction === "up") {
                newDepth -= amount;
            } else if (direction === "down") {
                newDepth += amount;
            }

            let newHorizontal = horizontal;
            if (direction === "forward") {
                newHorizontal += amount;
            }

            return new Position(newHorizontal, newDepth, aim);
        }
    }

    return commands.reduce(reduceFunc, new Position(0, 0))
}



