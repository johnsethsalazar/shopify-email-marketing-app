import { Button, InlineGrid, Layout, LegacyCard, Page, Tabs, Text } from '@shopify/polaris'
import React from 'react'

type Props = {}

const CampaignsPage = (props: Props) => {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <InlineGrid columns={2}>
            <Text variant='heading3xl' as='h2'>Campaigns</Text>
            <Button>Create New</Button>
          </InlineGrid>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default CampaignsPage