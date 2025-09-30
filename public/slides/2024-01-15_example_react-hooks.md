---
marp: true
theme: default
paginate: true
---

# React Hooks入門

Example User
2024-01-15

---

## 自己紹介

- 名前：Example User
- 所属：フロントエンドチーム
- 興味：React, TypeScript, パフォーマンス最適化

---

## アジェンダ

1. React Hooksとは
2. 基本的なHooks
3. カスタムHooks
4. ベストプラクティス
5. まとめ

---

## React Hooksとは

- React 16.8で導入
- 関数コンポーネントで状態管理が可能に
- クラスコンポーネントを使わずに機能を実装

---

## 基本的なHooks

### useState

```javascript
const [count, setCount] = useState(0);
```

### useEffect

```javascript
useEffect(() => {
  // 副作用の処理
  return () => {
    // クリーンアップ
  };
}, [dependencies]);
```

---

## カスタムHooks

再利用可能なロジックの抽出

```javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  return { count, increment, decrement };
}
```

---

## ベストプラクティス

1. **ルールを守る**
   - トップレベルでのみ呼び出す
   - React関数内でのみ呼び出す

2. **依存配列を正しく設定**
   - ESLintルールを活用

3. **カスタムHooksで共通化**
   - DRY原則の実践

---

## まとめ

- Hooksで関数コンポーネントが強力に
- 状態管理とライフサイクルの統一的な扱い
- カスタムHooksで再利用性向上

---

## ご清聴ありがとうございました

質問やフィードバックはお気軽に！

🔗 [GitHub](https://github.com/example)
📧 example@example.com