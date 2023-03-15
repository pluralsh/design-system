import { forwardRef, useMemo, useState } from 'react'
import { Switch } from 'honorable'

import Card from '../Card'

import {
  PROVIDERS,
  PricingCalculatorWrap,
  estimatePluralCost,
  estimateProviderCost,
} from './misc'
import AppsControl from './controls/AppsControl'
import ProviderControl from './controls/ProvidersControl'
import Cost from './costs/Cost'
import UsersControl from './controls/UsersControl'
import ClustersControl from './controls/ClustersControl'
import Costs from './costs/Costs'
import TotalCost from './costs/TotalCost'

const PricingCalculatorExtended = forwardRef<HTMLDivElement>(() => {
  const [providerId, setProviderId] = useState(PROVIDERS[0].id)
  const [clusters, setClusters] = useState(3)
  const [apps, setApps] = useState(10)
  const [users, setUsers] = useState(10)
  const [professional, setProfessional] = useState(false)
  const provider = useMemo(() => PROVIDERS.find(({ id }) => id === providerId), [providerId])
  const providerCost = useMemo(() => estimateProviderCost(provider, apps), [provider, apps])
  const pluralCost = useMemo(() => estimatePluralCost(professional, clusters, users), [professional, clusters, users])

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
              marginTop={48}
            >
              <Cost
                cost={pluralCost?.clusters}
                label={`for ${clusters} clusters`}
              />
              <Cost
                cost={pluralCost?.users}
                label={`for ${users} users`}
              />
            </Costs>
            <TotalCost
              providerCost={providerCost?.total}
              provider={provider?.name}
              proPlan={professional}
              pluralCost={pluralCost?.total}
            />
          </div>
        </div>
      </PricingCalculatorWrap>
    </Card>
  )
})

export default PricingCalculatorExtended
