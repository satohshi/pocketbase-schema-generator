# pocketbase-ts-schema-generator

JS hook for PocketBase to help you with schema generation for [pocketbase-ts](https://github.com/satohshi/pocketbase-ts).

## Usage

1. Download `pb_hooks.zip` from [releases](https://github.com/satohshi/pocketbase-ts-schema-generator/releases) and extract it to the directory where you have the PocketBase executable.
2. Update `config.json` if necessary.
3. Run `pocketbase serve`, and the hooks will automatically generate/update the schema file on bootstrap, and every time you make changes to the collections.

The generated schema will have field options in docstrings, so you will get additional info like `required`, `min`, and `max` when you hover over properties in your IDE.

## Configuration Options

| Key           | Description                                     |    Default    |
| ------------- | ----------------------------------------------- | :-----------: |
| `outputPath`  | Where to save the generated schema file.        | `./schema.ts` |
| `includeDocs` | Whether to include field options in docstrings. |    `true`     |
