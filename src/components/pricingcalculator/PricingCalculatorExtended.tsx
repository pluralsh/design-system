import { forwardRef, useMemo, useState } from 'react'
import styled from 'styled-components'

import { Switch } from 'honorable'

import Card from '../Card'

import { APP_PRICE, PROVIDERS } from './constants'
import AppsControl from './controls/AppsControl'
import ProviderControl from './controls/ProvidersControl'
import Cost from './costs/Cost'
import UsersControl from './controls/UsersControl'
import ClustersControl from './controls/ClustersControl'
import Costs from './costs/Costs'

const PricingCalculatorWrap = styled.div(({ theme }) => ({
  ...theme.partials.text.body2,
  color: theme.colors['text-xlight'],

  '.content': {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 1,
    gap: theme.spacing.xxxlarge,

    '.column': {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: '100%',
    },
  },

  '.total-cost': {
    '.value': {
      ...theme.partials.text.title1,
      color: theme.colors['text-warning-light'],
      marginRight: theme.spacing.xxsmall,
    },

    '.provider': {
      ...theme.partials.text.body2Bold,
      color: theme.colors.text,
    },
  },

  '.hint': {
    ...theme.partials.text.caption,
    color: theme.colors['text-xlight'],
    marginBottom: theme.spacing.medium,
    fontStyle: 'italic',
  },
}))

const PricingCalculatorExtended = forwardRef<HTMLDivElement>(() => {
  const [providerId, setProviderId] = useState(PROVIDERS[0].id)
  const [clusters, setClusters] = useState(3)
  const [apps, setApps] = useState(10)
  const [users, setUsers] = useState(10)
  const [professional, setProfessional] = useState(false)

  const provider = useMemo(() => PROVIDERS.find(({ id }) => id === providerId), [providerId])

  const {
    totalCost, k8sCost, appCost, infraCost,
  } = useMemo(() => {
    if (!provider) {
      return {
        totalCost: 0, k8sCost: 0, appCost: 0, infraCost: 0,
      }
    }

    const { k8sPrice = 0, infraPrice = 0 } = provider
    const k8sCost = Math.round(k8sPrice)
    const appCost = Math.round(apps * APP_PRICE)
    const infraCost = Math.round(infraPrice)
    const totalCost = k8sCost + appCost + infraCost

    return {
      totalCost, k8sCost, appCost, infraCost,
    }
  }, [provider, apps])

  return (
    <Card padding="xlarge">
      <PricingCalculatorWrap>
        <div className="content">
          <div className="column">
            <ProviderControl
              header="What cloud provider will you use?"
              providerId={providerId}
              setProviderId={setProviderId}
            />
            <ClustersControl
              clusters={clusters}
              setClusters={setClusters}
            />
            <AppsControl
              header="How many applications do you plan to install?"
              caption="We use $10/month as the estimated cost of running each application, but this varies widely."
              apps={apps}
              setApps={setApps}
            />
            <UsersControl
              users={users}
              setUsers={setUsers}
            />
            <div className="hint">
              *Accounts requiring {'>'}6 clusters or {'>'}60 users should reach out
              to discuss our Enterprise option to optimize plan costs to your specific needs.
            </div>
          </div>
          <div className="column">
            <Switch
              defaultValue={professional}
              onChange={({ target: { checked } }) => setProfessional(checked)}
              marginBottom="xlarge"
            >
              Professional plan
            </Switch>
            <Costs header="Cloud costs">
              <Cost
                cost={k8sCost}
                label={`${provider?.name} Kubernetes cost`}
                tooltip="Cost to deploy this provider's managed version of Kubernetes"
              />
              <Cost
                cost={infraCost}
                label={`${provider?.name} infrastructure price`}
                tooltip="Cost to provision and run standard instances on this provider"
              />
              <Cost
                cost={appCost}
                label="Application infrastructure"
                tooltip="Cost to deploy and run selected number of applications"
              />
            </Costs>
            <Costs header="Plural costs">
              <Cost
                cost={k8sCost}
                label={`for ${clusters} clusters`}
              />
              <Cost
                cost={infraCost}
                label={`for ${users} users`}
              />
            </Costs>
            <div className="section total-cost">
              <div className="value">~${totalCost}</div>
              <div>per month to <span className="provider">{provider?.name}</span></div>
            </div>
          </div>
        </div>
      </PricingCalculatorWrap>
    </Card>
  )
})

export default PricingCalculatorExtended
