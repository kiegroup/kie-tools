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


package org.kie.workbench.common.stunner.client.widgets.components.glyph;

import java.util.function.Supplier;

import jakarta.annotation.PreDestroy;
import jakarta.enterprise.context.Dependent;
import jakarta.enterprise.inject.Any;
import jakarta.inject.Inject;
import org.kie.j2cl.tools.di.core.IsElement;
import org.kie.j2cl.tools.di.core.ManagedInstance;
import org.kie.workbench.common.stunner.core.client.components.glyph.DOMGlyphRenderer;
import org.kie.workbench.common.stunner.core.client.components.views.ImageElementRendererView;
import org.kie.workbench.common.stunner.core.client.shape.SvgDataUriGlyph;
import org.kie.workbench.common.stunner.core.client.util.SvgDataUriGenerator;
import org.uberfire.mvp.Command;

/**
 * Extracts the SVG content from the data-uri and appends the content into the DOM.
 * It renders as an SVG DOM element.
 */
@Dependent
public class SvgElementGlyphRenderer implements DOMGlyphRenderer<SvgDataUriGlyph> {

    private final SvgDataUriGenerator svgDataUriUtil;
    private final Supplier<ImageElementRendererView> viewInstanceSupplier;
    private final Command viewInstancesDestroyer;

    protected SvgElementGlyphRenderer() {
        this.svgDataUriUtil = null;
        this.viewInstanceSupplier = null;
        this.viewInstancesDestroyer = null;
    }

    @Inject
    public SvgElementGlyphRenderer(final SvgDataUriGenerator svgDataUriUtil,
                                   final @Any ManagedInstance<ImageElementRendererView> viewInstances) {
        this.svgDataUriUtil = svgDataUriUtil;
        this.viewInstanceSupplier = viewInstances::get;
        this.viewInstancesDestroyer = viewInstances::destroyAll;
    }

    SvgElementGlyphRenderer(final SvgDataUriGenerator svgDataUriUtil,
                            final Supplier<ImageElementRendererView> viewInstanceSupplier,
                            final Command viewInstancesDestroyer) {
        this.svgDataUriUtil = svgDataUriUtil;
        this.viewInstanceSupplier = viewInstanceSupplier;
        this.viewInstancesDestroyer = viewInstancesDestroyer;
    }

    @Override
    public Class<SvgDataUriGlyph> getGlyphType() {
        return SvgDataUriGlyph.class;
    }

    @Override
    public IsElement render(final SvgDataUriGlyph glyph,
                            final double width,
                            final double height) {
        final String content = svgDataUriUtil
                .generate(glyph.getSvg(),
                          glyph.getDefs(),
                          glyph.getValidUseRefIds());
        final ImageElementRendererView view = viewInstanceSupplier.get();
        return view.setDOMContent(content,
                                  (int) width,
                                  (int) height);
    }

    @PreDestroy
    public void destroy() {
        viewInstancesDestroyer.execute();
    }
}
