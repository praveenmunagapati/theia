/*
* Copyright (C) 2017 TypeFox and others.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import { VirtualWidget } from "@theia/core/lib/browser";
import { StatusbarEntry } from './statusbar-service';


export class StatusbarWidget extends VirtualWidget {

    protected _entryData: StatusbarEntry;

    constructor(readonly id: string) {
        super();

    }

    get entryData(): StatusbarEntry {
        return this._entryData;
    }

    set entryData(data: StatusbarEntry) {
        this._entryData = data;
    }



};