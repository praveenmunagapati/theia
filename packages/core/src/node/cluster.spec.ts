/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

// tslint:disable:no-console
import * as path from 'path';
import * as cluster from 'cluster';
import { MasterProcess } from './cluster/master-process';

process.on('unhandledRejection', (reason, promise) => {
    throw reason;
});

describe('master-process', () => {

    function prepareTestWorker(job: string) {
        const testSettings: cluster.ClusterSettings = {
            exec: path.resolve(__dirname, '../../lib/node/test/cluster-test-worker.js'),
            execArgv: [],
            args: [job],
            stdio: ['ipc', 1, 2]
        };
        cluster.setupMaster(testSettings);
    }

    let originalSettings: cluster.ClusterSettings;
    beforeEach(() => originalSettings = cluster.settings);
    afterEach(() => cluster.setupMaster(originalSettings));

    it('start', async function () {
        this.timeout(10000);
        const master = new MasterProcess();

        prepareTestWorker('restart');
        const restartWorker = master.start();

        prepareTestWorker('timeout next worker');
        await master.restarting;
        prepareTestWorker('restarted');

        const restartedWorker = await master.restarted;
        await restartWorker.exit;
        await restartedWorker.exit;
    });

});
