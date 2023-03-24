# GraphQL Codegen - GraphQL Hooks

![npm](https://img.shields.io/npm/v/@stefanoruth/graphql-codegen-graphql-hooks)

-   [GraphQL Code Generator](https://www.graphql-code-generator.com/)
-   [GraphQL Hooks](https://github.com/nearform/graphql-hooks

Supports all hooks:
- useQuery
- useMutation
- useSubscription

## Install

`yarn add @stefanoruth/graphql-codegen-graphql-hooks`

or

`npm install @stefanoruth/graphql-codegen-graphql-hooks`

## Quick Start

Add the plugin to youre codegen.yml config

```yml
schema: 'my-schema.graphql'
generates:
    output.ts:
        plugins:
            - 'typescript'
            - 'typescript-operations'
            - '@stefanoruth/graphql-codegen-graphql-hooks'
```
