export interface BaseUsecaseInterface<
  ExecuteArgs extends any[] = any[],
  Output = any,
  ValidateArgs extends any[] = ExecuteArgs
> {
  execute(...args: ExecuteArgs): Promise<Output>;
  validate(...args: ValidateArgs): void;
}