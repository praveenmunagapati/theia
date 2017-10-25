/*
* Copyright (C) 2017 TypeFox and others.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import { StatusbarWidget } from './statusbar-widget';
import { StatusbarService } from './statusbar-service';
import { StatusbarFrontendContribution } from './statusbar-frontend-contribution';
import { StatusbarWidgetFactory } from './statusbar-widget-factory';
import { ContainerModule } from "inversify";
import { WidgetFactory, FrontendApplicationContribution } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bind(StatusbarWidget).toSelf();

    bind(StatusbarWidgetFactory).toSelf().inSingletonScope();
    bind(WidgetFactory).toDynamicValue(c => c.container.get(StatusbarWidgetFactory));

    bind(StatusbarFrontendContribution).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toDynamicValue(c => c.container.get(StatusbarFrontendContribution));

    bind(StatusbarService).toSelf().inSingletonScope();
});
