/**
 * アプリ内のルート定数
 */
const ROUTES = {
  PLAYLIST: { name: "プレイリスト一覧", href: "/playlists" }, // プレイリスト一覧ページ
  ACCOUNT: { name: "アカウント", href: "/account" }, // アカウントページ
} as const;

export { ROUTES };
