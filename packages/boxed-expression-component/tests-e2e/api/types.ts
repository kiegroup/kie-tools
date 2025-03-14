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

import {
  DMN15__tConditional,
  DMN15__tContext,
  DMN15__tDecisionTable,
  DMN15__tFilter,
  DMN15__tFor,
  DMN15__tFunctionDefinition,
  DMN15__tInvocation,
  DMN15__tList,
  DMN15__tLiteralExpression,
  DMN15__tQuantified,
  DMN15__tRelation,
} from "@kie-tools/dmn-marshaller/dist/schemas/dmn-1_5/ts-gen/types";

export type BoxedLiteral = { __$$element: "literalExpression" } & DMN15__tLiteralExpression;
export type BoxedRelation = { __$$element: "relation" } & DMN15__tRelation;
export type BoxedContext = { __$$element: "context" } & DMN15__tContext;
export type BoxedDecisionTable = { __$$element: "decisionTable" } & DMN15__tDecisionTable;
export type BoxedList = { __$$element: "list" } & DMN15__tList;
export type BoxedInvocation = { __$$element: "invocation" } & DMN15__tInvocation;
export type BoxedFunction = { __$$element: "functionDefinition" } & DMN15__tFunctionDefinition;
export type BoxedFor = { __$$element: "for" } & DMN15__tFor;
export type BoxedEvery = { __$$element: "every" } & DMN15__tQuantified;
export type BoxedSome = { __$$element: "some" } & DMN15__tQuantified;
export type BoxedConditional = { __$$element: "conditional" } & DMN15__tConditional;
export type BoxedFilter = { __$$element: "filter" } & DMN15__tFilter;

export type Normalized<T> = WithRequiredDeep<T, "@_id">;

type WithRequiredDeep<T, K extends keyof any> = T extends undefined
  ? T
  : T extends Array<infer U>
    ? Array<WithRequiredDeep<U, K>>
    : { [P in keyof T]: WithRequiredDeep<T[P], K> } & (K extends keyof T
        ? { [P in K]-?: NonNullable<WithRequiredDeep<T[P], K>> }
        : T);
