import {
  createElement,
  forwardRef,
  useMemo,
  useState,
} from 'react'
import styled from 'styled-components'

import Callout from '../Callout'
import InfoOutlineIcon from '../icons/InfoOutlineIcon'
import Slider from '../Slider'

import { providers } from './constants'
import { SelectItem } from './SelectItem'

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

      '.section': {
        marginTop: theme.spacing.xlarge,

        '.header': {
          ...theme.partials.text.body2Bold,
          color: theme.colors.text,
          marginBottom: theme.spacing.medium,
        },
      },
    },
  },

  '.providers': {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing.small,
  },

  '.costs': {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',

    '.cost': {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      flexShrink: 1,
      gap: theme.spacing.xsmall,
      alignItems: 'center',

      '.value': {
        ...theme.partials.text.subtitle2,
        color: theme.colors.text,
        minWidth: 36,
        marginRight: theme.spacing.xxxsmall,
      },
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
}))

const PricingCalculator = forwardRef<HTMLDivElement, PricingCalculatorProps>(({ expandedDefault = false }, ref) => {
  const [expanded, setExpanded] = useState(expandedDefault)
  const [providerId, setProviderId] = useState(providers[0].id)
  const [apps, setApps] = useState(10)
  const provider = useMemo(() => providers.find(({ id }) => id === providerId), [providerId])
  const {
    totalCost, k8sCost, appCost, infraCost,
  } = useMemo(() => {
    if (!provider) {
      return {
        totalCost: 0, k8sCost: 0, appCost: 0, infraCost: 0,
      }
    }

    const { k8sPrice = 0, infraPrice = 0, appPrice = 0 } = provider
    const k8sCost = Math.round(k8sPrice)
    const appCost = Math.round(appPrice * apps)
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
            <div className="section">
              <div className="header">Cloud provider</div>
              <div className="providers">
                {providers.map(({ id, name, icon }) => (
                  <SelectItem
                    label={name}
                    icon={createElement(icon, { fullColor: true })}
                    value={id}
                    checked={providerId === id}
                    onChange={({ target: { checked } }: any) => {
                      if (checked) setProviderId(id)
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="section">
              <div className="header">Applications</div>
              <Slider
                defaultValue={apps}
                minValue={1}
                maxValue={25}
                onChange={v => setApps(v)}
              />
            </div>
          </div>
          <div className="column">
            <div className="section costs">
              <div className="cost">
                <div className="value">${k8sCost}</div>
                <div>{provider?.name} Kubernetes cost</div>
                <InfoOutlineIcon />
              </div>
              <div className="cost">
                <div className="value">${infraCost}</div>
                <div>{provider?.name} infrastructure price</div>
                <InfoOutlineIcon />
              </div>
              <div className="cost">
                <div className="value">${appCost}</div>
                <div>Application infrastructure</div>
                <InfoOutlineIcon />
              </div>
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
