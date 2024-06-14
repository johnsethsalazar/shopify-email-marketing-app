import Test from "~/components/Test";

export const tabs = [
    {
        id: "all-customers",
        content: "All",
        panelID: "all-customers-content-one",
        component: <Test/>
    },
    {
        id: 'accepts-marketing-1',
        content: 'Ongoing',
        panelID: 'accepts-marketing-content-1',
      },
      {
        id: 'repeat-customers-1',
        content: 'Draft',
        panelID: 'repeat-customers-content-1',
      },
      {
        id: 'prospects-1',
        content: 'Completed',
        panelID: 'prospects-content-1',
      },
]