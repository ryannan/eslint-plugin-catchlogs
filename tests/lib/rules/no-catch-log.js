/**
 * @fileoverview check log for catch statements
 * @author Ryan Nan
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-catch-log"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-catch-log", rule, {

    valid: [
        {
            code: "import logger from '@ali/logger'; try { var a = 1 } catch(e) { logger.info('sss'); foo(); foo.bar(); }",
            parserOptions: { ecmaVersion: 6, sourceType: "module" }
        },
        {
          code: 'var rule = require("./lib/rules/no-catch-log")'
        },
        {
          code: 'import r1 from "aaa"; var rule = require("rule"); var logger = require("@ali/logger"); try { var a = 1 } catch (e) { logger.info("sss") }',
          parserOptions: { ecmaVersion: 6, sourceType: "module" }
        },
        {
          code: "import r1 from \"../../../lib/rules/no-catch-log\"",
          parserOptions: { ecmaVersion: 6, sourceType: "module" }
        }
    ],

    invalid: [
        {
            code: "try { var a = 1 } catch(e) { console.log(e); var b =2; }",
            errors: [{
                message: "please add log in the capture statments."
            }]
        },
        {
            code: "try { var a = 1 } catch(e) { console.log(e); var b =2; logger.info('sss'); }",
            errors: [{
                message: "please add log in the capture statments."
            }]
        },
        {
            code: "import logger from '@ali/logger'; try { var a = 1 } catch(e) { console.log(e); var b =2; }",
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [{
                message: "please add log in the capture statments."
            }]
        },
        {
            code: "var logger = require('@ali/logger'); try { var a = 1 } catch(e) { console.log(e); var b =2; }",
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [{
                message: "please add log in the capture statments."
            }]
        }
    ]
});
