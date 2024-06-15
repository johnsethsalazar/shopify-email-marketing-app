import { Form } from "@remix-run/react";
import {
  Button,
  Frame,
  Layout,
  Modal,
  Page,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";

type Props = {};

const CreateCampaignForm = (props: Props) => {
  const [activate, setActivate] = useState(true);

  const handleChange = useCallback(() => setActivate(!activate), [activate]);

  const activator = <Button onClick={handleChange}>Open</Button>;

  const [value, setValue] = useState("default");

  const handleChangeText = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

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
            onAction: () => {},
          }}
          secondaryActions={[
            {
              content: "Finish Later",
              onAction: () => {},
            },
          ]}
        >
          <Modal.Section>
            <Form>
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
