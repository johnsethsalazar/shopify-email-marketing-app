import { Layout, Page } from '@shopify/polaris'
import React from 'react'
import SubscriptionBtn from './app.subscriptionBtn'

type Props = {}

const BillingsPage = (props: Props) => {
  return (
    <Page>
      <Layout.Section>
        <SubscriptionBtn />
      </Layout.Section>
    </Page>
  )
}

export default BillingsPage