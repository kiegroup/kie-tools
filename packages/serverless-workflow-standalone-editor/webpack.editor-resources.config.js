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

const { merge } = require("webpack-merge");
const common = require("@kie-tools-core/webpack-base/webpack.common.config");
const patternflyBase = require("@kie-tools-core/patternfly-base");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = (webpackEnv) => [
  merge(common(webpackEnv), {
    output: {
      publicPath: "",
    },
    entry: {
      "envelope/swf-diagram-editor-envelope": "./src/envelope/SwfDiagramEditorEnvelopeApp.ts",
      "envelope/swf-text-editor-envelope": "./src/envelope/SwfTextEditorEnvelopeApp.ts",
    },
    module: {
      rules: [...patternflyBase.webpackModuleRules],
    },
    plugins: [
      new MonacoWebpackPlugin({
        languages: ["json"],
        customLanguages: [
          {
            label: "yaml",
            entry: ["monaco-yaml", "vs/basic-languages/yaml/yaml.contribution"],
            worker: {
              id: "monaco-yaml/yamlWorker",
              entry: "monaco-yaml/yaml.worker.js",
            },
          },
        ],
      }),
      new FileManagerPlugin({
        events: {
          onEnd: {
            mkdir: ["./dist/resources/swf/js/"],
            copy: [
              { source: "./dist/*monaco-editor*.js", destination: "./dist/resources/swf/js/" },
              { source: "./dist/*worker*.js", destination: "./dist/resources/swf/js/" },
              { source: "./dist/*.bundle.js", destination: "./dist/resources/swf/js/" },
            ],
            delete: ["./dist/*monaco-editor*.js", "./dist/*worker*.js"],
          },
        },
      }),
    ],
  }),
];
