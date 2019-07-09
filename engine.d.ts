import { Subject } from "rxjs";
declare const puppeteerSubject: Subject<string>;
declare const threadSubject: Subject<string>;
declare const engineSubject: Subject<EngineEvent>;
declare const jobSubject: Subject<EngineJob>;
declare const returnSubject: Subject<EngineJob>;
declare const run: (config: EngineConfig, threads?: number) => Promise<void>;
interface EngineEvent {
    data: {
        name: string;
        html: string;
        url: string;
    };
    uuid: string;
}
declare type EngineJob = [string, {
    name: string;
    url: string;
}];
declare type EngineConfig = {
    [uuid: string]: {
        name: string;
        url: string;
    };
};
export { run, puppeteerSubject, threadSubject, engineSubject, EngineEvent, EngineJob, jobSubject, returnSubject, };
