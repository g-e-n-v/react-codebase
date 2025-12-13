import { type ComponentType, createElement, type PropsWithChildren } from "react";

type PureProvider = ComponentType<PropsWithChildren>;

export function composeProviders(providers: PureProvider[]): PureProvider {
  return ({ children }: PropsWithChildren) =>
    providers.reduceRight((element, Provider) => createElement(Provider, {}, element), children);
}
