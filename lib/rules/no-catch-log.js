/**
 * @fileoverview check log for catch statements
 * @author Ryan Nan
 */
"use strict";

const CATCH_STATEMENT = 'logger';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "check logs for cuntao application",
            category: "Best Practices",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            TryStatement(node) {
                var sourceCode = context.getSourceCode();
                var catchNode = node.handler.body;

                var isHasLogger = sourceCode.getText(catchNode).match(CATCH_STATEMENT);

                if (!isHasLogger) {
                    context.report({
                      node: catchNode,
                      message: "please add log in the capture statments!"
                    });
                }
            }
        };
    }
};
