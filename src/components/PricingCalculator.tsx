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
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'

import Callout from './Callout'
import AwsLogoIcon from './icons/AwsLogoIcon'
import GoogleCloudLogoIcon from './icons/GoogleCloudLogoIcon'
import InfoIcon from './icons/InfoIcon'
import { RadioContext } from './RadioGroup'

type SelectItemWrapProps = {
  selected?: boolean;
  width?: number | string;
};

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
  icon: ReactElement;
  label?: string;
  selected?: boolean;

  defaultSelected?: boolean;
  checked?: boolean;
  name?: string;
  onChange?: (e: { target: { checked: boolean } }) => any;
};

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
  expandedDefault?: boolean;
}

const PricingCalculatorWrap = styled.div(({ theme }) => ({
  h1: {
    ...theme.partials.text.body2Bold,
    color: theme.colors.text,
  },
  '.providers': {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing.small,
  },
}))

const providers = [
  {
    label: 'AWS',
    value: 'aws',
    icon: <AwsLogoIcon fullColor />,
  },
  { label: 'GCP', value: 'gcp', icon: <GoogleCloudLogoIcon fullColor /> },
  { label: 'Azure', value: 'azure', icon: <GoogleCloudLogoIcon fullColor /> },
]

const PricingCalculator = forwardRef<HTMLDivElement, PricingCalculatorProps>(({ expandedDefault = false }, ref) => {
  const [expanded, setExpanded] = useState(expandedDefault)
  const [provider, setProvider] = useState(providers[0].value)

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
        <section>
          <h1>Cloud provider</h1>
          <div className="providers">
            {providers.map(({ value, label, icon }) => (
              <SelectItem
                label={label}
                icon={icon}
                value={value}
                checked={provider === value}
                onChange={({ target: { checked } }: any) => {
                  if (checked) setProvider(value)
                }}
              />
            ))}
          </div>
        </section>
        <section>
          <h1>Applications</h1>
        </section>
        <section>
          <div>
            <div>$12</div>
            <div>AWS Kubernetes cost</div>
            <InfoIcon />
          </div>
          <div>
            <div>$12</div>
            <div>AWS infrastructure price</div>
            <InfoIcon />
          </div>
          <div>
            <div>$12</div>
            <div>Application infrastructure</div>
            <InfoIcon />
          </div>
        </section>
      </PricingCalculatorWrap>
    </Callout>
  )
})

export default PricingCalculator
