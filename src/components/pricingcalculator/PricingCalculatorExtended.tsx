import { forwardRef, useMemo, useState } from 'react'
import styled from 'styled-components'

import { Switch } from 'honorable'

import Card from '../Card'
import Button from '../Button'

import {
  CLUSTER_PRICE,
  PROVIDERS,
  USER_PRICE,
  estimateProviderCost,
} from './misc'
import AppsControl from './controls/AppsControl'
import ProviderControl from './controls/ProvidersControl'
import Cost from './costs/Cost'
import UsersControl from './controls/UsersControl'
import ClustersControl from './controls/ClustersControl'
import Costs from './costs/Costs'
import TotalCost from './costs/TotalCost'

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
  const providerCost = useMemo(() => estimateProviderCost(provider, apps), [provider, apps])

  const {
    pluralCost, clusterCost, userCost,
  } = useMemo(() => {
    const pro = professional ? 1 : 0
    const clusterCost = clusters * CLUSTER_PRICE * pro
    const userCost = users * USER_PRICE * pro
    const pluralCost = clusterCost + userCost

    return {
      pluralCost, clusterCost, userCost,
    }
  }, [professional, clusters, users])

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
                cost={providerCost?.k8s}
                label={`${provider?.name} Kubernetes cost`}
                tooltip="Cost to deploy this provider's managed version of Kubernetes"
              />
              <Cost
                cost={providerCost?.infra}
                label={`${provider?.name} infrastructure price`}
                tooltip="Cost to provision and run standard instances on this provider"
              />
              <Cost
                cost={providerCost?.app}
                label="Application infrastructure"
                tooltip="Cost to deploy and run selected number of applications"
              />
            </Costs>
            <Costs
              header="Plural costs"
              marginTop={32}
            >
              <Cost
                cost={clusterCost}
                label={`for ${clusters} clusters`}
              />
              <Cost
                cost={userCost}
                label={`for ${users} users`}
              />
            </Costs>
            <TotalCost
              providerCost={providerCost?.total}
              provider={provider?.name}
              proPlan={professional}
              pluralCost={pluralCost}
            />
            <Button
              borderColor="transparent"
              background="linear-gradient(180deg, rgba(74, 81, 242, 0.85) 0%, #4A51F2 100%)"
              boxShadow="0px 2px 4px rgba(14, 16, 21, 0.14), 0px 2px 7px rgba(14, 16, 21, 0.18), inset 0px 0.5px 1px rgba(255, 255, 255, 0.15), inset 0px -1px 1px rgba(0, 0, 0, 0.25)"
              marginTop="xlarge" // TODO: What happens on click?
            >
              Get started
            </Button>
          </div>
        </div>
      </PricingCalculatorWrap>
    </Card>
  )
})

export default PricingCalculatorExtended
