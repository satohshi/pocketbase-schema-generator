# pocketbase-schema-generator

PocketBase hook for automatically generating schemas for Zod and [pocketbase-ts](https://github.com/satohshi/pocketbase-ts).

![demo](https://github.com/user-attachments/assets/fa09aed1-e420-4302-9ac0-441bb754bb1c)

## Usage

1. Download `pb_hooks.zip` from [releases](https://github.com/satohshi/pocketbase-ts-schema-generator/releases) and extract it to the same directory as your PocketBase executable.
2. Update `config.json` if necessary.
3. Start up the PocketBase server, and it will automatically generate/update the schema file on bootstrap and every time you make changes to the collections.
4. If you have `exposeEndpoint` set to `true`, you can access the generated schema through the endpoint you specified in `endpointPath` (e.g. `https://URL_TO_YOUR_PB_SERVER/schema`).

The generated schema will have field options in docstrings, so you will get additional information like `required`, `min`, and `max` when you hover over properties in your IDE.

## Configuration

The `config.json` file should follow the structure below.

```ts
interface Config {
    /** Whether to register the HTTP endpoint that serves the generated schemas. */
    exposeEndpoint: boolean

    /** Path at which the schema endpoint will be exposed (e.g. \"/schema\"). */
    endpointPath: string

    /** Whether the schema endpoint should require authentication. */
    secureEndpoint: boolean

    /** Options controlling generation of the TypeScript schema file. */
    tsSchema: BaseSchemaConfig & {
        /** Whether to include JSDoc comments with field metadata in the generated schema. */
        includeDocs: boolean
    }

    /** Options controlling generation of the Zod schema file. */
    zodSchema: BaseSchemaConfig
}

interface BaseSchemaConfig {
    /** Whether to generate and write the schema file to disk. */
    generateFile: boolean

    /** Whether to include system collections like _superusers and _otps when generating the schema. */
    includeSystemCollections: boolean

    /** File path where the generated schema will be written. Also used for the default filename when downloading from web UI. */
    outputPath: string

    /** Array of strings to insert at the top of the generated schema file. Use this to import custom schema for overrides. */
    banner?: string[]

    /** Specify the shape of JSON fields here. */
    overrides?: {
        /** Names of collections with JSON fields. */
        [collectionName: string]: {
            /** Name of the JSON field as key, and the shape of JSON as value. */
            [fieldName: string]: string
        }
    }
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
        // ...
        "overrides": {
            "users": {
                "profile": "{ name: string; age: number }",
            },
        },
    },
    // ...
}
```

Or for more complex types, you can define them in a separate file and reference them:

```ts
// jsonSchema.ts

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
                "profile": "import('./jsonSchema.ts').UserProfile",
            },
        },
    },
    // ...
}
```

or

```jsonc
// config.json

{
    // ...
    "tsSchema": {
        // ...
        // specify import statements that need to be added to the top of the generated file
        "banner": ["import type { UserProfile } from './jsonSchema.ts'"],
        "overrides": {
            "users": {
                "profile": "UserProfile",
            },
        },
    },
}
```

This also applies to view collection fields.  
If you have a view collection and some fields are typed as `any`, it is because PocketBase treats them as JSON fields.  
You can override them the same way as above.

### Zod Schemas

JSON fields are `z.unknown()` by default.  
You can override this just like above.

#### Inline:

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

#### Reference a schema from another file:

```ts
// jsonSchema.ts

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
        "banner": ["import { userProfileSchema } from './jsonSchema.ts'"],
        "overrides": {
            "users": {
                "profile": "userProfileSchema",
            },
        },
    },
}
```
