import { add, sub } from "./index";

describe("四則演算", () => {
  describe("add", () => {
    test("50 + 50 は 100", () => {
      expect(add(50, 50)).toBe(100);
    });
    test("合計の条件は,'100'である", () => {
      expect(() => add(-10, 110)).toThrow(
        "入力値は0~100の間で入力してください",
      );
    });
  });
  describe("sub", () => {
    test("返り値は、第一引数と第二引数の「差」である", () => {
      expect(sub(51, 50)).toBe(1);
    });
    test("返り値の合計は、下限が'0'である", () => {
      expect(sub(70, 80)).toBe(0);
    });
  });
});
