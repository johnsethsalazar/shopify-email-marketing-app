import { render } from "@react-email/components";
import { ActionFunction } from "@remix-run/node";
import { Form, json, useActionData, useSubmit } from "@remix-run/react";
import {
  Button,
  Frame,
  Layout,
  Modal,
  Page,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { Resend } from "resend";
import { EmailNew } from "~/emails/new";

const resend = new Resend('re_5fC25nUy_JsYGJ5c19CgryygSmx7amVoY');

const emailHtml = render(<EmailNew url={''} />)

type CreateCampaignFormProps = {
  activate: boolean;
  setActivate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const action: ActionFunction = async ({ request }) => {
  console.log('hit')

  const {data, error} = await resend.emails.send({
    from: 'REMIX <onboarding@resend.dev>',
    to: ['hello.ohsolutions@gmail.com'],
    subject: 'Hello from Resend',
    html: emailHtml,
  })

  if(error) {
    return json({error}, 400)
  }

  return json({data}, 200)
};

const CreateCampaignForm:React.FC<CreateCampaignFormProps> = ({activate, setActivate}) => {

  const handleChange = useCallback(() => setActivate(!activate), [activate, setActivate]);

  const activator = <Button onClick={handleChange}>Create New</Button>;

  const [value, setValue] = useState("default");

  const handleChangeText = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  const submit = useSubmit ();
  const actionData = useActionData<typeof action>()
  const sendEmails = () => submit({}, {replace: true, method: 'POST'})

  console.log(actionData, 'createCampaignForm')

  return (
    <Page>
      <Frame>
        <Modal
          activator={activator}
          open={activate}
          onClose={handleChange}
          title="Create New Email Campaign"
          primaryAction={{
            content: "Send",
            onAction: sendEmails,
          }}
          secondaryActions={[
            {
              content: "Finish Later",
              onAction: () => {},
            },
          ]}
        >
          <Modal.Section>
            <Form onSubmit={sendEmails} method="post" action="/app/createCampaignForm">
              <Layout>
                <Layout.Section>
                  <TextField
                    label="Campaign Name"
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
                  <br />
                  <Button submit>Send</Button>
                </Layout.Section>
              </Layout>
            </Form>
          </Modal.Section>
        </Modal>
      </Frame>
    </Page>
  );
};

export default CreateCampaignForm;
