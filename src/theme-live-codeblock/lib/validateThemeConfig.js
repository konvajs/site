"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = exports.DEFAULT_CONFIG = void 0;
exports.validateThemeConfig = validateThemeConfig;
const utils_validation_1 = require("@docusaurus/utils-validation");
exports.DEFAULT_CONFIG = {
    playgroundPosition: 'bottom',
};
exports.Schema = utils_validation_1.Joi.object({
    liveCodeBlock: utils_validation_1.Joi.object({
        playgroundPosition: utils_validation_1.Joi.string()
            .equal('top', 'bottom')
            .default(exports.DEFAULT_CONFIG.playgroundPosition),
    })
        .label('themeConfig.liveCodeBlock')
        .default(exports.DEFAULT_CONFIG),
});
function validateThemeConfig({ validate, themeConfig, }) {
    return validate(exports.Schema, themeConfig);
}
