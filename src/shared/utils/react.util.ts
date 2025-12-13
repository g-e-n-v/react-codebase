import { type ComponentType, createElement, lazy, Suspense, type SuspenseProps } from "react";

export type DynamicOptions = {
  fallback?: SuspenseProps["fallback"];
};

// biome-ignore lint/suspicious/noExplicitAny: lazy generic type
export function dynamic<T extends ComponentType<any>>(
  loader: () => Promise<{ default: T }>,
  { fallback }: DynamicOptions = {},
) {
  const Component = lazy<T>(loader);

  type P = T extends ComponentType<infer P> ? P : never;

  return (props: P) => createElement(Suspense, { fallback }, createElement(Component, props));
}
