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
import { json, useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const response = await admin.graphql(`#graphql
    query {
      orders(first: 20, reverse: true) {
        nodes {
          id
          name
          email
          customer {
            displayName
          }
          currentSubtotalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }
          shippingAddress {
            formatted
            address1
            city
            zip
          }
        }
      }
    }`);

  const { data } = await response.json();
  return json({ orders: data!.orders!.nodes });
};

export default function AdditionalPage() {
  const data = useLoaderData<typeof loader>();

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(data.orders);

  return (
    <Page>
      <TitleBar title="Additional page" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd">
                The app template comes with an additional page which
                demonstrates how to create multiple pages within app navigation
                using{" "}
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
            <BlockStack gap="300">
              <IndexTable
                resourceName={{ singular: "order", plural: "orders" }}
                itemCount={data.orders.length}
                selectedItemsCount={
                  allResourcesSelected ? "All" : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                headings={[
                  { title: "Order" },
                  { title: "Customer" },
                  { title: "Order Total" },
                  { title: "Shipping Address" },
                ]}
              >
                {data.orders.map((order: any, index: number) => (
                  <IndexTable.Row
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
                      {order.customer.displayName}
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                      {order.currentSubtotalPriceSet.shopMoney.amount}{" "}
                      {order.currentSubtotalPriceSet.shopMoney.currencyCode}
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                      {order.shippingAddress.address1}{" "}
                      {order.shippingAddress.city}, {order.shippingAddress.zip}
                    </IndexTable.Cell>
                  </IndexTable.Row>
                ))}
              </IndexTable>
            </BlockStack>
          </Card>
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
