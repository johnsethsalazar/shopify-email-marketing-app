import { ActionFunction } from '@remix-run/node'
import { Form, useActionData, useSubmit } from '@remix-run/react'
import { Button } from '@shopify/polaris'
import React from 'react'
import { MONTHLY_PLAN, authenticate } from '~/shopify.server'

type Props = {}

export const action: ActionFunction = async ({ request }) => {
  const {billing} = await authenticate.admin(request)

  await billing.require({
    plans: [MONTHLY_PLAN],
    isTest: true, // Test - so no real charges
    onFailure: async () => billing.request({
      plans: [MONTHLY_PLAN],
      isTest: true,
    })
  })
}

const StartSubscription = (props: Props) => {
  const submit = useSubmit()
  const actionData = useActionData<typeof action>()
  console.log(actionData, 'Action Data')
  const startSub = () => {
    submit({}, { replace: true, method: 'POST' })
  }

  return (
    <Form onSubmit={startSub} method='post' action='/app/StartSubscription'>
      <Button>StartSubscription</Button>
    </Form>
  )
}

export default StartSubscription