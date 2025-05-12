import { ENV_CONFIG } from "../env";

//------------------------------------------------//
// * Put every features that want to be flagged * //
// * Make sure to write it on UPPERCASE         * //
// * Set to `true` if want to showed in the env * //
// * Remove it completely if unused             * //
//------------------------------------------------//

const FEATURE_FLAG_VALUE = {
  LOCAL: {},
  STAGING: {},
  PRODUCTION: {},
} as const;

/**
 * @description Always add a comment besides the variable for easier find in IDE/code editor.
 * @example
 * const IS_SHOW_FEATURE = FEATURE_FLAG_SERVER['FEATURE'] // * code:[SERVER]:FEATURE
 */
export const FEATURE_FLAG_SERVER = FEATURE_FLAG_VALUE[ENV_CONFIG.appEnv];
/**
 * @description Always add a comment besides the variable for easier find in IDE/code editor.
 * @example
 * const IS_SHOW_FEATURE = FEATURE_FLAG_CLIENT['FEATURE'] // * code:[CLIENT]:FEATURE
 */
export const FEATURE_FLAG_CLIENT = FEATURE_FLAG_VALUE[ENV_CONFIG.publicAppEnv];
