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

const { env } = require("./env");
const {
  setupMavenConfigFile,
  buildTailFromPackageJsonDependencies,
  DEFAULT_LOCAL_REPO,
} = require("@kie-tools/maven-base");

setupMavenConfigFile(
  `
    --batch-mode
    -Dstyle.color=always
    -Drevision=${env.swfDiagramEditor.version}
    -Dmaven.repo.local.tail=${buildTailFromPackageJsonDependencies()},${DEFAULT_LOCAL_REPO} 
    -Drevision=${env.swfDiagramEditor.version}
    -Duberfire.version=${env.swfDiagramEditor.UBERFIRE__version}
    -Dfont_awesome.version=${env.swfDiagramEditor.FONT_AWESOME__version}
    -Dgwtbootstrap3.version=${env.swfDiagramEditor.GWTBOOTSTRAP3__version}
    -Dbootstrap.version=${env.swfDiagramEditor.BOOTSTRAP__version}
    -Danimate_css.version=${env.swfDiagramEditor.ANIMATE_CSS__version}
    `, // For some reason, j2cl-maven-plugin needs the DEFAULT_LOCAL_REPO here as the last tail too.
  { ignoreDefault: true } // Default <repositories> configuration doesn't work for this module. Since this module is not going to last long, we rely on this workaround for a while.
);
