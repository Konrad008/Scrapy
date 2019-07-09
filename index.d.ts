import { run, EngineEvent, engineSubject, jobSubject, returnSubject, puppeteerSubject, threadSubject } from "./engine";
declare const engine: {
    run: (config: {
        [uuid: string]: {
            name: string;
            url: string;
        };
    }, threads?: number) => Promise<void>;
    engineSubject: import("rxjs").Subject<EngineEvent>;
    jobSubject: import("rxjs").Subject<[string, {
        name: string;
        url: string;
    }]>;
    puppeteerSubject: import("rxjs").Subject<string>;
    returnSubject: import("rxjs").Subject<[string, {
        name: string;
        url: string;
    }]>;
    threadSubject: import("rxjs").Subject<string>;
};
export { engine as scrapyjs, run, EngineEvent, engineSubject, jobSubject, puppeteerSubject, returnSubject, threadSubject };
