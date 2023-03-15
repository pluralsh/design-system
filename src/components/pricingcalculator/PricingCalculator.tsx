import { forwardRef, useMemo, useState } from 'react'
import styled from 'styled-components'

import Callout from '../Callout'

import { APP_PRICE, PROVIDERS } from './constants'
import AppsSection from './sections/AppsSection'
import ProviderSection from './sections/ProviderSection'
import Cost from './Cost'

export type PricingCalculatorProps = {
  expandedDefault?: boolean
}

const PricingCalculatorWrap = styled.div(({ theme }) => ({
  ...theme.partials.text.body2,
  color: theme.colors['text-xlight'],

  p: {
    color: theme.colors['text-light'],
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

  '.costs': {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
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
            <ProviderSection
              header="Cloud provider"
              providerId={providerId}
              setProviderId={setProviderId}
            />
            <AppsSection
              header="Applications"
              apps={apps}
              setApps={setApps}
            />
          </div>
          <div className="column">
            <div className="section costs">
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
            </div>
            <div className="section total-cost">
              <div className="value">~${totalCost}</div>
              <div>per month to <span className="provider">{provider?.name}</span></div>
            </div>
          </div>
        </div>
      </PricingCalculatorWrap>
    </Callout>
  )
})

export default PricingCalculator
