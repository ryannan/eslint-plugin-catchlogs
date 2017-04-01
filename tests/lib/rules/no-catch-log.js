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
            code: "try { var a = 1 } catch(e) { console.log(e); var b =2; logger.info('sss'); }",
            errors: [{
                message: "Expected to return a value in function.",
                type: "Me too"
            }]
        }
    ],

    invalid: [
        {
            code: "try { var a = 1 } catch(e) { console.log(e); var b =2; }",
            errors: [{
                message: "Expected to return a value in function.",
                type: "Me too"
            }]
        }
    ]
});
