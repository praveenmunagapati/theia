/*
* Copyright (C) 2017 TypeFox and others.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import { StatusbarService, StatusbarAlignment } from '@theia/statusbar/lib/browser/statusbar-service';
import { EditorManager } from './editor-manager';
import { injectable, inject } from "inversify";

@injectable()
export class EditorContribution {

    constructor(
        @inject(StatusbarService) protected readonly statusbarService: StatusbarService,
        @inject(EditorManager) protected readonly editorManager: EditorManager
    ) {
        this.addStatusbarWidgets();
    }

    protected async addStatusbarWidgets() {
        const widget = await this.statusbarService.getOrCreateWidget('editor-status-language');
        this.statusbarService.addEntry(widget, StatusbarAlignment.RIGHT, 100);

        this.editorManager.onCurrentEditorChanged(async e => {
            if (e) {
                const langId = e.editor.document.languageId;
                widget.entryData = {
                    text: langId
                };
            }
        });
    }
}
