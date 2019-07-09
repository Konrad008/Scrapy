"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const puppeteer = require("puppeteer");
const rxjs_1 = require("rxjs");
const puppeteerSubject = new rxjs_1.Subject();
exports.puppeteerSubject = puppeteerSubject;
const threadSubject = new rxjs_1.Subject();
exports.threadSubject = threadSubject;
const engineSubject = new rxjs_1.Subject();
exports.engineSubject = engineSubject;
const jobSubject = new rxjs_1.Subject();
exports.jobSubject = jobSubject;
const returnSubject = new rxjs_1.Subject();
exports.returnSubject = returnSubject;
const blockedResourceTypes = [
    'image',
    'media',
    'font',
    'texttrack',
    'object',
    'beacon',
    'csp_report',
    'imageset',
];
const skippedResources = [
    'quantserve',
    'adzerk',
    'doubleclick',
    'adition',
    'exelator',
    'sharethrough',
    'cdn.api.twitter',
    'google-analytics',
    'googletagmanager',
    'google',
    'fontawesome',
    'facebook',
    'analytics',
    'optimizely',
    'clicktale',
    'mixpanel',
    'zedo',
    'clicksor',
    'tiqcdn',
];
const run = async (config, threads = 2) => {
    const initEngines = async (threads) => {
        let engines = [];
        for await (const x of Array.from({ length: threads }, (x, y) => y)) {
            puppeteerSubject.next('start_' + x);
            const browser = await puppeteer.launch();
            puppeteerSubject.next('engine_launch_' + x);
            const page = await browser.newPage();
            puppeteerSubject.next('new_page_' + x);
            engines = [...engines, { browser, page }];
        }
        return engines;
    };
    const engines = await initEngines(threads);
    engines.map(async ({ page }) => {
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            const requestUrl = request._url.split('?')[0].split('#')[0];
            if (blockedResourceTypes.indexOf(request.resourceType()) !== -1 ||
                skippedResources.some(resource => requestUrl.indexOf(resource) !== -1)) {
                request.abort();
            }
            else {
                request.continue();
            }
        });
    });
    puppeteerSubject.next('prime_thread_');
    const thread0 = async (job, engine) => {
        try {
            const { page } = engine;
            const [uuid, { url, name }] = job;
            await page.goto('about:blank');
            threadSubject.next('goto_' + url);
            const response = await page.goto(url, {
                timeout: 25000,
                waitUntil: 'networkidle2',
            });
            if (response._status < 400) {
                await page.waitFor(3000);
                const html = await page.content();
                engineSubject.next({ 'data': { name, html, url }, uuid });
            }
            threadSubject.next('compleate_' + url);
        }
        catch (e) {
            await new Promise(resolve => {
                returnSubject.next(job);
                resolve();
            });
            console.error(e);
        }
    };
    jobSubject.pipe(operators_1.mergeMap((jobEv, index) => rxjs_1.from(thread0(jobEv, engines[index % threads])), threads)).subscribe();
    rxjs_1.from(Object.entries(config)).subscribe(jobEv => jobSubject.next(jobEv));
};
exports.run = run;
