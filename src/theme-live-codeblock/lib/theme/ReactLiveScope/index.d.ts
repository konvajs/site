/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
declare const ReactLiveScope: {
    createFactory<T extends HTMLElement>(type: keyof React.ReactHTML): React.HTMLFactory<T>;
    createFactory(type: keyof React.ReactSVG): React.SVGFactory;
    createFactory<P extends React.DOMAttributes<T>, T extends Element>(type: string): React.DOMFactory<P, T>;
    createFactory<P>(type: React.FunctionComponent<P>): React.FunctionComponentFactory<P>;
    createFactory<P>(type: React.ClassType<P, React.ClassicComponent<P, React.ComponentState>, React.ClassicComponentClass<P>>): React.CFactory<P, React.ClassicComponent<P, React.ComponentState>>;
    createFactory<P, T extends React.Component<P, React.ComponentState>, C extends React.ComponentClass<P>>(type: React.ClassType<P, T, C>): React.CFactory<P, T>;
    createFactory<P>(type: React.ComponentClass<P>): React.Factory<P>;
    createElement(type: "input", props?: (React.InputHTMLAttributes<HTMLInputElement> & React.ClassAttributes<HTMLInputElement>) | null, ...children: React.ReactNode[]): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    createElement<P extends React.HTMLAttributes<T>, T extends HTMLElement>(type: keyof React.ReactHTML, props?: (React.ClassAttributes<T> & P) | null, ...children: React.ReactNode[]): React.DetailedReactHTMLElement<P, T>;
    createElement<P extends React.SVGAttributes<T>, T extends SVGElement>(type: keyof React.ReactSVG, props?: (React.ClassAttributes<T> & P) | null, ...children: React.ReactNode[]): React.ReactSVGElement;
    createElement<P extends React.DOMAttributes<T>, T extends Element>(type: string, props?: (React.ClassAttributes<T> & P) | null, ...children: React.ReactNode[]): React.DOMElement<P, T>;
    createElement<P extends {}>(type: React.FunctionComponent<P>, props?: (React.Attributes & P) | null, ...children: React.ReactNode[]): React.FunctionComponentElement<P>;
    createElement<P extends {}>(type: React.ClassType<P, React.ClassicComponent<P, React.ComponentState>, React.ClassicComponentClass<P>>, props?: (React.ClassAttributes<React.ClassicComponent<P, React.ComponentState>> & P) | null, ...children: React.ReactNode[]): React.CElement<P, React.ClassicComponent<P, React.ComponentState>>;
    createElement<P extends {}, T extends React.Component<P, React.ComponentState>, C extends React.ComponentClass<P>>(type: React.ClassType<P, T, C>, props?: (React.ClassAttributes<T> & P) | null, ...children: React.ReactNode[]): React.CElement<P, T>;
    createElement<P extends {}>(type: React.FunctionComponent<P> | React.ComponentClass<P> | string, props?: (React.Attributes & P) | null, ...children: React.ReactNode[]): React.ReactElement<P>;
    cloneElement<P extends React.HTMLAttributes<T>, T extends HTMLElement>(element: React.DetailedReactHTMLElement<P, T>, props?: P, ...children: React.ReactNode[]): React.DetailedReactHTMLElement<P, T>;
    cloneElement<P extends React.HTMLAttributes<T>, T extends HTMLElement>(element: React.ReactHTMLElement<T>, props?: P, ...children: React.ReactNode[]): React.ReactHTMLElement<T>;
    cloneElement<P extends React.SVGAttributes<T>, T extends SVGElement>(element: React.ReactSVGElement, props?: P, ...children: React.ReactNode[]): React.ReactSVGElement;
    cloneElement<P extends React.DOMAttributes<T>, T extends Element>(element: React.DOMElement<P, T>, props?: React.DOMAttributes<T> & P, ...children: React.ReactNode[]): React.DOMElement<P, T>;
    cloneElement<P>(element: React.FunctionComponentElement<P>, props?: Partial<P> & React.Attributes, ...children: React.ReactNode[]): React.FunctionComponentElement<P>;
    cloneElement<P, T extends React.Component<P, React.ComponentState>>(element: React.CElement<P, T>, props?: Partial<P> & React.ClassAttributes<T>, ...children: React.ReactNode[]): React.CElement<P, T>;
    cloneElement<P>(element: React.ReactElement<P>, props?: Partial<P> & React.Attributes, ...children: React.ReactNode[]): React.ReactElement<P>;
    createContext<T>(defaultValue: T): React.Context<T>;
    isValidElement<P>(object: {} | null | undefined): object is React.ReactElement<P>;
    createRef<T>(): React.RefObject<T>;
    forwardRef<T, P = {}>(render: React.ForwardRefRenderFunction<T, P>): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>;
    memo<P extends object>(Component: React.FunctionComponent<P>, propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean): React.NamedExoticComponent<P>;
    memo<T extends React.ComponentType<any>>(Component: T, propsAreEqual?: (prevProps: Readonly<React.ComponentProps<T>>, nextProps: Readonly<React.ComponentProps<T>>) => boolean): React.MemoExoticComponent<T>;
    lazy<T extends React.ComponentType<any>>(factory: () => Promise<{
        default: T;
    }>): React.LazyExoticComponent<T>;
    useContext<T>(context: React.Context<T>): T;
    useState<S>(initialState: S | (() => S)): [S, React.Dispatch<React.SetStateAction<S>>];
    useState<S = undefined>(): [S | undefined, React.Dispatch<React.SetStateAction<S | undefined>>];
    useReducer<R extends React.ReducerWithoutAction<any>, I>(reducer: R, initializerArg: I, initializer: (arg: I) => React.ReducerStateWithoutAction<R>): [React.ReducerStateWithoutAction<R>, React.DispatchWithoutAction];
    useReducer<R extends React.ReducerWithoutAction<any>>(reducer: R, initializerArg: React.ReducerStateWithoutAction<R>, initializer?: undefined): [React.ReducerStateWithoutAction<R>, React.DispatchWithoutAction];
    useReducer<R extends React.Reducer<any, any>, I>(reducer: R, initializerArg: I & React.ReducerState<R>, initializer: (arg: I & React.ReducerState<R>) => React.ReducerState<R>): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>];
    useReducer<R extends React.Reducer<any, any>, I>(reducer: R, initializerArg: I, initializer: (arg: I) => React.ReducerState<R>): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>];
    useReducer<R extends React.Reducer<any, any>>(reducer: R, initialState: React.ReducerState<R>, initializer?: undefined): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>];
    useRef<T>(initialValue: T): React.MutableRefObject<T>;
    useRef<T>(initialValue: T | null): React.RefObject<T>;
    useRef<T = undefined>(): React.MutableRefObject<T | undefined>;
    useLayoutEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
    useEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
    useImperativeHandle<T, R extends T>(ref: React.Ref<T> | undefined, init: () => R, deps?: React.DependencyList): void;
    useCallback<T extends Function>(callback: T, deps: React.DependencyList): T;
    useMemo<T>(factory: () => T, deps: React.DependencyList | undefined): T;
    useDebugValue<T>(value: T, format?: (value: T) => any): void;
    useDeferredValue<T>(value: T): T;
    useTransition(): [boolean, React.TransitionStartFunction];
    startTransition(scope: React.TransitionFunction): void;
    useId(): string;
    useInsertionEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
    useSyncExternalStore<Snapshot>(subscribe: (onStoreChange: () => void) => () => void, getSnapshot: () => Snapshot, getServerSnapshot?: () => Snapshot): Snapshot;
    Children: {
        map<T, C>(children: C | ReadonlyArray<C>, fn: (child: C, index: number) => T): C extends null | undefined ? C : Array<Exclude<T, boolean | null | undefined>>;
        forEach<C>(children: C | ReadonlyArray<C>, fn: (child: C, index: number) => void): void;
        count(children: any): number;
        only<C>(children: C): C extends any[] ? never : C;
        toArray(children: React.ReactNode | React.ReactNode[]): Array<Exclude<React.ReactNode, boolean | null | undefined>>;
    };
    Fragment: React.ExoticComponent<{
        children?: React.ReactNode | undefined;
    }>;
    StrictMode: React.ExoticComponent<{
        children?: React.ReactNode | undefined;
    }>;
    Suspense: React.ExoticComponent<React.SuspenseProps>;
    version: string;
    Profiler: React.ExoticComponent<React.ProfilerProps>;
    Component: typeof React.Component;
    PureComponent: typeof React.PureComponent;
    React: typeof React;
};
export default ReactLiveScope;
