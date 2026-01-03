# API Route Rules (App Router)

このディレクトリは **Next.js App Router の Route Handlers
(`app/api/**/route.ts`) を配置する場所\*\*です。

API ファイルが肥大化しないよう、**Route Handler
は薄く保ち、実処理は別ファイルに切り出す**ことを原則とします。

---

## 🎯 基本方針

Route Handler の責務は次の 3 つ **だけ** にする。

1.  リクエストの受け取り\
2.  入力値のバリデーション\
3.  サービス層を呼び出し、HTTP レスポンスを返す

> ❌ DB 処理・ビジネスロジックを直接ここに書かない

---

## 📁 ディレクトリ構成

```txt
app/
  api/
    todos/
      route.ts          ← ここは薄く

lib/
  services/
    todo.service.ts     ← ビジネスロジック
  repositories/
    todo.repository.ts  ← DB処理
  schemas/
    todo.schema.ts      ← validation (zod など)
```

---

## ✨ Route Handler は薄くする例

```ts
// app/api/todos/route.ts
import { NextResponse } from "next/server";
import { createTodo } from "@/lib/services/todo.service";
import { todoSchema } from "@/lib/schemas/todo.schema";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = todoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const todo = await createTodo(parsed.data);
  return NextResponse.json(todo);
}
```

---

## 🧠 ビジネスロジックは Service 層へ

```ts
// lib/services/todo.service.ts
import { createTodoDB } from "../repositories/todo.repository";

export async function createTodo(data: { title: string }) {
  return createTodoDB(data);
}
```

---

## 🗄 DB 操作は Repository 層へ

```ts
// lib/repositories/todo.repository.ts
import { db } from "@/lib/db";

export async function createTodoDB(data: { title: string }) {
  return db.todo.create({ data });
}
```

---

## 🔐 バリデーションは Schema 層へ

```ts
// lib/schemas/todo.schema.ts
import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(1),
});
```

---

## 📏 責務の分離ルール

レイヤー 役割

---

`app/api/**/route.ts` HTTP 処理（Controller）
`lib/services/**` ビジネスロジック
`lib/repositories/**` DB 処理
`lib/schemas/**` 入力値バリデーション

---

## ❌ 禁止事項

- Route Handler に DB 処理を書く\
- Service 層から HTTP Response を返す\
- Fat Route Handler（長大ファイル）

---

## 🧪 テスト方針

- Service 層はユニットテスト可能な形を保つ\
- Route Handler は統合テスト対象

---

## 🌱 命名ルール

HTTP メソッド関数を使う。

- `GET`
- `POST`
- `PUT`
- `DELETE`

例:

```ts
export async function GET() {}
export async function POST() {}
```

---

## 📚 ドキュメントポリシー

API ごとに README を作らず、\
**このファイルで運用ルールを一元管理する。**

---

## 🎯 目的

- 見通しの良い設計\
- 責務の分離\
- テストしやすい構成\
- スケールしても破綻しない API 設計
