import {readFileSync} from "fs";

export function readInput(): string {
    const buf = readFileSync("inputs/day16.txt");
    return buf.toString();
}

interface Packet {
    version: number
    type: number
}

class Literal implements Packet {
    constructor(readonly version: number,
                readonly type: number,
                readonly value: number) {
    }
}


class Operator implements Packet {
    constructor(readonly version: number,
                readonly type: number,
                readonly packets: Packet[]) {
    }
}

function hexToBin(hex: string): string {
    switch (hex) {
        case "0":
            return "0000";
        case "1":
            return "0001";
        case "2":
            return "0010";
        case "3":
            return "0011";
        case "4":
            return "0100";
        case "5":
            return "0101";
        case "6":
            return "0110";
        case "7":
            return "0111";
        case "8":
            return "1000";
        case "9":
            return "1001";
        case "A":
            return "1010";
        case "B":
            return "1011";
        case "C":
            return "1100";
        case "D":
            return "1101";
        case "E":
            return "1110";
        default:
            return "1111";
    }
}

export function parseInput(input: string): Packet {
    const bits = input.split("").map(c => hexToBin(c)).join("");
    let i = 0;

    function nextBits(n: number) {
        let res = bits.substring(i, i + n)
        i += n;
        return res;
    }

    function parseNext(): Packet {
        const version = parseInt(nextBits(3), 2);
        const type = parseInt(nextBits(3), 2);
        let res;

        if (type === 4) {
            let hasParts = true;
            let parts = [];
            while (hasParts) {
                let part = nextBits(5);
                parts.push(part.substring(1));
                hasParts = part.charAt(0) == "1";
            }
            let value = parseInt(parts.join(""), 2);
            res = new Literal(version, type, value);
        } else if (nextBits(1) === "0") {
            let len = parseInt(nextBits(15), 2)
            let initialI = i;
            let packets = [];
            while (i - initialI < len) {
                packets.push(parseNext());
            }
            res = new Operator(version, type, packets);
        } else {
            let numPackets = parseInt(nextBits(11), 2)
            let packets = [];
            for (let j = 0; j < numPackets; j++) {
                packets.push(parseNext());
            }
            res = new Operator(version, type, packets);
        }
        return res;
    }

    return parseNext();
}

export function versionSum(packet: Packet): number {
    let res = packet.version
    if (packet instanceof Operator) {
        res += packet.packets.map(p => versionSum(p)).reduce((v1, v2) => v1 + v2);
    }
    return res;
}

export function interpret(packet: Packet): number {
    if (packet instanceof Literal) {
        return packet.value;
    } else if (packet instanceof Operator) {
        let values = packet.packets.map(p => interpret(p));
        switch (packet.type) {
            case 0:
                return values.reduce((v1, v2) => v1 + v2);
            case 1:
                return values.reduce((v1, v2) => v1 * v2, 1);
            case 2:
                return values.reduce((v1, v2) => Math.min(v1, v2));
            case 3:
                return values.reduce((v1, v2) => Math.max(v1, v2));
            case 5:
                return values[0] > values[1] ? 1 : 0;
            case 6:
                return values[0] < values[1] ? 1 : 0;
            case 7:
                return values[0] == values[1] ? 1 : 0;
            default:
                return -99;
        }
    } else {
        return -99;
    }
}
