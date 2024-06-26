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

package org.kie.lienzo.client.util;

import java.util.function.BiConsumer;
import java.util.function.Consumer;

import elemental2.core.JsArray;
import elemental2.dom.DomGlobal;
import elemental2.dom.HTMLDivElement;
import elemental2.dom.HTMLElement;
import org.kie.lienzo.client.BaseExample;

import static elemental2.dom.DomGlobal.requestAnimationFrame;

public class FPSCounter {

    private final JsArray<Double> times;
    private final Consumer<Integer> fps;
    private final Runnable onDestroy;
    private boolean enabled;

    private static final BiConsumer<HTMLDivElement, Integer> TEXT_DISPLAYER =
            (text, fps) -> text.textContent = "FPS [ " + fps + " ]";

    public static FPSCounter toElement(Consumer<HTMLElement> textElement) {
        HTMLDivElement text = BaseExample.createText("");
        text.style.color = "red";
        textElement.accept(text);
        return new FPSCounter(fps -> TEXT_DISPLAYER.accept(text, fps),
                              text::remove);
    }

    public static FPSCounter toConsole(Console console) {
        return new FPSCounter(fps -> console.log("FPS = " + fps));
    }

    public FPSCounter(Consumer<Integer> fps) {
        this(fps, () -> {
        });
    }

    public FPSCounter(Consumer<Integer> fps,
                      Runnable onDestroy) {
        this.times = new JsArray<>();
        this.fps = fps;
        this.enabled = false;
        this.onDestroy = onDestroy;
    }

    public FPSCounter start() {
        this.enabled = true;
        monitorFpsRate();
        return this;
    }

    public FPSCounter stop() {
        this.enabled = false;
        return this;
    }

    public void destroy() {
        stop();
        onDestroy.run();
    }

    private void monitorFpsRate() {
        requestAnimationFrame(v -> {
            double now = DomGlobal.performance.now();
            while (times.length > 0 && times.getAt(0) <= (now - 1000)) {
                times.shift();
            }
            times.push(now);
            int fps_value = times.length;
            fps.accept(fps_value);
            if (enabled) {
                monitorFpsRate();
            }
        });
    }
}