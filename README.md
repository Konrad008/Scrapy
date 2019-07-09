Welcome to ScrapyJS!

Library for crawling the web.

`npm i scrapyjs`

usage

```typescript
import {
  scrapyjs,
  EngineEvent,
  EngineJob,
  engineSubject,
  jobSubject,
  puppeteerSubject,
  returnSubject,
  threadSubject,
} from "scrapyjs";
import {concatMap, map} from "rxjs/operators";

// awaiting top level await
const runScrapy = async () =>
{

  await scrapyjs.run({
    'uuid': {
      name: 'WP',
      url: 'https://www.wp.pl/'
    }
  });
};

runScrapy();

/**
 * This stream emmits Engine
 */
engineSubject.pipe(
  map(async (engineEvent: EngineEvent) =>
    await console.log('process your EngineEvent response' + engineEvent.data.html)
  ),
).subscribe();

/**
 * This stream emmits EngineEvent's that was not compleated
 */
returnSubject.pipe(
  concatMap(async (job: EngineJob) =>
    await console.log(job)
  ),
).subscribe();

/**
 * This stream emmits job beeing executed ATM
 */
jobSubject.pipe(
  map((job: EngineJob) => job)
)

/**
 * DEBUG
 */
puppeteerSubject.subscribe({
  next: info => console.log(info),
});
threadSubject.subscribe({
  next: info => console.log(info),
});



```
