/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package profiles

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/apache/incubator-kie-tools/packages/sonataflow-operator/test"
)

func Test_workflowIsDevProfile(t *testing.T) {
	workflowWithDevProfile := test.GetBaseSonataFlowWithDevProfile(t.Name())
	assert.True(t, IsDevProfile(workflowWithDevProfile))

	workflowWithNoProfile := test.GetBaseSonataFlow(t.Name())
	assert.False(t, IsDevProfile(workflowWithNoProfile))

	workflowWithProdProfile := test.GetBaseSonataFlowWithProdProfile(t.Name())
	assert.False(t, IsDevProfile(workflowWithProdProfile))
}

func Test_workflowGitOpsProfile(t *testing.T) {
	workflowWithDevProfile := test.GetBaseSonataFlowWithDevProfile(t.Name())
	assert.False(t, IsGitOpsProfile(workflowWithDevProfile))

	workflowWithNoProfile := test.GetBaseSonataFlow(t.Name())
	assert.False(t, IsGitOpsProfile(workflowWithNoProfile))

	workflowWithProdProfile := test.GetBaseSonataFlowWithProdProfile(t.Name())
	assert.False(t, IsGitOpsProfile(workflowWithProdProfile))

	workflowWithGitopsProfile := test.GetBaseSonataFlowWithGitopsProfile(t.Name())
	assert.True(t, IsGitOpsProfile(workflowWithGitopsProfile))
}
