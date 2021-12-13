import {readFileSync} from "fs";

type Drawing = number[];

class Board {
    private readonly marked: boolean[][]

    constructor(public readonly spaces: number[][]) {
        this.marked = [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false]
        ];
    }

    public mark(v: number) {
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                if (this.spaces[r][c] == v) {
                    this.marked[r][c] = true;
                    break;
                }
            }
        }
    }

    public isWinner(): boolean {
        for (let i = 0; i < 5; i++) {
            let rowWinner = this.marked[i].reduce((r, v) => r && v, true);
            let colWinner = this.marked.reduce((r, v) => r && v[i], true);
            if (rowWinner || colWinner) {
                return true;
            }
        }
        return false;
    }

    public sumUnmarked(): number {
        let sum = 0;
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                if (!this.marked[r][c]) {
                    sum += this.spaces[r][c];
                }
            }
        }
        return sum;
    }
}

export function readInput(): string {
    const buf = readFileSync("inputs/day4.txt");
    return buf.toString();
}

export function parseInput(input: string): [Drawing, Board[]] {
    const lines = input.split("\n")
    let drawing = lines.shift()!.split(",").map((n) => Number.parseInt(n))
    let boards = new Array<Board>();

    while (lines.length > 0) {
        lines.shift();

        let board = new Array<Array<number>>();
        for (let i = 0; i < 5; i++) {
            let row = lines.shift()!;
            board.push(new Array<number>());
            for (let j = 0; j < 5; j++) {
                let digit = Number.parseInt(row.substring(j * 3, j * 3 + 3).trim());
                board[i].push(digit);
            }
        }
        boards.push(new Board(board));
    }

    return [drawing, boards];
}

export function firstWinnerScore(boards: Board[], drawing: Drawing): number {
    for (const draw of drawing) {
        for (let board of boards) {
            board.mark(draw)

            if (board.isWinner()) {
                return draw * board.sumUnmarked();
            }
        }
    }
    return -1;
}

export function lastWinnerScore(boards: Board[], drawing: Drawing): number {
    let winners = new Set<number>();
    for (let i = 0; i < drawing.length; i++) {
        const draw = drawing[i];
        for (let j = 0; j < boards.length; j++) {
            if (!winners.has(j)) {
                let board = boards[j];
                board.mark(draw);

                if (board.isWinner()) {
                    winners.add(j);
                    if (boards.length == winners.size) {
                        return draw * board.sumUnmarked();
                    }
                }
            }
        }
    }
    return -1;
}

