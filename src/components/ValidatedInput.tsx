import {
  PropsWithChildren,
  ReactNode,
  Ref,
  forwardRef,
  useCallback,
  useState,
  createElement,
  ReactElement,
} from 'react'
import PropTypes from 'prop-types'
import { Input, InputProps, Span } from 'honorable'

import FormField from './FormField'

export type ValidationResponse = {error: boolean, message: string} | null
export type CaptionProps = {caption: string, color: string}

export type ValidatedInputProps = InputProps & PropsWithChildren<{
  label?: ReactNode
  hint?: ReactNode
  caption?: (props: CaptionProps) => ReactElement
  validation?: (val: string) => ValidationResponse
}>

const propTypes = {
  label: PropTypes.node,
  hint: PropTypes.node,
  caption: PropTypes.func,
  validation: PropTypes.func,
}

function defaultCaption({ caption, color }: CaptionProps) : ReactElement {
  return (
    <Span color={color}>{caption}</Span>
  )
}

function ValidatedInputRef({
  label, hint, validation, onChange, width, caption, ...input
} : ValidatedInputProps, ref: Ref<any>) {
  const [error, setError] = useState(null)
  const wrappedOnChange = useCallback((e: any) => {
    if (onChange) onChange(e)
    setError((validation && e.target?.value) ? validation(e.target.value) : undefined)
  }, [onChange, validation])

  const captionComp = caption || defaultCaption

  return (
    <FormField
      ref={ref}
      label={label}
      hint={hint}
      caption={error ? createElement(captionComp, { caption: error.message, color: error.error ? 'text-danger' : 'text-success' }) : null}
      width={width}
    >
      <Input
        onChange={wrappedOnChange}
        width="100%"
        {...input}
        error={error?.error}
        valid={error ? !error.error : null}
      />
    </FormField>
  )
}

const ValidatedInput = forwardRef(ValidatedInputRef)

ValidatedInput.propTypes = propTypes

export default ValidatedInput
