# pocketbase-ts-schema-generator

JS hook for PocketBase to help you with schema generation for [pocketbase-ts](https://github.com/satohshi/pocketbase-ts).

## Usage

1. Copy the `.js` files in `dist` to the `pb_hooks` directory next to the PocketBase executable file.
2. Update the `PATH_TO_SCHEMA_FILE` value in `generate-schema.js` to the path to your schema file.
3. Run `pocketbase serve`, and the hooks will automatically generate/update the schema file on bootstrap, and every time you make a change to the collections.

The generated schema will have field options in docstrings, so you will get additional info like `required`, `min`, and `max` when you hover over properties in your IDE.
