# pocketbase-ts-schema-generator

JS hook for PocketBase to help you with schema generation for [pocketbase-ts](https://github.com/satohshi/pocketbase-ts).

## Usage

1. Copy the `pb_hooks` directory in this repo to the directory containing the PocketBase executable file.
2. Update `config.json` if necessary.
3. Run `pocketbase serve`, and the hooks will automatically generate/update the schema file on bootstrap, and every time you make a change to the collections.

The generated schema will have field options in docstrings, so you will get additional info like `required`, `min`, and `max` when you hover over properties in your IDE.
