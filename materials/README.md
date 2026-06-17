# materials

Codex セッションで読み取るローカル資料をここに置きます。

## 置き方

```text
materials/
  basic-info/
  color-test/
  trap-hunting/
```

- PDF、Markdown、テキスト、画像を配置できます。
- Web ページはファイルとして保存せず、チャットで URL を渡してください。
- Codex は URL を確認したあと、該当 study の `study.config.json` に source として追記し、`data/units.json` と `data/questions.json` を更新します。

## 生成先

このディレクトリは入力置き場です。GitHub Pages に公開される HTML は `npm run generate` により `dist/` に作られます。
