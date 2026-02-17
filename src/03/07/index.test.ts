import { timeout, wait } from "./index";

//resolve
test("指定時間待つと、経過時間を持ってresolveされる", () => {
  return wait(50).then((duration) => {
    expect(duration).toBe(50);
  });
});

test("指定時間待つと、経過時間を持ってresolveされる", () => {
  return expect(wait(50)).resolves.toBe(50);
});

test("指定時間待つと、経過時間を持ってresolveされる", async () => {
  await expect(wait(50)).resolves.toBe(50);
});

//一番いい書き方
test("指定時間待つと、経過時間を持ってresolveされる", async () => { 
  expect(await wait(50)).toBe(50);
});

//reject
test("指定時間待つと、経過時間を持ってrejectされる", () => {
  return timeout(50).catch((duration) => {
    expect(duration).toBe(50);
  });
});

test("指定時間待つと、経過時間を持ってrejectされる", () => {
  return expect(timeout(50)).rejects.toBe(50);
});

//一番いい書き方
test("指定時間待つと、経過時間を持ってrejectされる", async () => { 
  await expect(timeout(50)).rejects.toBe(50);
});

test("指定時間待つと、経過時間を持ってrejectされる", async () => {
  expect.assertions(1);
  try {
    await timeout(50);
  } catch (err) {
    expect(err).toBe(50);
  }
});


// 非同期処理を含むテストは、テスト関数をasync関数で書く
//.resolvesや.rejectsを含むアサーションはawaitする
//try...catch文による例外スローを検証する場合、expect.assertionsを書く