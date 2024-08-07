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

import { expect, test } from "../__fixtures__/base";

test.describe("Boxed expression header", () => {
  test.beforeEach(async ({ bee, browserName }) => {
    test.skip(
      browserName === "webkit",
      "Playwright Webkit doesn't support clipboard permissions: https://github.com/microsoft/playwright/issues/13037"
    );

    await bee.goto();
    await bee.selectExpressionMenu.selectLiteral();
  });

  test("should reset expression", async ({ page }) => {
    await page.getByTestId("kie-tools--bee--expression-header-dropdown").click();
    await page.getByRole("menuitem", { name: "Reset" }).click();
    await expect(page.getByText("Select expression")).toBeAttached();
  });

  test("should copy, reset and paste expression", async ({ bee, page, clipboard }) => {
    await page.getByTestId("kie-tools--bee--expression-header-dropdown").click();
    clipboard.use();
    await page.getByRole("menuitem", { name: "copy" }).click();
    await page.getByTestId("kie-tools--bee--expression-header-dropdown").click();
    await page.getByRole("menuitem", { name: "Reset" }).click();
    await bee.pasteToSelectExpression();
  });

  test("should cut and paste expression", async ({ bee, page, clipboard }) => {
    await page.getByTestId("kie-tools--bee--expression-header-dropdown").click();
    clipboard.use();
    await page.getByRole("menuitem", { name: "cut" }).click();
    await bee.pasteToSelectExpression();
  });
});
