import { Layout, Page } from '@shopify/polaris'
import React from 'react'
import SubscriptionBtn from './app.subscriptionBtn'
import CancelBtn from './app.cancelBtn'

type Props = {}

const BillingsPage = (props: Props) => {
  return (
    <Page>
      <Layout.Section>
        <SubscriptionBtn />
        <CancelBtn />
      </Layout.Section>
    </Page>
  )
}

export default BillingsPage