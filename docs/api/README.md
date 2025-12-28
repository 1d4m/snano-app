# API 定義書

## プレイリスト API

### エンドポイント

```
/api/playlists
```

### GET

#### 概要

全てのプレイリストを取得する

#### リクエストパラメータ

なし

#### レスポンス例

```json
[
  {
    "id": 1,
    "title": "朝のルーティン"
  },
  {
    "id": 2,
    "title": "仕事用タスク"
  }
]
```

#### ステータスコード

200 OK

### POST

#### 概要

新しいプレイリストを追加する

#### リクエストボディ

```json
{
  "title": "新しいプレイリスト"
}
```

#### レスポンス例

```json
{
  "id": 3,
  "title": "新しいプレイリスト"
}
```

#### ステータスコード

- 201 Created
- 400 Bad Request (title がない場合)

## プレイリストアイテム API

### エンドポイント

```
/api/playlists/[playlistId]/items
```

### GET

#### 概要

指定したプレイリストの全アイテムを取得する

#### URL パラメータ

| パラメータ   | 型     | 説明                      |
| ------------ | ------ | ------------------------- |
| `playlistId` | number | 取得対象のプレイリスト ID |

#### レスポンス例

```json
[
  {
    "id": 1,
    "playlist_id": 1,
    "title": "起床",
    "description": "目覚ましで起きる",
    "limit_at": null,
    "is_completed": false
  }
]
```

#### ステータスコード

200 OK

### POST

#### 概要

指定したプレイリストに新しいアイテムを追加する

#### URL パラメータ

| パラメータ   | 型     | 説明                      |
| ------------ | ------ | ------------------------- |
| `playlistId` | number | 追加するプレイリストの ID |

#### リクエストボディ

```json
{
  "title": "ジョギング",
  "description": "朝 30 分走る",
  "limit_at": "2025-11-24T08:00:00Z",
  "is_completed": false
}
```

#### レスポンス例

```json
{
  "id": 2,
  "playlist_id": 1,
  "title": "ジョギング",
  "description": "朝 30 分走る",
  "limit_at": "2025-11-24T08:00:00Z",
  "is_completed": false
}
```

#### ステータスコード

- 201 Created
- 400 Bad Request (title がない場合)
