import { describe, test, expect } from "vitest";
import { formatName } from "../src/formatName";

describe("работает на корректных данных", () => {
    const data = [
        { fullName: "Иванов Иван Иванович", expected: "Иванов И.И." },
        { fullName: "Петров Пётр Петрович", expected: "Петров П.П." },
        { fullName: "Андреев Андрей Андреевич", expected: "Андреев А.А." },
    ];

    data.forEach(({ fullName, expected }) => {
        test(`выводит ${expected}`, () => {
            expect(formatName(fullName)).toBe(expected);
        });
    });
});

describe("отсутствие лишних пробелов", () => {
    const data = [
        {
            fullName: "   Михайлов Михаил Михайлович ",
            expected: "Михайлов М.М.",
        },
        {
            fullName: " Александров Александр Александрович       ",
            expected: "Александров А.А.",
        },
        {
            fullName: "Евгеньев Евгений Евгеньевич   ",
            expected: "Евгеньев Е.Е.",
        },
    ];

    data.forEach(({ fullName, expected }) => {
        test(`выводит ${expected}`, () => {
            expect(formatName(fullName)).toBe(expected);
        });
    });
});

describe("выдает ошибку при неккоректных данных", () => {
    const emptyValues = ["", " ", null];
    const notFullNames = ["Иван", "Иван Иванов"];
    const incorrectType = [123, false, {}];
    const specialSymbols = [
        "Иванов @Иван #Иванович",
        "Петров Петр123 Петрович",
    ];

    test("пустые значения", () => {
        emptyValues.forEach((input) => {
            expect(() => formatName(input)).toThrow(
                "Неккоректные значения: пробелы или пустые значения"
            );
        });
    });

    test("неполное ФИО", () => {
        notFullNames.forEach((input) => {
            expect(() => formatName(input)).toThrow(
                "Неккоректные значения: неполное ФИО"
            );
        });
    });

    test("неверный тип данных", () => {
        incorrectType.forEach((input) => {
            expect(() => formatName(input)).toThrow(
                "Некорректные значения: тип данных"
            );
        });
    });

    test("небуквенные символы", () => {
        specialSymbols.forEach((input) => {
            expect(() => formatName(input)).toThrow(
                "Неккоректные значения: наличие небуквенных символов"
            );
        });
    });
});
