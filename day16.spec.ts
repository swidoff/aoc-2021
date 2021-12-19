import {interpret, parseInput, readInput, versionSum} from "./day16";


test('part1 example', () => {
    expect(parseInput("D2FE28")).toEqual({version: 6, type: 4, value: 2021});
    expect(parseInput("38006F45291200")).toEqual({
        version: 1,
        type: 6,
        packets: [{version: 6, type: 4, value: 10}, {version: 2, type: 4, value: 20}]
    });
    expect(parseInput("EE00D40C823060")).toEqual({
        version: 7,
        type: 3,
        packets: [{version: 2, type: 4, value: 1}, {version: 4, type: 4, value: 2}, {version: 1, type: 4, value: 3}]
    });

    expect(versionSum(parseInput("8A004A801A8002F478"))).toEqual(16);
    expect(versionSum(parseInput("620080001611562C8802118E34"))).toEqual(12);
    expect(versionSum(parseInput("C0015000016115A2E0802F182340"))).toEqual(23);
    expect(versionSum(parseInput("A0016C880162017C3686B18A3D4780"))).toEqual(31);
})

test('part1', () => {
    expect(versionSum(parseInput(readInput()))).toEqual(923);
})

test("part2 example", () => {
    expect(interpret(parseInput("C200B40A82"))).toEqual(3);
    expect(interpret(parseInput("04005AC33890"))).toEqual(54);
    expect(interpret(parseInput("880086C3E88112"))).toEqual(7);
    expect(interpret(parseInput("CE00C43D881120"))).toEqual(9);
    expect(interpret(parseInput("D8005AC2A8F0"))).toEqual(1);
    expect(interpret(parseInput("F600BC2D8F"))).toEqual(0);
    expect(interpret(parseInput("9C005AC2F8F0"))).toEqual(0);
    expect(interpret(parseInput("9C0141080250320F1802104A08"))).toEqual(1);
});

test('part2', () => {
    expect(interpret(parseInput(readInput()))).toEqual(923);
})
