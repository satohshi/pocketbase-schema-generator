# pocketbase-schema-generator

PocketBase hook for automatically generating schemas for Zod and [pocketbase-ts](https://github.com/satohshi/pocketbase-ts).

![demo](https://github.com/user-attachments/assets/fa09aed1-e420-4302-9ac0-441bb754bb1c)

## Usage

1. Download `pb_hooks.zip` from [releases](https://github.com/satohshi/pocketbase-ts-schema-generator/releases) and extract it to the same directory as your PocketBase executable.
2. Update `config.json` if necessary.
3. Start up the PocketBase server, and it will automatically generate/update the schema file on bootstrap and every time you make changes to the collections.
4. If you have `exposeEndpoint` set to `true`, you can access the generated schema through the endpoint you specified in `endpointPath` (e.g. `https://URL_TO_YOUR_PB_SERVER/schema`).

The generated schema will have field options in docstrings, so you will get additional information like `required`, `min`, and `max` when you hover over properties in your IDE.

## Configuration Options and Defaults

```jsonc
{
    // If set to true, the schema will be exposed through an HTTP endpoint
    "exposeEndpoint": false,
    // Path for the schema endpoint
    "endpointPath": "/schema",
    // If set to true, the schema endpoint will require authentication
    "secureEndpoint": true,

    "tsSchema": {
        // If set to true, schema file for pocketbase-ts will be generated
        "generateFile": true,
        // If set to true, field metadata will be included as JSDoc comments
        "includeDocs": true,
        // If set to true, system collections like _superusers and _otps in the schema will be included
        "includeSystemCollections": false,
        // File path where the generated schema will be saved
        "outputPath": "./tsSchema.ts",
    },

    "zodSchema": {
        // If set to true, Zod schema file will be generated
        "generateFile": true,
        // If set to true, system collections like _superusers and _otps in the schema will be included
        "includeSystemCollections": false,
        // File path where the Zod schema will be saved
        "outputPath": "./zodSchema.ts",
    },
}
```

## JSON Field types

### TS Interfaces

JSON fields are typed as `any` by default.  
You can override this by specifying the type in the `overrides` object in your configuration file.

For example, if you have a collection called `users` with a JSON field called `profile`, you can specify the type like this:

```jsonc
// config.json

{
    // ...
    "tsSchema": {
        "overrides": {
            "users": {
                "profile": "{ name: string; age: number }",
            },
        },
    },
    // ...
}
```

Or for more complex types, you can define them in a separate file and import them like this:

```ts
// types.ts

export interface UserProfile {
    name: string
    age: number
}
```

```jsonc
// config.json

{
    // ...
    "tsSchema": {
        // ...
        "overrides": {
            "users": {
                "profile": "import('./types.ts').UserProfile",
            },
        },
    },
    // ...
}
```

This applies to view collection fields as well.  
If you have a view collection and some fields are typed as `any`, it is because PocketBase treats them as JSON fields.  
You can override them the same way as above.

### Zod Schemas

JSON fields are `z.unknown()` by default.
You can override this just like above.

```jsonc
// config.json
{
    // ...
    "zodSchema": {
        // ...
        "overrides": {
            "users": {
                "profile": "z.object({ name: z.string(), age: z.number() })",
            },
        },
    },
}
```

If you want to define zod schemas in a separate file and import them, you can do it like this:

```ts
// zodSchema.ts

export const userProfileSchema = z.object({
    name: z.string(),
    age: z.number(),
})
```

```jsonc
// config.json

{
    // ...
    "zodSchema": {
        // ...
        "overrides": {
            // specify import statements that need to be added to the top of the generated file
            "importStatements": ["import { userProfileSchema } from './zodSchema.ts'"],
            "users": {
                "profile": "userProfileSchema",
            },
        },
    },
}
```
