import { Types } from '@graphql-codegen/plugin-helpers'
import {
    ClientSideBaseVisitor,
    DocumentMode,
    RawClientSideBasePluginConfig,
    ClientSideBasePluginConfig,
    LoadedFragment,
} from '@graphql-codegen/visitor-plugin-common'
import { GraphQLSchema, OperationDefinitionNode } from 'graphql'

export class GraphQLHooksVisitor extends ClientSideBaseVisitor<
    RawClientSideBasePluginConfig,
    ClientSideBasePluginConfig
> {
    constructor(
        schema: GraphQLSchema,
        fragments: LoadedFragment[],
        rawConfig: RawClientSideBasePluginConfig,
        additionalConfig: Partial<ClientSideBasePluginConfig>,
        documents?: Types.DocumentFile[]
    ) {
        super(
            schema,
            fragments,
            rawConfig,
            {
                documentMode: DocumentMode.string,
                ...additionalConfig,
            },
            documents
        )
    }

    override getImports() {
        return [
            `import { useQuery, useMutation,useSubscription, useManualQuery, UseClientRequestOptions, UseQueryOptions  } from 'graphql-hooks';`,
        ]
    }

    protected override buildOperation(
        node: OperationDefinitionNode,
        documentVariableName: string,
        operationType: string,
        operationResultType: string,
        operationVariablesTypes: string,
        hasRequiredVariables: boolean
    ) {
        switch (operationType) {
            case 'Query': {
                return [
                    `export const use${operationResultType} = (options?: UseQueryOptions<${operationResultType}, ${operationVariablesTypes}>) => useQuery<${operationResultType}, ${operationVariablesTypes}>(${documentVariableName}, options)`,
                    `export const useManual${operationResultType} = (options?: UseClientRequestOptions<${operationResultType}, ${operationVariablesTypes}>) => useManualQuery<${operationResultType}, ${operationVariablesTypes}>(${documentVariableName}, options)`,
                ].join('\n')
            }
            case 'Mutation': {
                return `export const use${operationResultType} = (options?: UseClientRequestOptions<${operationResultType}, ${operationVariablesTypes}>) => useMutation<${operationResultType}, ${operationVariablesTypes}>(${documentVariableName}, options)`
            }
            case 'Subscription': {
                return `export const use${operationResultType} = (options?: UseClientRequestOptions<${operationResultType}, ${operationVariablesTypes}>) => useSubscription<${operationResultType}, ${operationVariablesTypes}>({query: ${documentVariableName}}, options)`
            }
        }

        return ''
    }
}
