import { ActionFunction, json } from "@remix-run/node";
import { Form, useActionData, useSubmit } from "@remix-run/react";
import { Button, Layout, Page, TextField } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import VercelInviteUserEmail from "~/emails/custom";
import { authenticate } from "~/shopify.server";

type Props = {};

//Send email when new user is created

// 1. Setup Webhook
// 2. Create Automation

export const action: ActionFunction = async ({ request }) => {
  // Trigger Webhook
  const { admin, session } = await authenticate.admin(request);
  // const { shop, accessToken } = session;
  // console.log(shop, accessToken, "----shop and access token----");
  // const webhook = new admin.rest.resources.Webhook({ session: session });

  // if (webhook) {
  //   console.log(webhook, "-----webhook hit create user-----");

  //   webhook.address = "pubsub://projectName:topicName";
  //   webhook.topic = "customers/create";
  //   webhook.format = "json";

  //   console.log(webhook, "-----webhook hit create user-----");
  //   await webhook.save();
  // }

  // return null;

  const res = await admin.rest.resources.Webhook.delete({
    session: session,
    id: ''// ID from the console that is shown when clicking the send button in the automations tab
  })

  if(res){
    console.log('deleted webhook')
    return json({res}, 200)
  }
  return null
};

const AutomationsPage = (props: Props) => {
  const [value, setValue] = useState("default");

  const handleChangeText = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );
  const submit = useSubmit();
  const actionData = useActionData<typeof action>();
  console.log(actionData, "createCampaignForm");
  const sendAutomation = () => submit({}, { replace: true, method: "POST" });
  return (
    <Page>
      <Form onSubmit={sendAutomation} method="post" action="/app/automations">
        <h1>CREATE AUTOMATION (AUTOMATIC EMAIL SEND AFTER USER SIGN UP)</h1>
        <Layout>
          <Layout.Section>
            <TextField
              label="Automation Name"
              value={value}
              onChange={handleChangeText}
              autoComplete="off"
            />
            <TextField
              label="To"
              value={value}
              onChange={handleChangeText}
              autoComplete="off"
            />
            <TextField
              label="Corporation"
              value={value}
              onChange={handleChangeText}
              autoComplete="off"
            />
            <TextField
              label="From"
              value={value}
              onChange={handleChangeText}
              autoComplete="off"
            />
            <TextField
              label="Email Subject"
              value={value}
              onChange={handleChangeText}
              autoComplete="off"
            />
            <TextField
              label="Content"
              value={value}
              onChange={handleChangeText}
              autoComplete="off"
            />
            <Button submit>send</Button>
          </Layout.Section>
          <Layout.Section>
            <VercelInviteUserEmail />
          </Layout.Section>
        </Layout>
      </Form>
    </Page>
  );
};

export default AutomationsPage;
