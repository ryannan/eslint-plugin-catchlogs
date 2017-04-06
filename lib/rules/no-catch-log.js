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
            description: "check logs for catch statements",
            category: "Best Practices",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        const IMPORT_LOGGER_PATH = '@ali/logger';
        let currLoggerVariable;

        return {
            ImportDeclaration(node) {
                // import 'a.less' return
                if (context.getDeclaredVariables(node).length === 0) return;

                const currImportVariableValue = node.source.value;
                const currImportVariableName = context.getDeclaredVariables(node)[0].name;

                if (currImportVariableValue === IMPORT_LOGGER_PATH) {
                    currLoggerVariable = currImportVariableName;
                }
            },
            CallExpression(node) {
                if (node.callee.callee) return;

                const calleeObject = node.callee;
                const literalObject = node.arguments[0];

                if (calleeObject.name === 'require' && literalObject.value === IMPORT_LOGGER_PATH) {
                    currLoggerVariable = node.parent.type === 'CallExpression'
                        ? node.parent.parent.id.name : node.parent.id.name;
                }
            },
            TryStatement(node) {
                let isHasLogger = false;
                const sourceCode = context.getSourceCode();
                const catchNode = node.handler.body.body;

                if (typeof currLoggerVariable !== 'undefined') {
                    catchNode.forEach(item => {
                        if (item.type === 'ExpressionStatement' && item.expression && item.expression.type === 'CallExpression') {
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
                        message: "please add log in the capture statments."
                    });
                }
            }
        };
    }
};
