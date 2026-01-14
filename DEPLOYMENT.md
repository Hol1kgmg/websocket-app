# Deployment Guide

このプロジェクトをCloudflareにデプロイする手順です。

## 構成

| サービス | デプロイ先 | 説明 |
| ------- | --------- | ----------- |
| Frontend | Cloudflare Pages | Next.js静的サイト |
| PartyKit Server | PartyKit Cloud | WebSocketサーバー（内部でDurable Objectsを使用） |

## 1. PartyKitサーバーのデプロイ

```bash
cd frontend

# PartyKitにログイン（初回のみ）
npx partykit login

# デプロイ（.envファイルの環境変数を含める）
npx partykit deploy --with-vars
```

デプロイ後、以下のようなURLが発行されます：

```
https://frontend-party.<your-username>.partykit.dev
```

### PartyKit環境変数

`.env` ファイルで以下の変数を設定できます：

| 変数名 | 説明 | デフォルト |
| ------ | ---- | --------- |
| `MAX_CONNECTIONS` | ルームあたりの最大接続数 | 10 |

## 2. Cloudflare Pagesへのデプロイ

### Option A: Wrangler CLI

```bash
cd frontend

# ビルド
nr build

# プロジェクト作成（初回のみ）
npx wrangler pages project create websocket-app

# デプロイ
npx wrangler pages deploy out
```

### Option B: GitHub連携

1. Cloudflare DashboardでGitHubリポジトリを連携
1. ビルド設定：
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: `frontend`

## 3. 環境変数の設定

Cloudflare Pagesで以下の環境変数を設定してください：

| 変数名 | 値 |
| ------ | -- |
| `NEXT_PUBLIC_PARTYKIT_HOST` | `frontend-party.<your-username>.partykit.dev` |

### 設定方法

1. Cloudflare Dashboard → Pages → websocket-app → Settings → Environment variables
1. 「Add variable」をクリック
1. Production環境に上記の変数を追加
1. 再デプロイを実行

## 4. 動作確認

1. Cloudflare PagesのURLにアクセス
1. カウンターが表示されることを確認
1. 複数ブラウザで開き、リアルタイム同期を確認
