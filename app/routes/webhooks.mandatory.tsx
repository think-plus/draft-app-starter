import { authenticate } from "../shopify.server";
import type { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
    const { shop, topic, payload } = await authenticate.webhook(request);
    console.log(`Received ${topic} webhook for shop ${shop}`);
  
    switch (topic) {
      case "CUSTOMERS_DATA_REQUEST":
        return new Response();
      case "CUSTOMERS_REDACT":
        return new Response();
      case "SHOP_REDACT":
        return new Response();
      default:
        console.log(`Unhandled webhook topic: ${topic}`);
        return new Response();
    }
  };