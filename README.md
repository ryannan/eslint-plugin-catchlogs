# eslint-plugin-catchlogs

check logs for catch statements

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-catchlogs`:

```
$ npm install eslint-plugin-catchlogs --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-catchlogs` globally.

## Usage

Add `catchlogs` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "catchlogs"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "catchlogs/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





