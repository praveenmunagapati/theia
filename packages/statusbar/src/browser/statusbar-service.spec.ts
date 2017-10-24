/*
* Copyright (C) 2017 TypeFox and others.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import { Container, ContainerModule } from "inversify";
import { expect } from 'chai';
import { bindContributionProvider } from "@theia/core";
import { StatusbarWidgetFactory } from './statusbar-widget-factory';
import { StatusbarService } from './statusbar-service';
import { WidgetFactory, WidgetManager } from "@theia/core/lib/browser";

let statusbarService: StatusbarService;

before(() => {
    const testContainer = new Container();

    const module = new ContainerModule(bind => {
        bindContributionProvider(bind, WidgetFactory);
        bind(WidgetFactory).toConstantValue(new StatusbarWidgetFactory());
        bind(WidgetManager).toSelf().inSingletonScope();
        bind(StatusbarService).toSelf().inSingletonScope();
    });
    testContainer.load(module);
    statusbarService = testContainer.get(StatusbarService);
});

describe("statusbar service", () => {

    it("creates widget", async () => {
        const widget = await statusbarService.getOrCreateWidget('test');
        expect(widget).to.have.property('entryData');
    });

});
