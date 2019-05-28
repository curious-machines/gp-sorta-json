# gp-sorta-json

- [Installation](#installation)
- [Usage](#usage)
- [Command Line](#command-line)

---

A little utility to parse text that is not exactly JSON-compliant.

# Installation

```npm install gp-sorta-json```

# Importing

The following sections indicate how you can import the code for use in various environments.

## Node

```javascript
const {Parser} = require("gp-sorta-json");
```

## Browsers

```html
<script src="./node_modules/gp-sorta-json/dist/index-umd.js"></script>
<script>
  var Parser = GpSortaJson.Parser;
</script>
```

## Modern Browsers (ESM)

```javascript
import {Parser} from './node_modules/gp-sorta-json/dist/index-esm.js';
```

## Bundlers

```javascript
import {Parser} from "gp-sorta-json";
````

# Usage

```javascript
const {Parser} = require("gp-sorta-json");

const result = Parser.parse('1, 2, 3');
console.log(result);

// results in [ 1, 2, 3 ]
```

# Command Line

```bash
echo test.txt | sj
```

```bash
sj '1 2 3' -i
# results in [ 1, 2, 3 ]
```
