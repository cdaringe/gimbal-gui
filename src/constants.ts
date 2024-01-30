// @ts-expect-error - no node types
export const isProd = process.env.NODE_ENV === "production";
export const isDev = !isProd;
