/**
 * パラメータを文字列に変換します。
 * @param param 変換対象のパラメータ（string / string[] / undefined）
 * @returns パラメータの文字列。配列の場合は先頭要素、undefined の場合は空文字。
 */
const toStringParam = (param: string | string[] | undefined): string => {
  if (!param) return "";
  return Array.isArray(param) ? param[0] : param;
};

export { toStringParam };
