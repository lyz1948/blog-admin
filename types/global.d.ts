declare module '*.css' {
  const styles: any
  export = styles
}

declare var module: any
declare var require: any
declare var promiseMiddleware: any

declare var API: any

declare interface Loading {
  newInstance: {
    new (): any
  }
}

declare interface NodeModule {
  hot: {
    accept(path?: () => void, callback?: () => void): void
  }
}

type omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;
