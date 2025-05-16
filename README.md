
# 中間駅ファインダー (Midpoint Station Finder)

このプロジェクトは、2つの指定された駅の中間地点となる駅を簡単に検索できるウェブアプリケーションです。React Router, Vite, Cloudflare Workers, Cloudflare D1, Drizzle ORM, TypeScript, Tailwind CSS を使用して構築されています。

## 主な機能

* **中間駅検索:** 2つの駅名を入力すると、それらの中間地点に最も近い駅を検索します。
* **駅名サジェスト:** 駅名入力時に、登録されている駅名候補を表示します。
* **検索履歴:** 最近検索した駅の組み合わせを保存し、簡単に再検索できます。
* **地図連携:** 検索結果の中間駅をGoogle マップで表示する機能を提供します。
* **サーバーサイドレンダリング (SSR):** React Router を使用したSSRに対応。
* **ホットモジュールリプレイスメント (HMR):** 開発時の高速なフィードバック。
* **アセットバンドルと最適化:** Viteによる効率的なビルド。
* **型安全:** TypeScriptによる堅牢な開発。
* **モダンなスタイリング:** Tailwind CSSによる柔軟なUI構築。

## 技術スタック

* **フロントエンド:** React, React Router v7
* **ビルドツール:** Vite
* **言語:** TypeScript
* **スタイリング:** Tailwind CSS, shadcn/ui (components), Sonner (notifications)
* **データベース:** Cloudflare D1
* **ORM:** Drizzle ORM
* **デプロイ:** Cloudflare Workers, Wrangler CLI
* **リンター/フォーマッター:** Biome, Prettier

## セットアップと開発

### 1. 依存関係のインストール

プロジェクトのルートディレクトリで以下のコマンドを実行します。

```bash
pnpm install
```

### 2. データベースのセットアップ (ローカル開発用)

Cloudflare D1 データベースをローカルでセットアップし、マイグレーションを実行します。

```bash
pnpm run db:migrate
```

このコマンドは `wrangler.jsonc` で定義されたローカルD1データベース (`DB`) に対してマイグレーションを適用します。

### 3. 開発サーバーの起動

以下のコマンドで開発サーバーを起動します。HMR (ホットモジュールリプレイスメント) が有効になります。

```bash
pnpm run dev
```

アプリケーションは `http://localhost:5173` で利用可能になります。

## ビルド

プロダクション用にアプリケーションをビルドします。

```bash
pnpm run build
```

ビルドされたアセットは `dist` ディレクトリ (または React Router の設定に基づくディレクトリ) に出力されます。

## デプロイ (Cloudflare Pages)

デプロイは Wrangler CLI を使用して行います。

### 1. Cloudflare D1 データベースの作成 (本番用)

CloudflareダッシュボードまたはWrangler CLIを使用して、本番用のD1データベースを作成します。

```sh
npx wrangler d1 create <name-of-your-database>
```

作成後、`wrangler.jsonc` ファイルを更新し、正しいデータベース名 (`database_name`) とID (`database_id`) を設定してください。

### 2. Drizzle設定ファイルの更新と本番マイグレーション

Drizzle ORMが本番D1データベースと通信できるように、`drizzle.config.ts` ファイルを適切に設定します（[Drizzle ORM D1ドキュメント参照](https://orm.drizzle.team/docs/guides/d1-http-with-drizzle-kit)）。

その後、本番データベースに対してマイグレーションを実行します。

```sh
pnpm run db:migrate-production
```

### 3. デプロイ

アプリケーションをビルドし、Cloudflare Workers にデプロイします。

```sh
pnpm run deploy
```

### プレビューデプロイ (任意)

変更を本番に反映する前にプレビューURLで確認したい場合は、以下のコマンドを使用します。

```sh
npx wrangler versions upload
```

バージョンアップロード後、Cloudflare Pages のダッシュボードから、または以下のコマンドで特定バージョンを本番にデプロイできます。

```sh
npx wrangler versions deploy
```

## スタイリング

このプロジェクトでは [Tailwind CSS](https://tailwindcss.com/) を使用しています。設定は `app/app.css` と `tailwind.config.js` (もしあれば。Viteプラグイン経由の場合、`vite.config.ts` 内の設定) に記述されています。
UIコンポーネントのベースとして shadcn/ui のパターンを採用しています。

---

Built with ❤️ using React Router and Cloudflare.
