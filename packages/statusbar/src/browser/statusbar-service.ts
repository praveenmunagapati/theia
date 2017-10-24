/*
* Copyright (C) 2017 TypeFox and others.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import { injectable, inject } from "inversify";
import { StatusbarWidget } from './statusbar-widget';
import { Command } from "@theia/core";
import { WidgetManager } from "@theia/core/lib/browser";

export interface StatusbarEntry {
    text: string;
    tooltip?: string;
    command?: Command;
    arguments?: any[];
}

export const STATUSBAR_WIDGET_FACTORY_ID = 'statusbar';

@injectable()
export class StatusbarService {

    constructor( @inject(WidgetManager) protected readonly widgetManager: WidgetManager) {

    }

    getOrCreateWidget(id: string): Promise<StatusbarWidget> {
        return this.widgetManager.getOrCreateWidget(STATUSBAR_WIDGET_FACTORY_ID, id);
    }

}
