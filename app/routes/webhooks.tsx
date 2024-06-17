import { json, type ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { Resend } from "resend";
import { render } from "@react-email/components";
import VercelInviteUserEmail from "~/emails/custom";

const resend = new Resend("re_5fC25nUy_JsYGJ5c19CgryygSmx7amVoY");
const emailHtml = render(<VercelInviteUserEmail />);

export const action = async ({ request }: ActionFunctionArgs) => {
  const { topic, shop, session, admin, payload } =
    await authenticate.webhook(request);

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
      }

      break;
    case "CUSTOMERS_CREATE":
      console.log("----hit customers webhook ---------");
      console.log(payload);

      const { data, error } = await resend.emails.send({
        from: "REMIX <onboarding@resend.dev>",
        to: ["hello.ohsolutions@gmail.com"],
        subject: "hello youtube",
        html: emailHtml,
      });

      if (error) {
        return json({ error }, 400);
      }
      console.log("----hit customers webhook ---------");

      return json({ data }, 200);

      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
