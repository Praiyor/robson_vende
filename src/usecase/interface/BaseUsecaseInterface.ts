export interface BaseUsecaseInterface<Args extends any[] = any[], Output = any> {
    execute(...args: Args): Promise<Output>;
    validate(...args: Args): void;
}