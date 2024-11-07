/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { EditorEnvelopeLocator, EnvelopeContentType, EnvelopeMapping } from "@kie-tools-core/editor/dist/api";
import * as KogitoVsCode from "@kie-tools-core/vscode-extension";
import * as vscode from "vscode";
import * as path from "path";
import { ComponentServer } from "./ComponentsHttpServer";
import { DashbuilderVsCodeExtensionConfiguration } from "./configuration";
import { setupDashboardEditorControls } from "./setupDashboardEditorControls";
import { DashbuilderViewerChannelApiProducer } from "../api/DashbuilderViewerChannelApiProducer";
import { setupBuiltInVsCodeEditorDashbuilderContributions } from "./builtInVsCodeEditorDashbuilderContributions";
import { VsCodeDashbuilderLanguageService } from "./languageService/VsCodeDashbuilderLanguageService";

export async function activate(context: vscode.ExtensionContext) {
  console.info("Extension is alive.");

  const componentsPath = path.join(context.extensionPath, "/dist/webview/dashbuilder/component/");
  const componentServer = new ComponentServer(componentsPath);

  componentServer.start();
  context.subscriptions.push(
    new vscode.Disposable(() => {
      return componentServer.stop();
    })
  );

  const kieEditorsStore = await KogitoVsCode.startExtension({
    extensionName: "kie-group.vscode-extension-dashbuilder-editor",
    context: context,
    editorDocumentType: "text",
    viewType: "kieKogitoWebviewEditorsDashbuilder",
    editorEnvelopeLocator: new EditorEnvelopeLocator("vscode", [
      new EnvelopeMapping({
        type: "dashbuilder",
        filePathGlob: "**/*.dash.+(yaml|yml|json)",
        resourcesPathPrefix: "dist/webview/",
        envelopeContent: { type: EnvelopeContentType.PATH, path: "dist/webview/DashbuilderEditorEnvelopeApp.js" },
      }),
    ]),
    channelApiProducer: new DashbuilderViewerChannelApiProducer(
      new Promise((resolve) => {
        const componentServerUrl = `http://localhost:${componentServer.port}`;
        resolve(componentServerUrl);
      })
    ),
  });

  const configuration = new DashbuilderVsCodeExtensionConfiguration();

  const vsCodeDashbuilderLanguageService = new VsCodeDashbuilderLanguageService();

  setupBuiltInVsCodeEditorDashbuilderContributions({
    context,
    vsCodeDashbuilderLanguageService,
    configuration,
    kieEditorsStore,
  });

  await setupDashboardEditorControls({
    context,
    configuration,
    kieEditorsStore,
  });

  console.info("Extension is successfully setup.");
}
