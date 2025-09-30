# Marp Slides App

複数人でLT用のスライドを作成・共有するWebアプリケーション

## 特徴

- 📝 Markdown形式でスライド作成
- 👥 GitHubベースの共同編集（コンフリクト回避）
- 🎨 Marpによる美しいスライド表示
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

### 1. リポジトリを最新に更新
```bash
git pull origin main
```

### 2. 新しいスライドを作成
```bash
# テンプレートをコピー
cp public/slides/template.md public/slides/YYYY-MM-DD_yourname_title.md

# 例:
cp public/slides/template.md public/slides/2024-01-20_tanaka_react-tips.md
```

### 3. スライドを編集
お好きなエディタでMarkdownファイルを編集してください。

### 4. コミット & プッシュ
```bash
git add public/slides/2024-01-20_tanaka_react-tips.md
git commit -m "Add: React tips slide by tanaka"
git push origin main
```

## ファイル命名規則

`YYYY-MM-DD_username_title.md`

- **YYYY-MM-DD**: 発表日（例: 2024-01-20）
- **username**: あなたの名前（例: tanaka）
- **title**: スライドのタイトル（スペースは`-`で置換）

## Markdownの書き方

```markdown
---
marp: true
theme: default
paginate: true
---

# スライドタイトル

発表者名
2024-01-20

---

## 次のスライド

- 箇条書き1
- 箇条書き2

---

## コード例

\`\`\`javascript
const hello = () => {
  console.log("Hello, World!");
};
\`\`\`
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
- Marp Core
- React Router

## トラブルシューティング

### スライドが表示されない
- ファイル名が命名規則に従っているか確認
- `public/slides/`ディレクトリに配置されているか確認

### 画像が表示されない
- 画像は`public/images/`に配置
- Markdownでは`![alt](/images/filename.png)`で参照