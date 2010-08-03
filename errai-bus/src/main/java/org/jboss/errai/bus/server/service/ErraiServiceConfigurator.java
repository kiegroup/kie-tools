/*
 * Copyright 2010 JBoss, a divison Red Hat, Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.jboss.errai.bus.server.service;

import org.jboss.errai.bus.client.api.ResourceProvider;
import org.jboss.errai.bus.client.framework.RequestDispatcher;

import java.io.File;
import java.util.List;
import java.util.Map;

/**
 * The <tt>ErraiServiceConfigurator</tt> is a template for creating a configuration for a service
 */
public interface ErraiServiceConfigurator {
    public static final String ERRAI_DISPATCHER_IMPLEMENTATION = "errai.dispatcher_implementation";
    public static final String ERRAI_SESSION_PROVIDER_IMPLEMENTATION = "errai.session_provider_implementation";
    public static final String CONFIG_ERRAI_SERIALIZABLE_TYPE = "errai.bus.serializableTypes";

    /**
     * Gets a list of all configuration targets
     *
     * @return list of all configuration targets
     */
    public List<File> getConfigurationRoots();

    /**
     * Gets the resource providers associated with this configurator
     *
     * @return the resource providers associated with this configurator
     */
    public Map<String, ResourceProvider> getResourceProviders();

    /**
     * Gets the resources attached to the specified resource class
     *
     * @param resourceClass - the class to search the resources for
     * @param <T>           - the class type
     * @return the resource of type <tt>T</tt>
     */
    public <T> T getResource(Class<? extends T> resourceClass);

    /**
     * Returns true if the configuration has this <tt>key</tt> property
     *
     * @param key - the property too search for
     * @return false if the property does not exist
     */
    public boolean hasProperty(String key);

    /**
     * Gets the property associated with the key
     *
     * @param key - the key to search for
     * @return the property, if it exists, null otherwise
     */
    public String getProperty(String key);


    public RequestDispatcher getRequestDispatcher();

}



