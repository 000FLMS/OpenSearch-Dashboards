/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

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

import { asPrettyString } from './as_pretty_string';

describe('asPrettyString', () => {
  test('Converts null and undefined values into a string signifying no value', () => {
    expect(asPrettyString(null)).toBe(' - ');
    expect(asPrettyString(undefined)).toBe(' - ');
  });

  test('Does not mutate string values', () => {
    const s = 'I am a string!@';
    expect(asPrettyString(s)).toBe(s);
  });

  test('Converts objects values into presentable strings', () => {
    const longPositive = BigInt(Number.MAX_SAFE_INTEGER) * 2n;
    const longNegative = BigInt(Number.MIN_SAFE_INTEGER) * 2n;
    expect(asPrettyString({ key: 'value', longPositive, longNegative })).toBe(
      `{\n  "key": "value",\n  "longPositive": ${longPositive.toString()},\n  "longNegative": ${longNegative.toString()}\n}`
    );
  });

  test('Converts other non-string values into strings', () => {
    expect(asPrettyString(true)).toBe('true');
    expect(asPrettyString(123)).toBe('123');
  });
});
