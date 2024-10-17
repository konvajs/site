"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateThemeConfig = void 0;
exports.default = themeLiveCodeblock;
const theme_translations_1 = require("@docusaurus/theme-translations");
function themeLiveCodeblock(context) {
    const { i18n: { currentLocale }, } = context;
    return {
        name: 'docusaurus-theme-live-codeblock',
        getThemePath() {
            return '../lib/theme';
        },
        getTypeScriptThemePath() {
            return '../src/theme';
        },
        getDefaultCodeTranslationMessages() {
            return (0, theme_translations_1.readDefaultCodeTranslationMessages)({
                locale: currentLocale,
                name: 'theme-live-codeblock',
            });
        },
        configureWebpack() {
            return {
                resolve: {
                    alias: {
                        buble: require.resolve('./custom-buble.js'),
                    },
                },
            };
        },
    };
}
var validateThemeConfig_1 = require("./validateThemeConfig");
Object.defineProperty(exports, "validateThemeConfig", { enumerable: true, get: function () { return validateThemeConfig_1.validateThemeConfig; } });
