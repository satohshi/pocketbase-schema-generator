# pocketbase-ts-schema-generator

JS hooks for PocketBase to help you with schema generation for [pocketbase-ts](https://github.com/satohshi/pocketbase-ts).

## Usage

1. Copy the `.js` files in `dist` to the `pb_hooks` directory next to the PocketBase executable file.
2. Update the `PATH_TO_SCHEMA_FILE` value in `generate-schema.js` to the relative path to the schema file from the PocketBase executable.
3. Run `pocketbase serve`, and the hooks will automatically generate/update the schema file on bootstrap, and every time you make a change to the models.

> [!NOTE]
> It adds unique identifiers to every interface to mitigate this [potential risk](https://github.com/satohshi/pocketbase-ts?tab=readme-ov-file#dealing-with-tables-with-exactly-the-same-properties).  
> You can safely remove them if each collection in your database has a unique set of properties.
