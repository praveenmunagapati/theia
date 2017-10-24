/*
* Copyright (C) 2017 TypeFox and others.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import { injectable } from 'inversify';
import { StatusbarWidget } from './statusbar-widget';
import { STATUSBAR_WIDGET_FACTORY_ID } from './statusbar-service';
import { WidgetFactory } from "@theia/core/lib/browser";

@injectable()
export class StatusbarWidgetFactory implements WidgetFactory {
    id = STATUSBAR_WIDGET_FACTORY_ID;

    createWidget(widgetId: string): Promise<StatusbarWidget> {
        return Promise.resolve(new StatusbarWidget(widgetId));
    }

}