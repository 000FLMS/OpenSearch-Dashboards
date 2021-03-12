/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { simpleOpenSearchDashboardsPlatformPluginDiscovery } from '@osd/dev-utils';

export interface OpenSearchDashboardsPlatformPlugin {
  readonly directory: string;
  readonly manifestPath: string;
  readonly id: string;
  readonly isUiPlugin: boolean;
  readonly extraPublicDirs: string[];
}

const isArrayOfStrings = (input: any): input is string[] =>
  Array.isArray(input) && input.every((p) => typeof p === 'string');

/**
 * Helper to find the new platform plugins.
 */
export function findOpenSearchDashboardsPlatformPlugins(scanDirs: string[], paths: string[]) {
  return simpleOpenSearchDashboardsPlatformPluginDiscovery(scanDirs, paths).map(
    ({ directory, manifestPath, manifest }): OpenSearchDashboardsPlatformPlugin => {
      let extraPublicDirs: string[] | undefined;
      if (manifest.extraPublicDirs) {
        if (!isArrayOfStrings(manifest.extraPublicDirs)) {
          throw new TypeError(
            'expected new platform plugin manifest to have an array of strings `extraPublicDirs` property'
          );
        }
        extraPublicDirs = manifest.extraPublicDirs;
      }

      return {
        directory,
        manifestPath,
        id: manifest.id,
        isUiPlugin: manifest.ui,
        extraPublicDirs: extraPublicDirs || [],
      };
    }
  );
}