/**
 * アプリ内のルート定数
 *
 * 各ルートは表示名とパスを持つオブジェクトとして定義されています。
 * 表示名は日本語で提供され、ユーザーインターフェースで使用されます。
 * パスは対応するページへのリンクとして機能します。
 * 各ルートは不変であるため、`as const`を使用して型安全性を確保しています。
 *
 * @property {object} PLAYLIST - プレイリスト一覧ページのルート情報
 * @property {object} ACCOUNT - アカウントページのルート情報
 * @property {object} LOG - ログページのルート情報
 * @example
 * import { ROUTES } from 'constants/routes';
 * console.log(ROUTES.PLAYLIST.name); // "プレイリスト一覧"
 * console.log(ROUTES.ACCOUNT.href); // "/account"
 * console.log(ROUTES.LOG.name); // "ログ"
 */
const ROUTES = {
  PLAYLIST: { name: "プレイリスト一覧", href: "/playlists" }, // プレイリスト一覧ページ
  ACCOUNT: { name: "アカウント", href: "/account" }, // アカウントページ
  LOG: { name: "ログ", href: "/log" }, // ログページ
} as const;

export { ROUTES };
