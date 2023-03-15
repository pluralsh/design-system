import { forwardRef, useMemo, useState } from 'react'
import styled from 'styled-components'

import Callout from '../Callout'

import { APP_PRICE, PROVIDERS } from './constants'
import AppsControl from './controls/AppsControl'
import ProviderControl from './controls/ProvidersControl'
import Cost from './costs/Cost'
import Costs from './costs/Costs'
import TotalCost from './costs/TotalCost'

export type PricingCalculatorProps = {
  expandedDefault?: boolean
}

const PricingCalculatorWrap = styled.div(({ theme }) => ({
  ...theme.partials.text.body2,
  color: theme.colors['text-xlight'],

  p: {
    color: theme.colors['text-light'],
    marginBottom: theme.spacing.xlarge,
  },

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
    },
  },
}))

const PricingCalculator = forwardRef<HTMLDivElement, PricingCalculatorProps>(({ expandedDefault = false }, ref) => {
  const [expanded, setExpanded] = useState(expandedDefault)
  const [providerId, setProviderId] = useState(PROVIDERS[0].id)
  const [apps, setApps] = useState(10)

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
    <Callout
      expandable
      expanded={expanded}
      onExpand={setExpanded}
      ref={ref}
      title="Estimate your cloud cost."
    >
      <PricingCalculatorWrap>
        <p>
          Estimate your cloud cost to get started with Plural open-source.
        </p>
        <div className="content">
          <div className="column">
            <ProviderControl
              header="Cloud provider"
              providerId={providerId}
              setProviderId={setProviderId}
            />
            <AppsControl
              header="Applications"
              apps={apps}
              setApps={setApps}
            />
          </div>
          <div className="column">
            <Costs>
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
            <TotalCost
              providerCost={totalCost}
              provider={provider?.name}
            />
          </div>
        </div>
      </PricingCalculatorWrap>
    </Callout>
  )
})

export default PricingCalculator
