import { add, RangeError, sub } from "./index";

describe("四則演算", () => {
  describe("add", () => {
    test("引数が'0~100'の範囲外だった場合、例外をスローする", () => {
      const message = "入力値は0~100の間で入力してください";
      expect(() => add(-10, 10)).toThrow(message);
      expect(() => add(10, -10)).toThrow(message);
      expect(() => add(-10, 110)).toThrow(message);
    });
  });
  describe("sub", () => {
    test("引数が'0~100'の範囲外だった場合、例外をスローする", () => {
      expect(() => sub(-10, 10)).toThrow(RangeError);
      expect(() => sub(10, -10)).toThrow(RangeError);
      expect(() => sub(-10, 110)).toThrow(Error);
    });
  });
});
