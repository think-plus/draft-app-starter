/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type PopulateProductMutationVariables = AdminTypes.Exact<{
  product: AdminTypes.ProductCreateInput;
}>;


export type PopulateProductMutation = { productCreate?: AdminTypes.Maybe<{ product?: AdminTypes.Maybe<(
      Pick<AdminTypes.Product, 'id' | 'title' | 'handle' | 'status'>
      & { variants: { edges: Array<{ node: Pick<AdminTypes.ProductVariant, 'id' | 'price' | 'barcode' | 'createdAt'> }> } }
    )> }> };

export type ShopifyRemixTemplateUpdateVariantMutationVariables = AdminTypes.Exact<{
  productId: AdminTypes.Scalars['ID']['input'];
  variants: Array<AdminTypes.ProductVariantsBulkInput> | AdminTypes.ProductVariantsBulkInput;
}>;


export type ShopifyRemixTemplateUpdateVariantMutation = { productVariantsBulkUpdate?: AdminTypes.Maybe<{ productVariants?: AdminTypes.Maybe<Array<Pick<AdminTypes.ProductVariant, 'id' | 'price' | 'barcode' | 'createdAt'>>> }> };

export type GetOrdersAfterQueryVariables = AdminTypes.Exact<{
  cursor?: AdminTypes.InputMaybe<AdminTypes.Scalars['String']['input']>;
}>;


export type GetOrdersAfterQuery = { orders: { edges: Array<(
      Pick<AdminTypes.OrderEdge, 'cursor'>
      & { node: (
        Pick<AdminTypes.Order, 'id' | 'name'>
        & { currentTotalPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, customer?: AdminTypes.Maybe<Pick<AdminTypes.Customer, 'displayName'>>, shippingAddress?: AdminTypes.Maybe<Pick<AdminTypes.MailingAddress, 'address1' | 'city' | 'zip'>> }
      ) }
    )>, pageInfo: Pick<AdminTypes.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'endCursor' | 'startCursor'> } };

export type GetOrdersBeforeQueryVariables = AdminTypes.Exact<{
  cursor?: AdminTypes.InputMaybe<AdminTypes.Scalars['String']['input']>;
}>;


export type GetOrdersBeforeQuery = { orders: { edges: Array<(
      Pick<AdminTypes.OrderEdge, 'cursor'>
      & { node: (
        Pick<AdminTypes.Order, 'id' | 'name'>
        & { currentTotalPriceSet: { shopMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, customer?: AdminTypes.Maybe<Pick<AdminTypes.Customer, 'displayName'>>, shippingAddress?: AdminTypes.Maybe<Pick<AdminTypes.MailingAddress, 'address1' | 'city' | 'zip'>> }
      ) }
    )>, pageInfo: Pick<AdminTypes.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'endCursor' | 'startCursor'> } };

interface GeneratedQueryTypes {
  "#graphql\n    query GetOrdersAfter($cursor: String){\n      orders(first: 40, after: $cursor, reverse: true) {\n        edges {\n            cursor\n            node {\n              id\n              name\n              currentTotalPriceSet {\n                shopMoney {\n                  amount\n                  currencyCode\n                }\n              }\n              customer {\n                displayName\n              }\n              shippingAddress {\n                address1\n                city\n                zip\n              }\n            }\n          }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n        }\n      }\n    }": {return: GetOrdersAfterQuery, variables: GetOrdersAfterQueryVariables},
  "#graphql\n    query GetOrdersBefore($cursor: String){\n      orders(last: 40, before: $cursor, reverse: true) {\n        edges {\n            cursor\n            node {\n              id\n              name\n              currentTotalPriceSet {\n                shopMoney {\n                  amount\n                  currencyCode\n                }\n              }\n              customer {\n                displayName\n              }\n              shippingAddress {\n                address1\n                city\n                zip\n              }\n            }\n          }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n        }\n      }\n    }": {return: GetOrdersBeforeQuery, variables: GetOrdersBeforeQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n      mutation populateProduct($product: ProductCreateInput!) {\n        productCreate(product: $product) {\n          product {\n            id\n            title\n            handle\n            status\n            variants(first: 10) {\n              edges {\n                node {\n                  id\n                  price\n                  barcode\n                  createdAt\n                }\n              }\n            }\n          }\n        }\n      }": {return: PopulateProductMutation, variables: PopulateProductMutationVariables},
  "#graphql\n    mutation shopifyRemixTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {\n      productVariantsBulkUpdate(productId: $productId, variants: $variants) {\n        productVariants {\n          id\n          price\n          barcode\n          createdAt\n        }\n      }\n    }": {return: ShopifyRemixTemplateUpdateVariantMutation, variables: ShopifyRemixTemplateUpdateVariantMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
