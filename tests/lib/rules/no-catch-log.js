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
          code: 'import * as r1 from "aaa"; var rule = require("rule"); var logger = require("@ali/logger"); try { var a = 1 } catch (e) { logger.info("sss") }',
          parserOptions: { ecmaVersion: 6, sourceType: "module" }
        },
        {
          code: "import './page.less'",
          parserOptions: { ecmaVersion: 6, sourceType: "module" }
        },
        {
          code: "import { r2, r4 } from \"../../../lib/rules/no-catch-log\"; import r3 from 'aa'; import './page.less'",
          parserOptions: { ecmaVersion: 6, sourceType: "module" }
        },
        {
          code: "var logger = require('@ali/logger')('service'); try { var a = 1 } catch(e) { logger.info('sss')}",
          parserOptions: { ecmaVersion: 6, sourceType: "module" }
        },
        {
          code: "var logger = require('@ali/logger')('service'); try { var a = 1 } catch(e) { logger.info('sss' + e); data = { err: e.message }}; a = 2",
          parserOptions: { ecmaVersion: 6, sourceType: "module" }
        },
        {
          code: "require();"
        },
        {
          code: "try {} finally {}"
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
