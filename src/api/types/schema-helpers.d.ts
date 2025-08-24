type TApiPaths = import('./schema').paths

type TPathKeys = keyof TApiPaths

type TPathMethods<Path extends TPathKeys> = keyof TApiPaths[Path]

type TResponse<Path extends TPathKeys, Method extends TPathMethods<Path>> = TApiPaths[Path][Method]['responses']['200']['content']['application/json']

type TRequestParameters<Path extends TPathKeys, Method extends TPathMethods<Path>> = TApiPaths[Path][Method]['parameters']['path']

type TRequestQuery<Path extends TPathKeys, Method extends TPathMethods<Path>> = TApiPaths[Path][Method]['parameters']['query']

type TRequestBody<Path extends TPathKeys, Method extends TPathMethods<Path>> = Required<TApiPaths[Path][Method]>['requestBody']['content']['application/json']

type TRequestBodyFormData<Path extends TPathKeys, Method extends TPathMethods<Path>> = Required<TApiPaths[Path][Method]>['requestBody']['content']['multipart/form-data']

type TApiPrefix = `/api/${string}/`

type TShortPath<T extends TApiPrefix> = T extends `${TApiPrefix}${infer Rest}` ? Rest : never

type TShortPathKeys = TShortPath<TPathKeys>

type TShortToFullPath = {
  [K in TPathKeys as TShortPath<K>]: K
}
