import { checkLength } from ".";
import { ArticleInput } from "../fetchers/type";
import * as Fetchers from "../fetchers"; // モック化される
import { httpError, postMyArticleData } from "../fetchers/fixtures";

// 1. モジュール全体をモック化
jest.mock("../fetchers");

// モック化された関数を型安全に扱うためのキャスト
const mockedPostMyArticle = Fetchers.postMyArticle as jest.MockedFunction<typeof Fetchers.postMyArticle>;

function setupMock(input: ArticleInput, status = 200) {
    // 既存のモック実装をリセット
    mockedPostMyArticle.mockReset();

    if (status > 299) {
        return mockedPostMyArticle.mockRejectedValue(httpError);
    }

    try {
        checkLength(input.title);
        checkLength(input.body);
        return mockedPostMyArticle.mockResolvedValue({ ...postMyArticleData, ...input });
    } catch (err) {
        return mockedPostMyArticle.mockRejectedValue(httpError);
    }
}

function inputFactory(input?: Partial<ArticleInput>): ArticleInput {
    return {
        tags: ["testing"],
        title: "TypeScriptを使ったテストの書き方",
        body: "テストを書くとき、TypeScriptを使うことで、テストの保守性が向上します。",
        ...input,
    }
}

test("バリデーションに成功した場合、成功レスポンスが返る", async () => {
    const input = inputFactory();
    setupMock(input); 

    const data = await Fetchers.postMyArticle(input);
    
    expect(data).toMatchObject(expect.objectContaining(input));
    expect(mockedPostMyArticle).toHaveBeenCalled();
});


test("バリデーションに失敗した場合、rejectされる", async () => {
    expect.assertions(2);
    const input = inputFactory({ title: "", body: ""});
    setupMock(input);
    await Fetchers.postMyArticle(input).catch((err) => {
        expect(err).toMatchObject({ err: { message: expect.anything()}});
        expect(mockedPostMyArticle).toHaveBeenCalled();
    })
})

test("データ取得に失敗した場合、rejectされる", async () => {
    expect.assertions(2);
    const input = inputFactory();
    setupMock(input, 500);
    await Fetchers.postMyArticle(input).catch((err) => {
        expect(err).toMatchObject({ err: { message: expect.anything()}})
        expect(mockedPostMyArticle).toHaveBeenCalled();
    })
})