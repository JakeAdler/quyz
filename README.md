# Petzl

A minimal asynchronous testing harness

**Why?**

While writing [Algotia](https://github.com/Algotia), I became dissatisfied with how frameworks like Jest and Mocha kept getting in my way.

**What does it do differently then those other libraries?**

-   Does not run tests by file name, (in fact, there is no test runner at all!)
-   Does not provide hooks like `before` and `after`
-   Does not provide an assertion library
-   Tests and groups can be defined synchronously or asynchronously.

**...so what _does_ it do?**

Not a whole lot, but thats the point!

-   Wraps tests in a very thin layer that keeps track of 3 things:
    -   Whether the async callback resolves or rejects
    -   How long the test runs
    -   Any console logs that were fired during the test.
-   Wraps groups in an even thinner layer that simply
    -   Prints the name of the group
    -   Pads any console logs for visual separation
-   Provides a lightweight reporter

**Well thats not very fun...**

It's not supposed to be!
I needed a minimal, extensible solution that got the f out of my way.

**Ok... how does it work?**

### Usage

To install petzl, run:

```sh
npm install petzel
```

If you want to use `npm test | npm t`, in your `package.json`:

```json
{
	"name": "my-package",
	"scripts": {
		"test": "npx node test/main.js"
	},
	"devDependencies": {
		"ava": "^1.0.0"
	}
}
```

For TypeScript, replace `node` with `ts-node`:

```json
{
	"name": "my-package",
	"scripts": {
		"test": "npx node test/main.js"
	},
	"devDependencies": {
		"ava": "^1.0.0"
	}
}
```

### Basic example

```js
import { test, report } from "petzl";
import assert from "assert";

export default async () => {
	await test("1 + 1 = 2", () => {
		assert(1 + 1 === 2);
	});
};
```

### Macro pattern

```js
import { test, report } from "petzel";
import assert from "assert";

const employees = ["Michael", "Dwight", "Jim"];

export default async () => {
	describe("Employees", () => {
		for (const employee of employees) {
			const titleFunc = (shouldBeEmployee) => shouldBeEmployee + " test";
			it(
				(employeeName) => `Employee should be string: ${employeeName}`,
				(person) => {
					assert(typeof person === "string");
				},
				employee
			);
		}
	});
};
```