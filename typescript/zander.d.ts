

declare module 'zander' {

    class SimpleFilePathMatchLoader implements IConfigLoader {
        constructor(filePath: string[]);
        loadConfig(): Promise<string[]>;
    }

    interface IConfigLoader {
        loadConfig(): Promise<string[]>;
    }

    interface IDependencyOptions {
        configLoader: IConfigLoader,
        modulePath: string
    }

    interface IDependencyManager {
        configure(): Promise<boolean>;

        getBean(name: string): any;
    }

    function DependencyInjection(options: IDependencyOptions): IDependencyManager;

}
