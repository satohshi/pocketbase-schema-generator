# pocketbase-ts-schema-generator

JS hook for PocketBase to help you with schema generation for [pocketbase-ts](https://github.com/satohshi/pocketbase-ts).

## Usage

1. Download `pb_hooks.zip` from [releases](https://github.com/satohshi/pocketbase-ts-schema-generator/releases) and extract it to the directory where you have the PocketBase executable.
2. Update `config.json` if necessary.
3. Run `pocketbase serve`, and the hooks will automatically generate/update the schema file on bootstrap, and every time you make changes to the collections.
4. If you have `exposeEndpoint` set to `true`, you can access the generated schema through the endpoint you specified in `endpointPath`. (e.g. `https://URL_TO_YOUR_PB_SERVER/schema`)

The generated schema will have field options in docstrings, so you will get additional info like `required`, `min`, and `max` when you hover over properties in your IDE.

## Configuration Options

| Key              | Description                                         |    Default    |
| ---------------- | --------------------------------------------------- | :-----------: |
| `includeDocs`    | Includes field metadata as JSDoc comments           |    `true`     |
| `generateFile`   | Generate TS schema file                             |    `true`     |
| `outputPath`     | File path where generated schema file will be saved | `./schema.ts` |
| `exposeEndpoint` | Exposes schema through HTTP endpoint                |    `false`    |
| `endpointPath`   | Path for the schema endpoint                        |   `/schema`   |
| `secureEndpoint` | Require authentication to access schema endpoint    |    `true`     |
