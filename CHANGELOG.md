# pocketbase-ts-schema-generator

## Unreleased

- fix: config.json not included in build (fixes #19)

## 0.6.1

- escape single quotes and backslashes in select options (fixes #17)

## 0.6.0

- add collection name/id fields

## 0.5.2

- add geoPoint support

## 0.5.1

- fix: config.json not included in build

## 0.5.0

- provide ways to better type json fields (fixes #13)

## 0.4.1

- embed verson number in ui

## 0.4.0

- polished ui

## 0.3.2

### Patch Changes

- f7ce5ff: use filenames from config.json for downloads
- d8bc9d2: add gzip middleware

## 0.3.1

### Patch Changes

- e148bfc: fix indentation

## 0.3.0

### Minor Changes

- 291bd2d: support Zod schema generation

### Patch Changes

- 77b16b3: add option to exclude system collections
- 261db2b: use tuple instead of array where applicable

## 0.2.0

### Minor Changes

- 47e4193: add route for downloading schema file
- de8eaa9: rename config variables

## 0.1.0

### Minor Changes

- 11454c6: update hooks for 0.23 support (fixes #2)

## 0.0.2

### Patch Changes

- eca427f: only include `ViewCollection` interface when there's one
