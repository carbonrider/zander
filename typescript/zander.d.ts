

declare module 'zander' {

    class SimpleFilePathMatchLoader {
        constructor(filePath: string[]);
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
