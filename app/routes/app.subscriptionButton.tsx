import { ActionFunction } from '@remix-run/node'
import { Form, useActionData, useSubmit } from '@remix-run/react'
import { Button } from '@shopify/polaris'
import React from 'react'

type Props = {}

export const action: ActionFunction = async ({ request }) => {
  
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