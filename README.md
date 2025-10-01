# Marp Slides App

複数人で LT 用のスライドを作成・共有する Web アプリケーション

## 特徴

- 📝 MDX 形式でスライド作成
- 🤖 AI アシスタント（Claude）による対話的なスライド作成
- 👥 GitHub ベースの共同編集（コンフリクト回避）
- 🎨 React コンポーネントによる柔軟なスライド表示
- 🚀 シンプルなファイル追加手順

## セットアップ

1. リポジトリをクローン

```bash
git clone [repository-url]
cd marp-slides-app
```

2. 依存関係をインストール

```bash
npm install
```

3. 開発サーバーを起動

```bash
npm run dev
```

## スライドの追加方法

Claude Code で `/make-slide` コマンドを実行すると、対話形式でスライドを作成できます：

1. LT のテーマを決める（AI が質問して引き出します）
2. 具体的に話す内容を決める（AI が提案も行います）
3. スライドを自動生成
4. 台本も自動生成

詳細は [.claude/commands/make-slide.md](.claude/commands/make-slide.md) を参照してください。

## MDX の書き方

````mdx
export const metadata = {
  title: "あなたのプレゼンテーションタイトル",
  author: "あなたの名前",
};

<div className="slide">

# スライドタイトル

## サブタイトル

</div>

---

<div className="slide">

## 次のスライド

- 箇条書き 1
- 箇条書き 2
- 箇条書き 3

</div>

---

<div className="slide">

## コード例

```javascript
const hello = () => {
  console.log("Hello, World!");
};
```
````

</div>
```

**ポイント:**

- 各スライドは `<div className="slide">` で囲む
- スライドの区切りは `---`（水平線）
- ファイルの先頭で `metadata` をエクスポート

## スライドフォーマットガイド

スライド作成時には以下の点に注意してください。詳細は [SLIDE_FORMAT_GUIDE.md](SLIDE_FORMAT_GUIDE.md) を参照してください。

### 見出しの制限

- **h1**: タイトルスライド（1枚目）のみで使用
- **h2**: 各スライドのタイトル。**最大2行まで**表示（2行を超えると切り取られます）
- **h3**: スライド内のセクション区切り

### 推奨事項

- h2タイトルは20-25文字×2行以内に収める
- 箇条書きは1スライドあたり3-6項目
- 1スライド1メッセージの原則
- 情報を詰め込みすぎない

### スライド構成パターン

**タイトルスライド:**
```mdx
<div className="slide">

# メインタイトル

## サブタイトル

</div>
```

**標準スライド:**
```mdx
<div className="slide">

## スライドタイトル

- 箇条書き1
- 箇条書き2

</div>
```

**セクション付きスライド:**
```mdx
<div className="slide">

## スライドタイトル

### セクション1

内容...

</div>
```

## プレビュー機能

- **キーボード操作**:
  - `→` or `Space`: 次のスライド
  - `←`: 前のスライド
  - `F`: フルスクリーン
  - `Esc`: フルスクリーン解除

## 技術スタック

- React + TypeScript
- Vite
- Tailwind CSS
- MDX (@mdx-js/rollup, @mdx-js/react)
- React Router

## トラブルシューティング

### スライドが表示されない

- `src/slides/`ディレクトリに配置されているか確認
- MDX 形式（`.mdx`拡張子）になっているか確認

### 画像が表示されない

- 画像は`public/(スライド名)/`に配置
- MDX では`![alt](/(スライド名)/filename.png)`で参照
