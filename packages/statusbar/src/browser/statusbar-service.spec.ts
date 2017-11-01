/*
* Copyright (C) 2017 TypeFox and others.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

// import { Container, ContainerModule } from "inversify";
// import { expect } from 'chai';
import { bindContributionProvider, ILogger } from "@theia/core";
// import { StatusbarService } from './statusbar-service';
import { WidgetFactory, WidgetManager } from "@theia/core/lib/browser";
// import { Widget } from "@phosphor/widgets";
// import { Signal } from "@phosphor/signaling";

// let statusbarService: StatusbarService;

// class StatusbarWidgetFactory implements WidgetFactory {
//     id = "statusbar";

//     async createWidget(options?: any): Promise<Widget> {
//         // create a mock Widget, since a real widget has deps to dom api
//         const result = {} as Widget;
//         result.id = name;
//         // tslint:disable-next-line:no-any
//         (<any>result).disposed = new Signal<Widget, void>(result);
//         return result;
//     }

// }

// before(() => {
//     const testContainer = new Container();

//     const module = new ContainerModule(bind => {
//         bindContributionProvider(bind, WidgetFactory);
//         bind(WidgetFactory).toConstantValue(new StatusbarWidgetFactory());
//         bind(WidgetManager).toSelf().inSingletonScope();
//         bind(StatusbarService).toSelf().inSingletonScope();
//     });
//     testContainer.load(module);
//     statusbarService = testContainer.get(StatusbarService);
// });

// describe("statusbar service", () => {

//     it("creates widget", async () => {
//         // const widget = await statusbarService.getOrCreateWidget('test');
//         // expect(widget).to.have.property('entryData');
//         expect(true).to.be.true;
//     });

// });

import { Container, ContainerModule } from 'inversify';
import { expect } from 'chai';
import { Widget } from '@phosphor/widgets';
import { Signal } from '@phosphor/signaling';
import { MockLogger } from "@theia/core/lib/common/test/mock-logger";

class TestWidgetFactory implements WidgetFactory {

    invocations = 0;
    id = 'test';

    async createWidget(name: string): Promise<Widget> {
        this.invocations++;
        // create a mock Widget, since a real widget has deps to dom api
        const result = {} as Widget;
        result.id = name;
        // tslint:disable-next-line:no-any
        (<any>result).disposed = new Signal<Widget, void>(result);
        return result;
    }
}

let widgetManager: WidgetManager;

before(() => {
    const testContainer = new Container();

    const module = new ContainerModule((bind, unbind, isBound, rebind) => {
        bind(ILogger).to(MockLogger);
        bindContributionProvider(bind, WidgetFactory);
        bind(WidgetFactory).toConstantValue(new TestWidgetFactory());
        bind(WidgetManager).toSelf().inSingletonScope();
    });
    testContainer.load(module);

    widgetManager = testContainer.get(WidgetManager);
});

describe("widget-manager", () => {

    it("creates and caches widgets", async () => {
        const wA = await widgetManager.getOrCreateWidget('test', 'widgetA');
        const wB = await widgetManager.getOrCreateWidget('test', 'widgetB');
        expect(wA).not.equals(wB);
        expect(wA).equals(await widgetManager.getOrCreateWidget('test', 'widgetA'));
    });

});
