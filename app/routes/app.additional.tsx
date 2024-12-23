import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  IndexTable,
  useIndexResourceState,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "app/shopify.server";
import { json, useFetcher, useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const direction = url.searchParams.get("direction");
  const cursor = url.searchParams.get("cursor");
  const { admin } = await authenticate.admin(request);

  const afterQuery = `#graphql
    query GetOrdersAfter($cursor: String){
      orders(first: 40, after: $cursor, reverse: true) {
        edges {
            cursor
            node {
              id
              name
              currentTotalPriceSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              customer {
                displayName
              }
              shippingAddress {
                address1
                city
                zip
              }
            }
          }
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
      }
    }`;
  const beforeQuery = `#graphql
    query GetOrdersBefore($cursor: String){
      orders(last: 40, before: $cursor, reverse: true) {
        edges {
            cursor
            node {
              id
              name
              currentTotalPriceSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              customer {
                displayName
              }
              shippingAddress {
                address1
                city
                zip
              }
            }
          }
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
      }
    }`;

  const response = await admin.graphql(
    direction === "prev" ? beforeQuery : afterQuery,
    { variables: { cursor } },
  );

  const { data } = await response.json();

  return json({
    orders: data!.orders.edges.map((edge) => ({
      cursor: edge.cursor,
      ...edge.node,
    })),
    pageInfo: data!.orders.pageInfo,
  });
};

export default function OrderList() {
  const initialData = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof loader>();

  const isLoading = fetcher.state === "loading";

  const data = fetcher.data || initialData;

  const fetchPage = (cursor: string, direction: string) => {
    fetcher.load(`?cursor=${cursor}&direction=${direction}`);
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(data.orders);

  const { hasNextPage, hasPreviousPage, endCursor, startCursor } =
    data.pageInfo;

  return (
    <Page>
      <TitleBar title="Order List" />
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <Card>
              <BlockStack gap="300">
                <Text as="p" variant="bodyMd">
                  The app template comes with an additional page which
                  demonstrates how to create multiple pages within app
                  navigation using{" "}
                  <Link
                    url="https://shopify.dev/docs/apps/tools/app-bridge"
                    target="_blank"
                    removeUnderline
                  >
                    App Bridge
                  </Link>
                  .
                </Text>
                <Text as="p" variant="bodyMd">
                  To create your own page and have it show up in the app
                  navigation, add a page inside <Code>app/routes</Code>, and a
                  link to it in the <Code>&lt;NavMenu&gt;</Code> component found
                  in <Code>app/routes/app.jsx</Code>.
                </Text>
              </BlockStack>
            </Card>
            <Card>
              <IndexTable
                loading={isLoading}
                pagination={{
                  hasNext: hasNextPage,
                  hasPrevious: hasPreviousPage,
                  onNext: () => {
                    if (hasNextPage && endCursor) {
                      fetchPage(endCursor, "next");
                    }
                  },
                  onPrevious: () => {
                    if (hasPreviousPage && startCursor) {
                      fetchPage(startCursor, "prev");
                    }
                  },
                }}
                resourceName={{ singular: "order", plural: "orders" }}
                itemCount={data.orders.length}
                selectedItemsCount={
                  allResourcesSelected ? "All" : selectedResources.length
                }
                selectable={!isLoading}
                onSelectionChange={handleSelectionChange}
                headings={[
                  { title: "Order" },
                  { title: "Customer" },
                  { title: "Order Total" },
                  { title: "Shipping Address" },
                ]}
              >
                {data.orders.map((order, index: number) => (
                  <IndexTable.Row
                    disabled={isLoading}
                    selected={selectedResources.includes(order.id)}
                    key={order.id}
                    id={order.id}
                    position={index}
                  >
                    <IndexTable.Cell>
                      <Text variant="bodyMd" fontWeight="bold" as="span">
                        {order.name}
                      </Text>
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                      {order.customer?.displayName}
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                      {order.currentTotalPriceSet.shopMoney.amount}{" "}
                      {order.currentTotalPriceSet.shopMoney.currencyCode}
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                      {order.shippingAddress?.address1}{" "}
                      {order.shippingAddress?.city},{" "}
                      {order.shippingAddress?.zip}
                    </IndexTable.Cell>
                  </IndexTable.Row>
                ))}
              </IndexTable>
            </Card>
          </BlockStack>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Resources
              </Text>
              <List>
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                    removeUnderline
                  >
                    App nav best practices
                  </Link>
                </List.Item>
              </List>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
