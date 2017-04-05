/**
 * @fileoverview check log for catch statements
 * @author Ryan Nan
 */
"use strict";

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

        const IMPORT_LOGGER_PATH = '@ali/logger';
        let currLoggerVariable;

        return {
            ImportDeclaration(node) {
                const currImportVariableValue = node.source.value;
                const currImportVariableName = context.getDeclaredVariables(node)[0].name;

                if (currImportVariableValue === IMPORT_LOGGER_PATH) {
                    currLoggerVariable = currImportVariableName;
                }
            },
            TryStatement(node) {
                let isHasLogger = false;
                const sourceCode = context.getSourceCode();
                const catchNode = node.handler.body.body;

                if (typeof currLoggerVariable !== 'undefined') {
                    catchNode.forEach(item => {
                      if (item.type === 'ExpressionStatement') {
                          const expressionCalleeObject = item.expression.callee;

                          if (expressionCalleeObject.object && expressionCalleeObject.object.name === currLoggerVariable) {
                              isHasLogger = true;
                          }
                      }
                    });
                }

                if (!isHasLogger) {
                    context.report({
                      node: node,
                      message: "please add log in the capture statments!"
                    });
                }
            }
        };
    }
};
