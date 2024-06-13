import { Button, InlineGrid, Layout, LegacyCard, Page, Tabs, Text } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import Test from '~/components/Test'

type Props = {}

const CampaignsPage = (props: Props) => {
  const [selected, setSelected] = useState(0)

  const handleTabChange = useCallback((selectedTabIndex: number) => setSelected(selectedTabIndex), [])

  const tabs = [
    {
      id: 'all-customers',
      content: "All",
      panelID: "all-customers-content-one",
      component: <Test></Test>
    },
    
    {
      id: 'accepts-marketing-1',
      content: "Ongoing",
      panelID: "accepts-marketing-content-1",
    },
    
    {
      id: 'repeat-customers',
      content: "Draft",
      panelID: "repeat-customers-content-one"
    },
    
    {
      id: 'prospects-1',
      content: "Completed",
      panelID: "prospects-content-1"
    }
  ]
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <InlineGrid columns={2}>
            <Text variant='heading3xl' as='h2'>Campaigns</Text>
            <Button>Create New</Button>
          </InlineGrid>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              <LegacyCard.Section title={tabs[selected].content}>
                {tabs[selected].component}
              </LegacyCard.Section>
            </Tabs>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default CampaignsPage