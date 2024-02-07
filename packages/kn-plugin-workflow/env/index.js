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

const { varsWithName, getOrDefault, composeEnv } = require("@kie-tools-scripts/build-env");
const packageJson = require("@kie-tools/kn-plugin-workflow/package.json");

module.exports = composeEnv([require("@kie-tools/root-env/env")], {
  vars: varsWithName({
    KN_PLUGIN_WORKFLOW__version: {
      name: "KN_PLUGIN_WORKFLOW__version",
      default: packageJson.version,
      description: "Knative SonataFlow plugin version",
    },
    KN_PLUGIN_WORKFLOW__quarkusPlatformGroupId: {
      name: "KN_PLUGIN_WORKFLOW__quarkusPlatformGroupId",
      default: "com.redhat.quarkus.platform",
      description: "Quarkus group to be used when creating the SonataFlow project",
    },
    KN_PLUGIN_WORKFLOW__quarkusVersion: {
      name: "KN_PLUGIN_WORKFLOW__quarkusVersion",
      default: "3.2.9.Final-redhat-00003",
      description: "Quarkus version to be used when creating the SonataFlow project",
    },
    KN_PLUGIN_WORKFLOW__devModeImage: {
      name: "KN_PLUGIN_WORKFLOW__devModeImage",
      default:
        "registry-proxy.engineering.redhat.com/rh-osbs/openshift-serverless-1-tech-preview-logic-swf-devmode-rhel8:1.32.0-1",
      description: "SonataFlow dev mode image (used on cli run)",
    },
    KN_PLUGIN_WORKFLOW__kogitoVersion: {
      name: "KN_PLUGIN_WORKFLOW__kogitoVersion",
      default: "9.99.0.redhat-00002",
      description: "Kogito version to be used when creating and converting to Quarkus Projects",
    },
  }),
  get env() {
    return {
      knPluginWorkflow: {
        version: getOrDefault(this.vars.KN_PLUGIN_WORKFLOW__version),
        quarkusPlatformGroupId: getOrDefault(this.vars.KN_PLUGIN_WORKFLOW__quarkusPlatformGroupId),
        quarkusVersion: getOrDefault(this.vars.KN_PLUGIN_WORKFLOW__quarkusVersion),
        devModeImage: getOrDefault(this.vars.KN_PLUGIN_WORKFLOW__devModeImage),
        kogitoVersion: getOrDefault(this.vars.KN_PLUGIN_WORKFLOW__kogitoVersion),
      },
    };
  },
});
