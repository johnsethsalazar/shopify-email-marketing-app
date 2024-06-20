import type { ActionFunction } from "@remix-run/node";
import { Form, useActionData, useSubmit } from "@remix-run/react";
import { Button } from "@shopify/polaris";
import React from "react";
import { MONTHLY_PLAN, authenticate } from "~/shopify.server";
import { action as subscriptionAction } from "~/routes/app.subscriptionBtn";
export { subscriptionAction }

type Props = {};

export const action: ActionFunction =async ({ request }) => {
    console.log('hitt')
   const { billing } = await authenticate.admin(request)

   const billingCheck = await billing.require({
    plans: [MONTHLY_PLAN],
    isTest: true,
    onFailure: async () => billing.request({
        plan: MONTHLY_PLAN,
        isTest: true
    })
   })

   const subscription = billingCheck.appSubscriptions[0]

   const cancelledSubscription = await billing.cancel({
    subscriptionId: subscription.id,
    isTest: true,
    prorate: true
   })

   console.log('cancelled subscription', cancelledSubscription)

   if(cancelledSubscription) {
    console.log('-------cancel subscription message-------')
    return cancelledSubscription
   }

   return null
}


const CancelBtn = (props: Props) => {

    const submit = useSubmit();
    const actionData = useActionData<typeof action>()
    console.log(actionData, 'actionData')
    const startSub = () => submit({}, { replace: true, method: 'POST'})
    
  return (
    <Form onSubmit={startSub} method="post" action="/app/cancelBtn">
     <Button submit onClick={startSub}>Cancel Subscription</Button>
   </Form>);
};

export default CancelBtn;