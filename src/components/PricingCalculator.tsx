import { useFocusRing } from '@react-aria/focus'
import { AriaRadioProps, useRadio } from '@react-aria/radio'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import {
  ReactElement,
  cloneElement,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'

import Callout from './Callout'
import AwsLogoIcon from './icons/AwsLogoIcon'
import AzureLogoIcon from './icons/AzureLogoIcon'
import GoogleCloudLogoIcon from './icons/GoogleCloudLogoIcon'
import InfoOutlineIcon from './icons/InfoOutlineIcon'
import { RadioContext } from './RadioGroup'
import Slider from './Slider'

type SelectItemWrapProps = {
  selected?: boolean
  width?: number | string
}

const SelectItemWrap = styled.label<SelectItemWrapProps>(({ theme, selected = false, width }) => ({
  ...theme.partials.text.buttonSmall,
  display: 'flex',
  height: 32,
  width,
  padding: '4px 12px',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: selected
    ? theme.colors['fill-two-selected']
    : 'transparent',
  border: theme.borders.default,
  borderColor: selected
    ? theme.colors['border-selected']
    : theme.colors['border-input'],
  borderRadius: theme.borderRadiuses.medium,
  color: selected ? theme.colors.text : theme.colors['text-light'],
  cursor: 'pointer',
  '&:focus,&:focus-visible': { ...theme.partials.focus.button },
  '&:hover': { backgroundColor: theme.colors['action-input-hover'] },
  '.label': { marginLeft: theme.spacing.small },
}))

type SelectItemProps = AriaRadioProps & {
  icon: ReactElement
  label?: string
  selected?: boolean

  defaultSelected?: boolean
  checked?: boolean
  name?: string
  onChange?: (e: { target: { checked: boolean } }) => any
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(({
  icon,
  label,
  value,
  checked: checkedProp,
  defaultSelected,
  'aria-describedby': ariaDescribedBy,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  name,
}) => {
  const [checked, setChecked] = useState(defaultSelected || checkedProp)
  const state = useContext(RadioContext) || {
    setSelectedValue: () => {},
    selectedValue: checkedProp || checked ? value : undefined,
  }

  useEffect(() => {
    setChecked(checkedProp)
  }, [checkedProp])

  const labelId = useId()
  const inputRef = useRef<any>()
  const { isFocusVisible, focusProps } = useFocusRing()
  const { inputProps, isSelected } = useRadio({
    value,
    'aria-describedby': ariaDescribedBy,
    'aria-labelledby': labelId,
    onBlur,
    onFocus,
    onKeyDown,
    onKeyUp,
  },
  state,
  inputRef)

  icon = cloneElement(icon, { size: 16 })

  return (
    <SelectItemWrap selected={checked}>
      {icon}
      {label && <div className="label">{label}</div>}
      <VisuallyHidden>
        <input
          {...inputProps}
          {...focusProps}
          name={inputProps.name || name}
          onChange={e => {
            if (typeof onChange === 'function') {
              onChange(e)
            }
            setChecked(!checked)
            inputProps.onChange(e)
          }}
          ref={inputRef}
        />
      </VisuallyHidden>
    </SelectItemWrap>
  )
})

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
    gap: theme.spacing.xxlarge,

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
        marginRight: theme.spacing.xxsmall,
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

const providers = [
  {
    name: 'AWS',
    id: 'aws',
    icon: <AwsLogoIcon fullColor />,
    k8sCost: 73,
    infraPrice: 15,
    appPrice: 3,
  },
  {
    name: 'GCP',
    id: 'gcp',
    icon: <GoogleCloudLogoIcon fullColor />,
    k8sCost: 72,
    infraPrice: 15,
    appPrice: 3,
  },
  {
    name: 'Azure',
    id: 'azure',
    icon: <AzureLogoIcon fullColor />,
    k8sCost: 89.71,
    infraPrice: 15,
    appPrice: 3,
  },
]

const PricingCalculator = forwardRef<HTMLDivElement, PricingCalculatorProps>(({ expandedDefault = false }, ref) => {
  const [expanded, setExpanded] = useState(expandedDefault)
  const [providerId, setProviderId] = useState(providers[0].id)
  const provider = useMemo(() => providers.find(({ id }) => id === providerId), [providerId])
  const totalCost = useMemo(() => provider?.k8sCost, [provider])

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
                    icon={icon}
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
                label="Applications"
                defaultValue={10}
                minValue={1}
                maxValue={25}
              />
            </div>
          </div>
          <div className="column">
            <div className="section costs">
              <div className="cost">
                <div className="value">$12</div>
                <div>{provider?.name} Kubernetes cost</div>
                <InfoOutlineIcon />
              </div>
              <div className="cost">
                <div className="value">$12</div>
                <div>{provider?.name} infrastructure price</div>
                <InfoOutlineIcon />
              </div>
              <div className="cost">
                <div className="value">$12</div>
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
