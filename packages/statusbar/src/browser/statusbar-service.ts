/*
* Copyright (C) 2017 TypeFox and others.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import { injectable, inject } from "inversify";
import { StatusbarWidget } from './statusbar-widget';
import { Command, Disposable, DisposableCollection } from "@theia/core";
import { WidgetManager } from "@theia/core/lib/browser";

export interface StatusbarEntry {
    text: string;
    tooltip?: string;
    command?: Command;
    arguments?: any[];
}

export enum StatusbarAlignment {
    LEFT, RIGHT
}

export const STATUSBAR_WIDGET_FACTORY_ID = 'statusbar';

@injectable()
export class StatusbarService {

    protected toDispose = new DisposableCollection();

    constructor( @inject(WidgetManager) protected readonly widgetManager: WidgetManager) {

    }

    async getOrCreateWidget(id: string): Promise<StatusbarWidget> {
        const widget = await this.widgetManager.getOrCreateWidget<StatusbarWidget>(STATUSBAR_WIDGET_FACTORY_ID, id);

        console.log("getorcreatewidget", widget);

        return widget;
    }

    addEntry(entry: StatusbarWidget, alignment: StatusbarAlignment, priority?: number): Disposable {

        console.log("Add to bar", entry, alignment, priority);

        return {
            dispose: () => {
                // something must be destroyed here.

                if (this.toDispose) {
                    this.toDispose.dispose();
                }
            }
        }
    }


}
