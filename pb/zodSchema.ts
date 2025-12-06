import { z } from 'zod'

const DATETIME_REGEX = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(\.\d+)?Z$/

export const usersSchema = z.object({
    collectionId: z.literal('_pb_users_auth_').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    password: z.string().min(8).max(71),
    tokenKey: z.string().min(30).max(60).optional(),
    email: z.string().email(),
    emailVisibility: z.boolean().optional(),
    verified: z.boolean().optional(),
    name: z.string().max(255).optional(),
    avatar: z.string().optional(),
    created: z.string().regex(DATETIME_REGEX).optional(),
    updated: z.string().regex(DATETIME_REGEX).optional(),
})

export const textSchema = z.object({
    collectionId: z.literal('pbc_4285667772').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    textBase: z.string().max(5000).optional(),
    textHidden: z.string().max(5000).optional(),
    textNonempty: z.string().min(1).max(5000),
    textMin5: z.string().min(5).max(5000).optional(),
    textMax10: z.string().max(10).optional(),
    textMin5Max10: z.string().min(5).max(10).optional(),
    textPattern: z.string().regex(/^[a-z0-9]+$/).max(5000).optional(),
    textAutoGen: z.string().max(5000).optional(),
    textAll: z.string().regex(/^[a-z0-9]+$/).min(5).max(10).optional(),
})

export const numberSchema = z.object({
    collectionId: z.literal('pbc_2709742106').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    numberBase: z.number().optional(),
    numberMin5: z.number().min(5).optional(),
    numberMax10: z.number().max(10).optional(),
    numberNonzero: z.number().refine((n) => n !== 0),
    numberHidden: z.number().optional(),
    numberNoDecimals: z.number().int().optional(),
    numberAll: z.number().int().min(5).max(10).refine((n) => n !== 0),
})

export const boolSchema = z.object({
    collectionId: z.literal('pbc_1921798434').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    boolBase: z.boolean().optional(),
    boolNonfalsey: z.literal(true),
    boolHidden: z.boolean().optional(),
    boolAll: z.literal(true),
})

export const emailSchema = z.object({
    collectionId: z.literal('pbc_752140959').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    emailBase: z.string().email().optional(),
    emailExceptDomain: z.string().email().refine((v) => !['gmail.com'].includes(v.split('@')[1])).optional(),
    emailExceptDomains: z.string().email().refine((v) => !['gmail.com', 'outlook.com'].includes(v.split('@')[1])).optional(),
    emailOnlyDomain: z.string().email().refine((v) => ['gmail.com'].includes(v.split('@')[1])).optional(),
    emailOnlyDomains: z.string().email().refine((v) => ['gmail.com', 'outlook.com'].includes(v.split('@')[1])).optional(),
    emailNonempty: z.string().email(),
    emailHidden: z.string().email().optional(),
})

export const urlSchema = z.object({
    collectionId: z.literal('pbc_3883334831').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    urlBase: z.string().url().optional(),
    urlExceptDomain: z.string().url().refine((v) => ['google.com'].every((domain) => !v.includes(domain))).optional(),
    urlExceptDomains: z.string().url().refine((v) => ['google.com', 'yahoo.com'].every((domain) => !v.includes(domain))).optional(),
    urlOnlyDomain: z.string().url().refine((v) => ['google.com'].some((domain) => v.includes(domain))).optional(),
    urlOnlyDomains: z.string().url().refine((v) => ['google.com', 'yahoo.com'].some((domain) => v.includes(domain))).optional(),
    urlNonempty: z.string().url(),
    urlHidden: z.string().url().optional(),
})

export const dateTimeSchema = z.object({
    collectionId: z.literal('pbc_1938764269').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    dateTimeBase: z.string().regex(DATETIME_REGEX).optional(),
    dateTimeMin: z.string().regex(DATETIME_REGEX).refine((v) => {
        const date = new Date(v)
        const minDate = new Date('2025-12-01 12:00:00.000Z')
        return date >= minDate
    }).optional(),
    dateTimeMax: z.string().regex(DATETIME_REGEX).refine((v) => {
        const date = new Date(v)
        const maxDate = new Date('2025-12-31 12:00:00.000Z')
        return date <= maxDate
    }).optional(),
    dateTimeNonempty: z.string().regex(DATETIME_REGEX),
    dateTimeHidden: z.string().regex(DATETIME_REGEX).optional(),
    dateTimeAll: z.string().regex(DATETIME_REGEX).refine((v) => {
        const date = new Date(v)
        const minDate = new Date('2025-12-01 12:00:00.000Z')
        const maxDate = new Date('2025-12-31 12:00:00.000Z')
        return date >= minDate && date <= maxDate
    }),
})

export const autoDateSchema = z.object({
    collectionId: z.literal('pbc_658780362').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    createdBase: z.string().regex(DATETIME_REGEX).optional(),
    createdHidden: z.string().regex(DATETIME_REGEX).optional(),
    updatedBase: z.string().regex(DATETIME_REGEX).optional(),
    updatedHidden: z.string().regex(DATETIME_REGEX).optional(),
    createUpdateBase: z.string().regex(DATETIME_REGEX).optional(),
    createUpdateHidden: z.string().regex(DATETIME_REGEX).optional(),
})

export const selectSchema = z.object({
    collectionId: z.literal('pbc_2095159182').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    selectSingleBase: z.enum(['a', 'b', 'c', '\'', '"', '`', '\\']).optional(),
    selectSingleNonempty: z.enum(['a', 'b', 'c', '\'', '"', '`', '\\']),
    selectSingleHidden: z.enum(['a', 'b', 'c', '\'', '"', '`', '\\']).optional(),
    selectSingleAll: z.enum(['a', 'b', 'c', '\'', '"', '`', '\\']),
    selectMultipleBase: z.enum(['a', 'b', 'c', '\'', '"', '`', '\\']).array().max(7).optional(),
    selectMultipleNonempty: z.enum(['a', 'b', 'c', '\'', '"', '`', '\\']).array().nonempty().max(7),
    selectMultipleHidden: z.enum(['a', 'b', 'c', '\'', '"', '`', '\\']).array().max(7).optional(),
    selectMultipleAll: z.enum(['a', 'b', 'c', '\'', '"', '`', '\\']).array().nonempty().max(7),
})

export const fileSchema = z.object({
    collectionId: z.literal('pbc_2878493088').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    fileSingleBase: z.string().optional(),
    fileSingleMimeTypes: z.string().optional(),
    singleThumbsixze: z.string().optional(),
    fileSingleMaxFileSize: z.string().optional(),
    fileSingleProtected: z.string().optional(),
    fileSingleNonempty: z.string(),
    fileSingleHidden: z.string(),
    fileSingleAll: z.string(),
    fileMultipleBase: z.string().array().max(99).optional(),
    fileMultipleMimeTypes: z.string().array().max(99).optional(),
    fileMultipleThumbSize: z.string().array().max(99).optional(),
    fileMultipleMaxFileSize: z.string().array().max(99).optional(),
    fileMultipleProtected: z.string().array().max(99).optional(),
    fileMultipleNonempty: z.string().array().nonempty().max(99),
    fileMultipleHidden: z.string().array().nonempty().max(99),
    fileMultipleAll: z.string().array().nonempty().max(99),
})

export const relationSchema = z.object({
    collectionId: z.literal('pbc_583475024').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    relationSingleBase: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    relationSingleCascadeDelete: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    relationSingleNonempty: z.string().regex(/^[a-z0-9]+$/).length(15),
    relationSingleHidden: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    relationSingleAll: z.string().regex(/^[a-z0-9]+$/).length(15),
    relationSingleUnique: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    relationMultipleBase: z.string().regex(/^[a-z0-9]+$/).length(15).array().max(999).optional(),
    relationMultipleMin5: z.string().regex(/^[a-z0-9]+$/).length(15).array().min(5).max(999).optional(),
    relationMultipleCascadeDelete: z.string().regex(/^[a-z0-9]+$/).length(15).array().max(999).optional(),
    relationMultipleNonempty: z.string().regex(/^[a-z0-9]+$/).length(15).array().nonempty().max(999),
    relationMultipleHidden: z.string().regex(/^[a-z0-9]+$/).length(15).array().max(999).optional(),
    relationMultipleAll: z.string().regex(/^[a-z0-9]+$/).length(15).array().nonempty().min(5).max(999),
    relationMultipleUnique: z.string().regex(/^[a-z0-9]+$/).length(15).array().max(999).optional(),
})

export const jsonSchema = z.object({
    collectionId: z.literal('pbc_1275740917').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    json: z.unknown().optional(),
    jsonMaxSize: z.unknown().optional(),
    jsonNonempty: z.unknown(),
    jsonHidden: z.unknown().optional(),
    jsonAll: z.unknown(),
})

export const geoPointSchema = z.object({
    collectionId: z.literal('pbc_1864948514').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    geoPointBase: z.object({ lon: z.number(), lat: z.number() }).optional(),
    geoPointNonempty: z.object({ lon: z.number(), lat: z.number() }).refine(({ lon, lat }) => !(lon === 0 && lat === 0)),
    geoPointHidden: z.object({ lon: z.number(), lat: z.number() }).optional(),
    geoPointAll: z.object({ lon: z.number(), lat: z.number() }).refine(({ lon, lat }) => !(lon === 0 && lat === 0)),
})

export const editorSchema = z.object({
    collectionId: z.literal('pbc_4225928436').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    editorBase: z.string().optional(),
    editorNonempty: z.string().min(1),
    editorHidden: z.string().optional(),
    editorMax100: z.string().optional(),
    editorAll: z.string().min(1),
})

export const passwordMax50ValidationSchema = z.object({
    collectionId: z.literal('pbc_590154541').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    password: z.string().regex(/^\w+$/).min(8).max(50),
    tokenKey: z.string().min(30).max(60).optional(),
    email: z.string().email(),
    emailVisibility: z.boolean().optional(),
    verified: z.boolean().optional(),
})

export const postsSchema = z.object({
    collectionId: z.literal('pbc_1125843985').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    author: z.string().regex(/^[a-z0-9]+$/).length(15).optional(),
    content: z.string().optional(),
    likes: z.number().optional(),
})

export const viewCollectionSchema = z.object({
    collectionId: z.literal('pbc_3231763405').optional(),
    collectionName: z.string().min(1).max(255).optional(),
    id: z.string().regex(/^[a-z0-9]+$/).min(1).max(5000),
    username: z.string().max(255).optional(),
    posts: z.number().optional(),
    likes: z.unknown().optional(),
})

