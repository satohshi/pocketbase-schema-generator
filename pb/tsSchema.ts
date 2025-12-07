declare const uniqueIdentifier: unique symbol

export interface Users {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: '_pb_users_auth_'
    /**
     * |               |         |
     * | ------------- | ------- |
     * | type          | `text`  |
     * | min           | `1`     |
     * | min           | `255`   |
     * | current value | `users` |
     */
    collectionName: 'users' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `password` |
     * | hidden   | `true`     |
     * | required | `true`     |
     * | min      | `8`        |
     * | max      | `71`       |
     */
    password: string
    /**
     * |                     |                   |
     * | ------------------- | ----------------- |
     * | type                | `text`            |
     * | hidden              | `true`            |
     * | required            | `true`            |
     * | min                 | `30`              |
     * | max                 | `60`              |
     * | autogeneratePattern | `[a-zA-Z0-9]{50}` |
     */
    tokenKey: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `email` |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    email: string
    /**
     * |        |         |
     * | ------ | ------- |
     * | type   | `bool`  |
     * | hidden | `false` |
     */
    emailVisibility: boolean
    /**
     * |        |         |
     * | ------ | ------- |
     * | type   | `bool`  |
     * | hidden | `false` |
     */
    verified: boolean
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     * | max      | `255`   |
     */
    name: string
    /**
     * |           |                                                                       |
     * | --------- | --------------------------------------------------------------------- |
     * | type      | `file(single)`                                                        |
     * | hidden    | `false`                                                               |
     * | required  | `false`                                                               |
     * | protected | `false`                                                               |
     * | maxSize   | `0`                                                                   |
     * | mimeTypes | `image/jpeg`, `image/png`, `image/svg+xml`, `image/gif`, `image/webp` |
     */
    avatar: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `autodate` |
     * | hidden   | `false`    |
     * | onCreate | `true`     |
     * | onUpdate | `false`    |
     */
    created: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `autodate` |
     * | hidden   | `false`    |
     * | onCreate | `true`     |
     * | onUpdate | `true`     |
     */
    updated: string
}

export interface Text {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_4285667772'
    /**
     * |               |        |
     * | ------------- | ------ |
     * | type          | `text` |
     * | min           | `1`    |
     * | min           | `255`  |
     * | current value | `text` |
     */
    collectionName: 'text' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     * | max      | `5000`  |
     */
    textBase: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `true`  |
     * | required | `false` |
     * | max      | `5000`  |
     */
    textHidden: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `true`  |
     * | max      | `5000`  |
     */
    textNonempty: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     * | min      | `5`     |
     * | max      | `5000`  |
     */
    textMin5: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     * | max      | `10`    |
     */
    textMax10: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     * | min      | `5`     |
     * | max      | `10`    |
     */
    textMin5Max10: string
    /**
     * |          |               |
     * | -------- | ------------- |
     * | type     | `text`        |
     * | hidden   | `false`       |
     * | required | `false`       |
     * | max      | `5000`        |
     * | pattern  | `^[a-z0-9]+$` |
     */
    textPattern: string
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `false`        |
     * | max                 | `5000`         |
     * | autogeneratePattern | `[a-z0-9]{30}` |
     */
    textAutoGen: string
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `true`         |
     * | required            | `true`         |
     * | min                 | `5`            |
     * | max                 | `10`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{10}` |
     */
    textAll: string
}

export interface Number {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_2709742106'
    /**
     * |               |          |
     * | ------------- | -------- |
     * | type          | `text`   |
     * | min           | `1`      |
     * | min           | `255`    |
     * | current value | `number` |
     */
    collectionName: 'number' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |          |          |
     * | -------- | -------- |
     * | type     | `number` |
     * | hidden   | `false`  |
     * | required | `false`  |
     * | onlyInt  | `false`  |
     */
    numberBase: number
    /**
     * |          |          |
     * | -------- | -------- |
     * | type     | `number` |
     * | hidden   | `false`  |
     * | required | `false`  |
     * | onlyInt  | `false`  |
     * | min      | `5`      |
     */
    numberMin5: number
    /**
     * |          |          |
     * | -------- | -------- |
     * | type     | `number` |
     * | hidden   | `false`  |
     * | required | `false`  |
     * | onlyInt  | `false`  |
     * | max      | `10`     |
     */
    numberMax10: number
    /**
     * |          |          |
     * | -------- | -------- |
     * | type     | `number` |
     * | hidden   | `false`  |
     * | required | `true`   |
     * | onlyInt  | `false`  |
     */
    numberNonzero: number
    /**
     * |          |          |
     * | -------- | -------- |
     * | type     | `number` |
     * | hidden   | `true`   |
     * | required | `false`  |
     * | onlyInt  | `false`  |
     */
    numberHidden: number
    /**
     * |          |          |
     * | -------- | -------- |
     * | type     | `number` |
     * | hidden   | `false`  |
     * | required | `false`  |
     * | onlyInt  | `true`   |
     */
    numberNoDecimals: number
    /**
     * |          |          |
     * | -------- | -------- |
     * | type     | `number` |
     * | hidden   | `true`   |
     * | required | `true`   |
     * | onlyInt  | `true`   |
     * | min      | `5`      |
     * | max      | `10`     |
     */
    numberAll: number
}

export interface Bool {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_1921798434'
    /**
     * |               |        |
     * | ------------- | ------ |
     * | type          | `text` |
     * | min           | `1`    |
     * | min           | `255`  |
     * | current value | `bool` |
     */
    collectionName: 'bool' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |        |         |
     * | ------ | ------- |
     * | type   | `bool`  |
     * | hidden | `false` |
     */
    boolBase: boolean
    /**
     * |        |         |
     * | ------ | ------- |
     * | type   | `bool`  |
     * | hidden | `false` |
     */
    boolNonfalsey: true
    /**
     * |        |        |
     * | ------ | ------ |
     * | type   | `bool` |
     * | hidden | `true` |
     */
    boolHidden: boolean
    /**
     * |        |        |
     * | ------ | ------ |
     * | type   | `bool` |
     * | hidden | `true` |
     */
    boolAll: true
}

export interface Email {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_752140959'
    /**
     * |               |         |
     * | ------------- | ------- |
     * | type          | `text`  |
     * | min           | `1`     |
     * | min           | `255`   |
     * | current value | `email` |
     */
    collectionName: 'email' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `email` |
     * | hidden   | `false` |
     * | required | `false` |
     */
    emailBase: string
    /**
     * |               |             |
     * | ------------- | ----------- |
     * | type          | `email`     |
     * | hidden        | `false`     |
     * | required      | `false`     |
     * | exceptDomains | `gmail.com` |
     */
    emailExceptDomain: string
    /**
     * |               |                            |
     * | ------------- | -------------------------- |
     * | type          | `email`                    |
     * | hidden        | `false`                    |
     * | required      | `false`                    |
     * | exceptDomains | `gmail.com`, `outlook.com` |
     */
    emailExceptDomains: string
    /**
     * |             |             |
     * | ----------- | ----------- |
     * | type        | `email`     |
     * | hidden      | `false`     |
     * | required    | `false`     |
     * | onlyDomains | `gmail.com` |
     */
    emailOnlyDomain: string
    /**
     * |             |                            |
     * | ----------- | -------------------------- |
     * | type        | `email`                    |
     * | hidden      | `false`                    |
     * | required    | `false`                    |
     * | onlyDomains | `gmail.com`, `outlook.com` |
     */
    emailOnlyDomains: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `email` |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    emailNonempty: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `email` |
     * | hidden   | `true`  |
     * | required | `false` |
     */
    emailHidden: string
}

export interface Url {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_3883334831'
    /**
     * |               |        |
     * | ------------- | ------ |
     * | type          | `text` |
     * | min           | `1`    |
     * | min           | `255`  |
     * | current value | `url`  |
     */
    collectionName: 'url' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `email` |
     * | hidden   | `false` |
     * | required | `false` |
     */
    urlBase: string
    /**
     * |               |              |
     * | ------------- | ------------ |
     * | type          | `email`      |
     * | hidden        | `false`      |
     * | required      | `false`      |
     * | exceptDomains | `google.com` |
     */
    urlExceptDomain: string
    /**
     * |               |                           |
     * | ------------- | ------------------------- |
     * | type          | `email`                   |
     * | hidden        | `false`                   |
     * | required      | `false`                   |
     * | exceptDomains | `google.com`, `yahoo.com` |
     */
    urlExceptDomains: string
    /**
     * |             |              |
     * | ----------- | ------------ |
     * | type        | `email`      |
     * | hidden      | `false`      |
     * | required    | `false`      |
     * | onlyDomains | `google.com` |
     */
    urlOnlyDomain: string
    /**
     * |             |                           |
     * | ----------- | ------------------------- |
     * | type        | `email`                   |
     * | hidden      | `false`                   |
     * | required    | `false`                   |
     * | onlyDomains | `google.com`, `yahoo.com` |
     */
    urlOnlyDomains: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `email` |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    urlNonempty: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `email` |
     * | hidden   | `true`  |
     * | required | `false` |
     */
    urlHidden: string
}

export interface DateTime {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_1938764269'
    /**
     * |               |            |
     * | ------------- | ---------- |
     * | type          | `text`     |
     * | min           | `1`        |
     * | min           | `255`      |
     * | current value | `dateTime` |
     */
    collectionName: 'dateTime' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `date`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    dateTimeBase: string
    /**
     * |          |                            |
     * | -------- | -------------------------- |
     * | type     | `date`                     |
     * | hidden   | `false`                    |
     * | required | `false`                    |
     * | min      | `2025-12-01 12:00:00.000Z` |
     */
    dateTimeMin: string
    /**
     * |          |                            |
     * | -------- | -------------------------- |
     * | type     | `date`                     |
     * | hidden   | `false`                    |
     * | required | `false`                    |
     * | max      | `2025-12-31 12:00:00.000Z` |
     */
    dateTimeMax: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `date`  |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    dateTimeNonempty: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `date`  |
     * | hidden   | `true`  |
     * | required | `false` |
     */
    dateTimeHidden: string
    /**
     * |          |                            |
     * | -------- | -------------------------- |
     * | type     | `date`                     |
     * | hidden   | `true`                     |
     * | required | `true`                     |
     * | min      | `2025-12-01 12:00:00.000Z` |
     * | max      | `2025-12-31 12:00:00.000Z` |
     */
    dateTimeAll: string
}

export interface AutoDate {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_658780362'
    /**
     * |               |            |
     * | ------------- | ---------- |
     * | type          | `text`     |
     * | min           | `1`        |
     * | min           | `255`      |
     * | current value | `autoDate` |
     */
    collectionName: 'autoDate' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `autodate` |
     * | hidden   | `false`    |
     * | onCreate | `true`     |
     * | onUpdate | `false`    |
     */
    createdBase: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `autodate` |
     * | hidden   | `true`     |
     * | onCreate | `true`     |
     * | onUpdate | `false`    |
     */
    createdHidden: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `autodate` |
     * | hidden   | `false`    |
     * | onCreate | `false`    |
     * | onUpdate | `true`     |
     */
    updatedBase: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `autodate` |
     * | hidden   | `true`     |
     * | onCreate | `false`    |
     * | onUpdate | `true`     |
     */
    updatedHidden: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `autodate` |
     * | hidden   | `false`    |
     * | onCreate | `true`     |
     * | onUpdate | `true`     |
     */
    createUpdateBase: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `autodate` |
     * | hidden   | `true`     |
     * | onCreate | `true`     |
     * | onUpdate | `true`     |
     */
    createUpdateHidden: string
}

export interface Select {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_2095159182'
    /**
     * |               |          |
     * | ------------- | -------- |
     * | type          | `text`   |
     * | min           | `1`      |
     * | min           | `255`    |
     * | current value | `select` |
     */
    collectionName: 'select' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `false`          |
     * | required | `false`          |
     */
    selectSingleBase: 'a' | 'b' | 'c' | '\'' | '"' | '`' | '\\'
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `false`          |
     * | required | `true`           |
     */
    selectSingleNonempty: 'a' | 'b' | 'c' | '\'' | '"' | '`' | '\\'
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `true`           |
     * | required | `false`          |
     */
    selectSingleHidden: 'a' | 'b' | 'c' | '\'' | '"' | '`' | '\\'
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `true`           |
     * | required | `true`           |
     */
    selectSingleAll: 'a' | 'b' | 'c' | '\'' | '"' | '`' | '\\'
    /**
     * |           |                     |
     * | --------- | ------------------- |
     * | type      | `select (multiple)` |
     * | hidden    | `false`             |
     * | required  | `false`             |
     * | maxSelect | `7`                 |
     */
    selectMultipleBase: ('a' | 'b' | 'c' | '\'' | '"' | '`' | '\\')[]
    /**
     * |           |                     |
     * | --------- | ------------------- |
     * | type      | `select (multiple)` |
     * | hidden    | `false`             |
     * | required  | `true`              |
     * | maxSelect | `7`                 |
     */
    selectMultipleNonempty: ['a' | 'b' | 'c' | '\'' | '"' | '`' | '\\', ...('a' | 'b' | 'c' | '\'' | '"' | '`' | '\\')[]]
    /**
     * |           |                     |
     * | --------- | ------------------- |
     * | type      | `select (multiple)` |
     * | hidden    | `true`              |
     * | required  | `false`             |
     * | maxSelect | `7`                 |
     */
    selectMultipleHidden: ('a' | 'b' | 'c' | '\'' | '"' | '`' | '\\')[]
    /**
     * |           |                     |
     * | --------- | ------------------- |
     * | type      | `select (multiple)` |
     * | hidden    | `true`              |
     * | required  | `true`              |
     * | maxSelect | `7`                 |
     */
    selectMultipleAll: ['a' | 'b' | 'c' | '\'' | '"' | '`' | '\\', ...('a' | 'b' | 'c' | '\'' | '"' | '`' | '\\')[]]
}

export interface File {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_2878493088'
    /**
     * |               |        |
     * | ------------- | ------ |
     * | type          | `text` |
     * | min           | `1`    |
     * | min           | `255`  |
     * | current value | `file` |
     */
    collectionName: 'file' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |           |                |
     * | --------- | -------------- |
     * | type      | `file(single)` |
     * | hidden    | `false`        |
     * | required  | `false`        |
     * | protected | `false`        |
     * | maxSize   | `0`            |
     */
    fileSingleBase: string
    /**
     * |           |                                                                       |
     * | --------- | --------------------------------------------------------------------- |
     * | type      | `file(single)`                                                        |
     * | hidden    | `false`                                                               |
     * | required  | `false`                                                               |
     * | protected | `false`                                                               |
     * | maxSize   | `0`                                                                   |
     * | mimeTypes | `image/jpeg`, `image/png`, `image/svg+xml`, `image/gif`, `image/webp` |
     */
    fileSingleMimeTypes: string
    /**
     * |           |                |
     * | --------- | -------------- |
     * | type      | `file(single)` |
     * | hidden    | `false`        |
     * | required  | `false`        |
     * | protected | `false`        |
     * | maxSize   | `0`            |
     * | thumbs    | `50x50`        |
     */
    singleThumbsixze: string
    /**
     * |           |                |
     * | --------- | -------------- |
     * | type      | `file(single)` |
     * | hidden    | `false`        |
     * | required  | `false`        |
     * | protected | `false`        |
     * | maxSize   | `100`          |
     */
    fileSingleMaxFileSize: string
    /**
     * |           |                |
     * | --------- | -------------- |
     * | type      | `file(single)` |
     * | hidden    | `false`        |
     * | required  | `false`        |
     * | protected | `true`         |
     * | maxSize   | `0`            |
     */
    fileSingleProtected: string
    /**
     * |           |                |
     * | --------- | -------------- |
     * | type      | `file(single)` |
     * | hidden    | `false`        |
     * | required  | `true`         |
     * | protected | `false`        |
     * | maxSize   | `0`            |
     */
    fileSingleNonempty: string
    /**
     * |           |                |
     * | --------- | -------------- |
     * | type      | `file(single)` |
     * | hidden    | `false`        |
     * | required  | `true`         |
     * | protected | `false`        |
     * | maxSize   | `0`            |
     */
    fileSingleHidden: string
    /**
     * |           |                                                                       |
     * | --------- | --------------------------------------------------------------------- |
     * | type      | `file(single)`                                                        |
     * | hidden    | `true`                                                                |
     * | required  | `true`                                                                |
     * | protected | `true`                                                                |
     * | maxSize   | `100`                                                                 |
     * | mimeTypes | `image/jpeg`, `image/png`, `image/svg+xml`, `image/gif`, `image/webp` |
     * | thumbs    | `50x50`                                                               |
     */
    fileSingleAll: string
    /**
     * |           |                   |
     * | --------- | ----------------- |
     * | type      | `file (multiple)` |
     * | hidden    | `false`           |
     * | required  | `false`           |
     * | protected | `false`           |
     * | maxSize   | `0`               |
     * | maxSelect | `99`              |
     */
    fileMultipleBase: string[]
    /**
     * |           |                                                                       |
     * | --------- | --------------------------------------------------------------------- |
     * | type      | `file (multiple)`                                                     |
     * | hidden    | `false`                                                               |
     * | required  | `false`                                                               |
     * | protected | `false`                                                               |
     * | maxSize   | `0`                                                                   |
     * | maxSelect | `99`                                                                  |
     * | mimeTypes | `image/jpeg`, `image/png`, `image/svg+xml`, `image/gif`, `image/webp` |
     */
    fileMultipleMimeTypes: string[]
    /**
     * |           |                   |
     * | --------- | ----------------- |
     * | type      | `file (multiple)` |
     * | hidden    | `false`           |
     * | required  | `false`           |
     * | protected | `false`           |
     * | maxSize   | `0`               |
     * | maxSelect | `99`              |
     * | thumbs    | `50x50`           |
     */
    fileMultipleThumbSize: string[]
    /**
     * |           |                   |
     * | --------- | ----------------- |
     * | type      | `file (multiple)` |
     * | hidden    | `false`           |
     * | required  | `false`           |
     * | protected | `false`           |
     * | maxSize   | `100`             |
     * | maxSelect | `99`              |
     */
    fileMultipleMaxFileSize: string[]
    /**
     * |           |                   |
     * | --------- | ----------------- |
     * | type      | `file (multiple)` |
     * | hidden    | `false`           |
     * | required  | `false`           |
     * | protected | `true`            |
     * | maxSize   | `0`               |
     * | maxSelect | `99`              |
     */
    fileMultipleProtected: string[]
    /**
     * |           |                   |
     * | --------- | ----------------- |
     * | type      | `file (multiple)` |
     * | hidden    | `false`           |
     * | required  | `true`            |
     * | protected | `false`           |
     * | maxSize   | `0`               |
     * | maxSelect | `99`              |
     */
    fileMultipleNonempty: [string, ...string[]]
    /**
     * |           |                   |
     * | --------- | ----------------- |
     * | type      | `file (multiple)` |
     * | hidden    | `false`           |
     * | required  | `true`            |
     * | protected | `false`           |
     * | maxSize   | `0`               |
     * | maxSelect | `99`              |
     */
    fileMultipleHidden: [string, ...string[]]
    /**
     * |           |                                                                       |
     * | --------- | --------------------------------------------------------------------- |
     * | type      | `file (multiple)`                                                     |
     * | hidden    | `true`                                                                |
     * | required  | `true`                                                                |
     * | protected | `true`                                                                |
     * | maxSize   | `100`                                                                 |
     * | maxSelect | `99`                                                                  |
     * | mimeTypes | `image/jpeg`, `image/png`, `image/svg+xml`, `image/gif`, `image/webp` |
     * | thumbs    | `50x50`                                                               |
     */
    fileMultipleAll: [string, ...string[]]
}

export interface Relation {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_583475024'
    /**
     * |               |            |
     * | ------------- | ---------- |
     * | type          | `text`     |
     * | min           | `1`        |
     * | min           | `255`      |
     * | current value | `relation` |
     */
    collectionName: 'relation' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `false`            |
     * | required       | `false`            |
     * | collectionId   | `_pb_users_auth_`  |
     * | collectionName | `users`            |
     * | cascadeDelete  | `false`            |
     */
    relationSingleBase: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `false`            |
     * | required       | `false`            |
     * | collectionId   | `_pb_users_auth_`  |
     * | collectionName | `users`            |
     * | cascadeDelete  | `true`             |
     */
    relationSingleCascadeDelete: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `false`            |
     * | required       | `true`             |
     * | collectionId   | `_pb_users_auth_`  |
     * | collectionName | `users`            |
     * | cascadeDelete  | `false`            |
     */
    relationSingleNonempty: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `true`             |
     * | required       | `false`            |
     * | collectionId   | `_pb_users_auth_`  |
     * | collectionName | `users`            |
     * | cascadeDelete  | `false`            |
     */
    relationSingleHidden: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `true`             |
     * | required       | `true`             |
     * | collectionId   | `_pb_users_auth_`  |
     * | collectionName | `users`            |
     * | cascadeDelete  | `true`             |
     */
    relationSingleAll: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `false`            |
     * | required       | `false`            |
     * | collectionId   | `_pb_users_auth_`  |
     * | collectionName | `users`            |
     * | cascadeDelete  | `false`            |
     */
    relationSingleUnique: string
    /**
     * |                |                       |
     * | -------------- | --------------------- |
     * | type           | `relation (multiple)` |
     * | hidden         | `false`               |
     * | required       | `false`               |
     * | collectionId   | `_pb_users_auth_`     |
     * | collectionName | `users`               |
     * | cascadeDelete  | `false`               |
     * | maxSelect      | `999`                 |
     */
    relationMultipleBase: string[]
    /**
     * |                |                       |
     * | -------------- | --------------------- |
     * | type           | `relation (multiple)` |
     * | hidden         | `false`               |
     * | required       | `false`               |
     * | collectionId   | `_pb_users_auth_`     |
     * | collectionName | `users`               |
     * | cascadeDelete  | `false`               |
     * | minSelect      | `5`                   |
     * | maxSelect      | `999`                 |
     */
    relationMultipleMin5: string[]
    /**
     * |                |                       |
     * | -------------- | --------------------- |
     * | type           | `relation (multiple)` |
     * | hidden         | `false`               |
     * | required       | `false`               |
     * | collectionId   | `_pb_users_auth_`     |
     * | collectionName | `users`               |
     * | cascadeDelete  | `true`                |
     * | maxSelect      | `999`                 |
     */
    relationMultipleCascadeDelete: string[]
    /**
     * |                |                       |
     * | -------------- | --------------------- |
     * | type           | `relation (multiple)` |
     * | hidden         | `false`               |
     * | required       | `true`                |
     * | collectionId   | `_pb_users_auth_`     |
     * | collectionName | `users`               |
     * | cascadeDelete  | `false`               |
     * | maxSelect      | `999`                 |
     */
    relationMultipleNonempty: [string, ...string[]]
    /**
     * |                |                       |
     * | -------------- | --------------------- |
     * | type           | `relation (multiple)` |
     * | hidden         | `true`                |
     * | required       | `false`               |
     * | collectionId   | `_pb_users_auth_`     |
     * | collectionName | `users`               |
     * | cascadeDelete  | `false`               |
     * | maxSelect      | `999`                 |
     */
    relationMultipleHidden: string[]
    /**
     * |                |                       |
     * | -------------- | --------------------- |
     * | type           | `relation (multiple)` |
     * | hidden         | `true`                |
     * | required       | `true`                |
     * | collectionId   | `_pb_users_auth_`     |
     * | collectionName | `users`               |
     * | cascadeDelete  | `true`                |
     * | minSelect      | `5`                   |
     * | maxSelect      | `999`                 |
     */
    relationMultipleAll: [string, ...string[]]
    /**
     * |                |                       |
     * | -------------- | --------------------- |
     * | type           | `relation (multiple)` |
     * | hidden         | `false`               |
     * | required       | `false`               |
     * | collectionId   | `_pb_users_auth_`     |
     * | collectionName | `users`               |
     * | cascadeDelete  | `false`               |
     * | maxSelect      | `999`                 |
     */
    relationMultipleUnique: string[]
}

export interface Json {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_1275740917'
    /**
     * |               |        |
     * | ------------- | ------ |
     * | type          | `text` |
     * | min           | `1`    |
     * | min           | `255`  |
     * | current value | `json` |
     */
    collectionName: 'json' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `json`  |
     * | hidden   | `false` |
     * | maxSize  | `0`     |
     * | required | `false` |
     */
    json: any
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `json`  |
     * | hidden   | `false` |
     * | maxSize  | `100`   |
     * | required | `false` |
     */
    jsonMaxSize: any
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `json`  |
     * | hidden   | `false` |
     * | maxSize  | `0`     |
     * | required | `true`  |
     */
    jsonNonempty: any
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `json`  |
     * | hidden   | `true`  |
     * | maxSize  | `0`     |
     * | required | `false` |
     */
    jsonHidden: any
    /**
     * |          |        |
     * | -------- | ------ |
     * | type     | `json` |
     * | hidden   | `true` |
     * | maxSize  | `100`  |
     * | required | `true` |
     */
    jsonAll: any
}

export interface GeoPoint {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_1864948514'
    /**
     * |               |            |
     * | ------------- | ---------- |
     * | type          | `text`     |
     * | min           | `1`        |
     * | min           | `255`      |
     * | current value | `geoPoint` |
     */
    collectionName: 'geoPoint' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `geoPoint` |
     * | hidden   | `false`    |
     * | required | `false`    |
     */
    geoPointBase: { lon: number; lat: number }
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `geoPoint` |
     * | hidden   | `false`    |
     * | required | `true`     |
     */
    geoPointNonempty: { lon: number; lat: number }
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `geoPoint` |
     * | hidden   | `true`     |
     * | required | `false`    |
     */
    geoPointHidden: { lon: number; lat: number }
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `geoPoint` |
     * | hidden   | `true`     |
     * | required | `true`     |
     */
    geoPointAll: { lon: number; lat: number }
}

export interface Editor {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_4225928436'
    /**
     * |               |          |
     * | ------------- | -------- |
     * | type          | `text`   |
     * | min           | `1`      |
     * | min           | `255`    |
     * | current value | `editor` |
     */
    collectionName: 'editor' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `false`  |
     * | required    | `false`  |
     * | convertURLs | `false`  |
     */
    editorBase: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `false`  |
     * | required    | `true`   |
     * | convertURLs | `false`  |
     */
    editorNonempty: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `false`  |
     * | required    | `false`  |
     * | convertURLs | `false`  |
     */
    editorHidden: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `false`  |
     * | required    | `false`  |
     * | convertURLs | `false`  |
     * | maxSize     | `100`    |
     */
    editorMax100: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `true`   |
     * | required    | `true`   |
     * | convertURLs | `false`  |
     * | maxSize     | `100`    |
     */
    editorAll: string
}

export interface PasswordMax50Validation {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_590154541'
    /**
     * |               |                           |
     * | ------------- | ------------------------- |
     * | type          | `text`                    |
     * | min           | `1`                       |
     * | min           | `255`                     |
     * | current value | `passwordMax50Validation` |
     */
    collectionName: 'passwordMax50Validation' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `password` |
     * | hidden   | `true`     |
     * | required | `true`     |
     * | min      | `8`        |
     * | max      | `50`       |
     * | pattern  | `^\w+$`    |
     */
    password: string
    /**
     * |                     |                   |
     * | ------------------- | ----------------- |
     * | type                | `text`            |
     * | hidden              | `true`            |
     * | required            | `true`            |
     * | min                 | `30`              |
     * | max                 | `60`              |
     * | autogeneratePattern | `[a-zA-Z0-9]{50}` |
     */
    tokenKey: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `email` |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    email: string
    /**
     * |        |         |
     * | ------ | ------- |
     * | type   | `bool`  |
     * | hidden | `false` |
     */
    emailVisibility: boolean
    /**
     * |        |         |
     * | ------ | ------- |
     * | type   | `bool`  |
     * | hidden | `false` |
     */
    verified: boolean
}

export interface Posts {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_1125843985'
    /**
     * |               |         |
     * | ------------- | ------- |
     * | type          | `text`  |
     * | min           | `1`     |
     * | min           | `255`   |
     * | current value | `posts` |
     */
    collectionName: 'posts' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `false`            |
     * | required       | `false`            |
     * | collectionId   | `_pb_users_auth_`  |
     * | collectionName | `users`            |
     * | cascadeDelete  | `false`            |
     */
    author: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `false`  |
     * | required    | `false`  |
     * | convertURLs | `false`  |
     */
    content: string
    /**
     * |          |          |
     * | -------- | -------- |
     * | type     | `number` |
     * | hidden   | `false`  |
     * | required | `false`  |
     * | onlyInt  | `false`  |
     */
    likes: number
}

export interface ViewCollection {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_3231763405'
    /**
     * |               |                  |
     * | ------------- | ---------------- |
     * | type          | `text`           |
     * | min           | `1`              |
     * | min           | `255`            |
     * | current value | `viewCollection` |
     */
    collectionName: 'viewCollection' | (string & {})
    /**
     * |          |               |
     * | -------- | ------------- |
     * | type     | `text`        |
     * | hidden   | `false`       |
     * | required | `true`        |
     * | max      | `5000`        |
     * | pattern  | `^[a-z0-9]+$` |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     * | max      | `255`   |
     */
    username: string
    /**
     * |          |          |
     * | -------- | -------- |
     * | type     | `number` |
     * | hidden   | `false`  |
     * | required | `false`  |
     * | onlyInt  | `false`  |
     */
    posts: number
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `json`  |
     * | hidden   | `false` |
     * | maxSize  | `1`     |
     * | required | `false` |
     */
    likes: any
}

export interface A {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_3535952755'
    /**
     * |               |        |
     * | ------------- | ------ |
     * | type          | `text` |
     * | min           | `1`    |
     * | min           | `255`  |
     * | current value | `a`    |
     */
    collectionName: 'a' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `autodate` |
     * | hidden   | `false`    |
     * | onCreate | `true`     |
     * | onUpdate | `false`    |
     */
    created: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `autodate` |
     * | hidden   | `false`    |
     * | onCreate | `true`     |
     * | onUpdate | `true`     |
     */
    updated: string
}

export interface B {
    /**
     * |      |        |
     * | ---- | ------ |
     * | type | `text` |
     * | min  | `1`    |
     * | min  | `100`  |
     */
    collectionId: 'pbc_1271597769'
    /**
     * |               |        |
     * | ------------- | ------ |
     * | type          | `text` |
     * | min           | `1`    |
     * | min           | `255`  |
     * | current value | `b`    |
     */
    collectionName: 'b' | (string & {})
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | required            | `true`         |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     */
    id: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `autodate` |
     * | hidden   | `false`    |
     * | onCreate | `true`     |
     * | onUpdate | `false`    |
     */
    created: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `autodate` |
     * | hidden   | `false`    |
     * | onCreate | `true`     |
     * | onUpdate | `true`     |
     */
    updated: string
    
    /**
     * This is a unique identifier to help TypeScript differentiate this interface from others sharing the same properties.
     * Refer to https://github.com/satohshi/pocketbase-ts#dealing-with-tables-with-exactly-the-same-properties for more information.
     */
    readonly [uniqueIdentifier]: unique symbol
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
            // relation_via_relationSingleBase?: Relation[]
            // relation_via_relationSingleCascadeDelete?: Relation[]
            // relation_via_relationSingleNonempty?: Relation[]
            // relation_via_relationSingleHidden?: Relation[]
            // relation_via_relationSingleAll?: Relation[]
            relation_via_relationSingleUnique?: Relation
            // relation_via_relationMultipleBase?: Relation[]
            // relation_via_relationMultipleMin5?: Relation[]
            // relation_via_relationMultipleCascadeDelete?: Relation[]
            // relation_via_relationMultipleNonempty?: Relation[]
            // relation_via_relationMultipleHidden?: Relation[]
            // relation_via_relationMultipleAll?: Relation[]
            relation_via_relationMultipleUnique?: Relation
            // posts_via_author?: Posts[]
        }
    }
    text: {
        type: Text
    }
    number: {
        type: Number
    }
    bool: {
        type: Bool
    }
    email: {
        type: Email
    }
    url: {
        type: Url
    }
    dateTime: {
        type: DateTime
    }
    autoDate: {
        type: AutoDate
    }
    select: {
        type: Select
    }
    file: {
        type: File
    }
    relation: {
        type: Relation
        relations: {
            relationSingleBase?: Users
            relationSingleCascadeDelete?: Users
            relationSingleNonempty: Users
            relationSingleHidden?: Users
            relationSingleAll: Users
            relationSingleUnique?: Users
            relationMultipleBase?: Users[]
            relationMultipleMin5?: Users[]
            relationMultipleCascadeDelete?: Users[]
            relationMultipleNonempty: Users[]
            relationMultipleHidden?: Users[]
            relationMultipleAll: Users[]
            relationMultipleUnique?: Users[]
        }
    }
    json: {
        type: Json
    }
    geoPoint: {
        type: GeoPoint
    }
    editor: {
        type: Editor
    }
    passwordMax50Validation: {
        type: PasswordMax50Validation
    }
    posts: {
        type: Posts
        relations: {
            author?: Users
        }
    }
    viewCollection: {
        type: ViewCollection
    }
    a: {
        type: A
    }
    b: {
        type: B
    }
}

