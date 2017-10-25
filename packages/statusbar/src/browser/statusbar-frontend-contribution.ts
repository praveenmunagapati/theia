/*
* Copyright (C) 2017 TypeFox and others.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import { FrontendApplicationContribution, FrontendApplication } from "@theia/core/lib/browser";
import {
    BoxLayout,
    Panel
} from "@phosphor/widgets";
import { injectable } from "inversify";

@injectable()
export class StatusbarFrontendContribution implements FrontendApplicationContribution {

    constructor() { }

    onStart(app: FrontendApplication) {
        console.log("statusbar frontend contribution", app.shell.layout);

        const bottomPanel = new Panel();
        bottomPanel.id = 'theia-statusbar';
        BoxLayout.setStretch(bottomPanel, 0);
        if (app.shell.layout && app.shell.layout instanceof BoxLayout) {
            app.shell.layout.addWidget(bottomPanel);
        }
    }
}