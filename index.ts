import {
  run,
  EngineEvent,
  engineSubject,
  jobSubject,
  returnSubject,
  puppeteerSubject,
  threadSubject,
  EngineJob,
} from "./engine";

const engine = {
  run,
  engineSubject,
  jobSubject,
  puppeteerSubject,
  returnSubject,
  threadSubject,
};

export {
  engine as scrapyjs,
  run,
  EngineEvent,
  engineSubject,
  jobSubject,
  puppeteerSubject,
  returnSubject,
  threadSubject,
  EngineJob,
};
