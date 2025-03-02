export const testTsSchema = `declare const uniqueIdentifier: unique symbol

export interface Users {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | \`text\`         |
     * | hidden              | \`false\`        |
     * | required            | \`true\`         |
     * | min                 | \`15\`           |
     * | max                 | \`15\`           |
     * | pattern             | \`^[a-z0-9]+$\`  |
     * | autogeneratePattern | \`[a-z0-9]{15}\` |
     */
    id: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | \`password\` |
     * | hidden   | \`true\`     |
     * | required | \`true\`     |
     * | min      | \`8\`        |
     */
    password: string
    /**
     * |                     |                    |
     * | ------------------- | ------------------ |
     * | type                | \`text\`             |
     * | hidden              | \`true\`             |
     * | required            | \`true\`             |
     * | min                 | \`30\`               |
     * | max                 | \`60\`               |
     * | autogeneratePattern | \`[a-zA-Z0-9_]{50}\` |
     */
    tokenKey: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | \`email\` |
     * | hidden   | \`false\` |
     * | required | \`false\` |
     */
    email: string
    /**
     * |        |         |
     * | ------ | ------- |
     * | type   | \`bool\`  |
     * | hidden | \`false\` |
     */
    emailVisibility: boolean
    /**
     * |        |         |
     * | ------ | ------- |
     * | type   | \`bool\`  |
     * | hidden | \`false\` |
     */
    verified: boolean
    /**
     * |                     |                   |
     * | ------------------- | ----------------- |
     * | type                | \`text\`            |
     * | hidden              | \`false\`           |
     * | required            | \`true\`            |
     * | min                 | \`3\`               |
     * | max                 | \`150\`             |
     * | pattern             | \`^[\w][\w\.\-]*$\` |
     * | autogeneratePattern | \`users[0-9]{6}\`   |
     */
    username: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | \`text\`  |
     * | hidden   | \`false\` |
     * | required | \`false\` |
     */
    name: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | \`autodate\` |
     * | hidden   | \`false\`    |
     * | onCreate | \`true\`     |
     * | onUpdate | \`false\`    |
     */
    created: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | \`autodate\` |
     * | hidden   | \`false\`    |
     * | onCreate | \`true\`     |
     * | onUpdate | \`true\`     |
     */
    updated: string
}

export interface Posts {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | \`text\`         |
     * | hidden              | \`false\`        |
     * | required            | \`true\`         |
     * | min                 | \`15\`           |
     * | max                 | \`15\`           |
     * | pattern             | \`^[a-z0-9]+$\`  |
     * | autogeneratePattern | \`[a-z0-9]{15}\` |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | \`text\`  |
     * | hidden   | \`false\` |
     * | required | \`true\`  |
     * | min      | \`5\`     |
     * | max      | \`100\`   |
     */
    title: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | \`editor\` |
     * | hidden      | \`false\`  |
     * | required    | \`true\`   |
     * | convertURLs | \`false\`  |
     */
    content: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | \`relation(single)\` |
     * | hidden         | \`false\`            |
     * | required       | \`true\`             |
     * | collectionId   | \`_pb_users_auth_\`  |
     * | collectionName | \`users\`            |
     * | cascadeDelete  | \`false\`            |
     */
    author: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | \`autodate\` |
     * | hidden   | \`false\`    |
     * | onCreate | \`true\`     |
     * | onUpdate | \`false\`    |
     */
    created: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | \`autodate\` |
     * | hidden   | \`false\`    |
     * | onCreate | \`true\`     |
     * | onUpdate | \`true\`     |
     */
    updated: string
}

export interface Comments {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | \`text\`         |
     * | hidden              | \`false\`        |
     * | required            | \`true\`         |
     * | min                 | \`15\`           |
     * | max                 | \`15\`           |
     * | pattern             | \`^[a-z0-9]+$\`  |
     * | autogeneratePattern | \`[a-z0-9]{15}\` |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | \`text\`  |
     * | hidden   | \`false\` |
     * | required | \`true\`  |
     * | min      | \`1\`     |
     * | max      | \`200\`   |
     */
    message: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | \`relation(single)\` |
     * | hidden         | \`false\`            |
     * | required       | \`true\`             |
     * | collectionId   | \`_pb_users_auth_\`  |
     * | collectionName | \`users\`            |
     * | cascadeDelete  | \`false\`            |
     */
    user: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | \`relation(single)\` |
     * | hidden         | \`false\`            |
     * | required       | \`true\`             |
     * | collectionId   | \`vfbcakfc12vkmm1\`  |
     * | collectionName | \`posts\`            |
     * | cascadeDelete  | \`false\`            |
     */
    post: string
    /**
     * |          |          |
     * | -------- | -------- |
     * | type     | \`number\` |
     * | hidden   | \`false\`  |
     * | required | \`true\`   |
     * | onlyInt  | \`false\`  |
     */
    likes: number
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | \`autodate\` |
     * | hidden   | \`false\`    |
     * | onCreate | \`true\`     |
     * | onUpdate | \`false\`    |
     */
    created: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | \`autodate\` |
     * | hidden   | \`false\`    |
     * | onCreate | \`true\`     |
     * | onUpdate | \`true\`     |
     */
    updated: string
}

export interface Test {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | \`text\`         |
     * | hidden              | \`false\`        |
     * | required            | \`true\`         |
     * | min                 | \`15\`           |
     * | max                 | \`15\`           |
     * | pattern             | \`^[a-z0-9]+$\`  |
     * | autogeneratePattern | \`[a-z0-9]{15}\` |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | \`text\`  |
     * | hidden   | \`false\` |
     * | required | \`false\` |
     * | min      | \`1\`     |
     * | max      | \`32\`    |
     * | pattern  | \`\w+\`   |
     */
    name: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | \`editor\` |
     * | hidden      | \`false\`  |
     * | required    | \`false\`  |
     * | convertURLs | \`false\`  |
     */
    richText: string
    /**
     * |          |          |
     * | -------- | -------- |
     * | type     | \`number\` |
     * | hidden   | \`false\`  |
     * | required | \`false\`  |
     * | onlyInt  | \`false\`  |
     * | max      | \`100\`    |
     */
    number: number
    /**
     * |        |         |
     * | ------ | ------- |
     * | type   | \`bool\`  |
     * | hidden | \`false\` |
     */
    bool: boolean
    /**
     * |        |         |
     * | ------ | ------- |
     * | type   | \`bool\`  |
     * | hidden | \`false\` |
     */
    boolRequired: true
    /**
     * |             |                            |
     * | ----------- | -------------------------- |
     * | type        | \`email\`                    |
     * | hidden      | \`false\`                    |
     * | required    | \`false\`                    |
     * | onlyDomains | \`gmail.com\`, \`outlook.com\` |
     */
    email: string
    /**
     * |             |                       |
     * | ----------- | --------------------- |
     * | type        | \`email\`               |
     * | hidden      | \`false\`               |
     * | required    | \`false\`               |
     * | onlyDomains | \`google.com\`, \`x.com\` |
     */
    url: string
    /**
     * |          |                            |
     * | -------- | -------------------------- |
     * | type     | \`date\`                     |
     * | hidden   | \`false\`                    |
     * | required | \`false\`                    |
     * | min      | \`2025-02-26 12:00:00.000Z\` |
     */
    dateTime: string
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | \`select(single)\` |
     * | hidden   | \`false\`          |
     * | required | \`false\`          |
     */
    selectSingle: '1' | '2' | '3' | '4'
    /**
     * |           |                     |
     * | --------- | ------------------- |
     * | type      | \`select (multiple)\` |
     * | hidden    | \`false\`             |
     * | required  | \`false\`             |
     * | maxSelect | \`4\`                 |
     */
    selectMultiple: ('a' | 'b' | 'c' | 'd')[]
    /**
     * |           |                     |
     * | --------- | ------------------- |
     * | type      | \`select (multiple)\` |
     * | hidden    | \`false\`             |
     * | required  | \`true\`              |
     * | maxSelect | \`4\`                 |
     */
    selectMultipleRequired: ['a' | 'b' | 'c' | 'd', ...('a' | 'b' | 'c' | 'd')[]]
    /**
     * |           |                                        |
     * | --------- | -------------------------------------- |
     * | type      | \`file(single)\`                         |
     * | hidden    | \`false\`                                |
     * | required  | \`false\`                                |
     * | protected | \`true\`                                 |
     * | maxSize   | \`5242880\`                              |
     * | mimeTypes | \`image/jpeg\`, \`image/png\`, \`image/gif\` |
     * | thumbs    | \`10x50\`                                |
     */
    fileSingle: string
    /**
     * |           |                                                                    |
     * | --------- | ------------------------------------------------------------------ |
     * | type      | \`file (multiple)\`                                                  |
     * | hidden    | \`false\`                                                            |
     * | required  | \`false\`                                                            |
     * | protected | \`false\`                                                            |
     * | maxSize   | \`5242880\`                                                          |
     * | maxSelect | \`99\`                                                               |
     * | mimeTypes | \`image/jpeg\`, \`image/webp\`, \`image/png\`, \`image/gif\`, \`image/avif\` |
     */
    fileMultiple: string[]
    /**
     * |           |                   |
     * | --------- | ----------------- |
     * | type      | \`file (multiple)\` |
     * | hidden    | \`false\`           |
     * | required  | \`true\`            |
     * | protected | \`false\`           |
     * | maxSize   | \`0\`               |
     * | maxSelect | \`99\`              |
     */
    fileMultipleRequired: [string, ...string[]]
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | \`relation(single)\` |
     * | hidden         | \`false\`            |
     * | required       | \`false\`            |
     * | collectionId   | \`_pb_users_auth_\`  |
     * | collectionName | \`users\`            |
     * | cascadeDelete  | \`false\`            |
     */
    relationSingle: string
    /**
     * |                |                       |
     * | -------------- | --------------------- |
     * | type           | \`relation (multiple)\` |
     * | hidden         | \`false\`               |
     * | required       | \`false\`               |
     * | collectionId   | \`twa00sv77u9wd8n\`     |
     * | collectionName | \`comments\`            |
     * | cascadeDelete  | \`false\`               |
     * | minSelect      | \`2\`                   |
     * | maxSelect      | \`2147483647\`          |
     */
    relationMultiple: string[]
    /**
     * |                |                       |
     * | -------------- | --------------------- |
     * | type           | \`relation (multiple)\` |
     * | hidden         | \`false\`               |
     * | required       | \`true\`                |
     * | collectionId   | \`vfbcakfc12vkmm1\`     |
     * | collectionName | \`posts\`               |
     * | cascadeDelete  | \`false\`               |
     * | maxSelect      | \`999\`                 |
     */
    relationMultipleRequired: [string, ...string[]]
    /**
     * |          |           |
     * | -------- | --------- |
     * | type     | \`json\`    |
     * | hidden   | \`false\`   |
     * | maxSize  | \`2000000\` |
     * | required | \`false\`   |
     */
    json: any
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | \`autodate\` |
     * | hidden   | \`false\`    |
     * | onCreate | \`true\`     |
     * | onUpdate | \`false\`    |
     */
    created: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | \`autodate\` |
     * | hidden   | \`false\`    |
     * | onCreate | \`true\`     |
     * | onUpdate | \`true\`     |
     */
    updated: string
}

export interface CollectionWithAVeryLongName {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | \`text\`         |
     * | hidden              | \`false\`        |
     * | required            | \`true\`         |
     * | min                 | \`15\`           |
     * | max                 | \`15\`           |
     * | pattern             | \`^[a-z0-9]+$\`  |
     * | autogeneratePattern | \`[a-z0-9]{15}\` |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | \`text\`  |
     * | hidden   | \`false\` |
     * | required | \`false\` |
     */
    field: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | \`autodate\` |
     * | hidden   | \`false\`    |
     * | onCreate | \`true\`     |
     * | onUpdate | \`false\`    |
     */
    created: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | \`autodate\` |
     * | hidden   | \`false\`    |
     * | onCreate | \`true\`     |
     * | onUpdate | \`true\`     |
     */
    updated: string
}


/**
 * Commented-out back-relations are what will be inferred by pocketbase-ts from the forward relations.
 *
 * The "UNIQUE index constraint" case is automatically handled by this hook,
 * but if you want to make a back-relation non-nullable, you can uncomment it and remove the "?".
 *
 * See [here](https://github.com/satohshi/pocketbase-ts#back-relations) for more information.
 */
export type Schema = {
    users: {
        type: Users
        relations: {
            // posts_via_author?: Posts[]
            // comments_via_user?: Comments[]
            // test_via_relationSingle?: Test[]
        }
    }
    posts: {
        type: Posts
        relations: {
            author: Users
            // comments_via_post?: Comments[]
            // test_via_relationMultipleRequired?: Test[]
        }
    }
    comments: {
        type: Comments
        relations: {
            user: Users
            post: Posts
            // test_via_relationMultiple?: Test[]
        }
    }
    test: {
        type: Test
        relations: {
            relationSingle?: Users
            relationMultiple?: Comments[]
            relationMultipleRequired: Posts[]
        }
    }
    collection_with_a_very_long_name: {
        type: CollectionWithAVeryLongName
    }
}

`

export const testZodSchema = `import { z } from 'zod'

const DATETIME_REGEX = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(\.\d+)?Z$/

export const usersSchema = z.object({
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    password: z.string().min(8),
    tokenKey: z.string().min(30).max(60).optional(),
    email: z.string().email().optional(),
    emailVisibility: z.boolean().optional(),
    verified: z.boolean().optional(),
    username: z.string().regex(/^[\w][\w\.\-]*$/).min(3).max(150).optional(),
    name: z.string().optional(),
    created: z.string().regex(DATETIME_REGEX).optional(),
    updated: z.string().regex(DATETIME_REGEX).optional(),
})

export const postsSchema = z.object({
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    title: z.string().min(5).max(100),
    content: z.string().min(1),
    author: z.string().regex(/^[a-z0-9]+$/).length(15),
    created: z.string().regex(DATETIME_REGEX).optional(),
    updated: z.string().regex(DATETIME_REGEX).optional(),
})

export const commentsSchema = z.object({
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    message: z.string().min(1).max(200),
    user: z.string().regex(/^[a-z0-9]+$/).length(15),
    post: z.string().regex(/^[a-z0-9]+$/).length(15),
    likes: z.number().refine((n) => n !== 0),
    created: z.string().regex(DATETIME_REGEX).optional(),
    updated: z.string().regex(DATETIME_REGEX).optional(),
})

export const testSchema = z.object({
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    name: z.string().regex(/\w+/).min(1).max(32).optional(),
    richText: z.string().optional(),
    number: z.number().max(100).optional(),
    bool: z.boolean().optional(),
    boolRequired: z.literal(true),
    email: z.string().email().refine((v) => ["gmail.com", "outlook.com"].includes(v.split('@')[1])).optional(),
    url: z.string().url().refine((v) => ["google.com", "x.com"].some((domain) => v.includes(domain))).optional(),
    dateTime: z.string().regex(DATETIME_REGEX).refine((v) => {
        const date = new Date(v)
        const minDate = new Date('2025-02-26 12:00:00.000Z')
        return date >= minDate
    }).optional(),
    selectSingle: z.enum(["1", "2", "3", "4"]).optional(),
    selectMultiple: z.enum(["a", "b", "c", "d"]).array().max(4).optional(),
    selectMultipleRequired: z.enum(["a", "b", "c", "d"]).array().nonempty().max(4),
    fileSingle: z.string().optional(),
    fileMultiple: z.string().array().max(99).optional(),
    fileMultipleRequired: z.string().array().nonempty().max(99),
    relationSingle: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    relationMultiple: z.string().regex(/^[a-z0-9]+$/).length(15).array().min(2).max(2147483647).optional(),
    relationMultipleRequired: z.string().regex(/^[a-z0-9]+$/).length(15).array().nonempty().max(999),
    json: z.unknown().optional(),
    created: z.string().regex(DATETIME_REGEX).optional(),
    updated: z.string().regex(DATETIME_REGEX).optional(),
})

export const collectionWithAVeryLongNameSchema = z.object({
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    field: z.string().optional(),
    created: z.string().regex(DATETIME_REGEX).optional(),
    updated: z.string().regex(DATETIME_REGEX).optional(),
})

`
