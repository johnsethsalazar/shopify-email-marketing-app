import { Layout, Page } from '@shopify/polaris'
import React from 'react'
import StartSubscription from './app.subscriptionButton'

type Props = {}

const BillingsPage = (props: Props) => {
  return (
    <Page>
      <Layout.Section>
        <StartSubscription />
      </Layout.Section>
    </Page>
  )
}

export default BillingsPage