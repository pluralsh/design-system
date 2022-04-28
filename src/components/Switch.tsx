import { Switch as HonorableSwitch, SwitchProps as HonorableSwitchProps } from 'honorable'

import CheckIcon from './icons/CheckIcon'
import CloseIcon from './icons/CloseIcon'

type SwitchProps = HonorableSwitchProps

const propTypes = {}

function Switch(props: SwitchProps) {
  return (
    <HonorableSwitch
      backgroundColor={props.checked ? 'success' : 'error'}
      uncheckedBackground={(
        <CloseIcon
          size={12}
          mr={0.5}
        />
      )}
      checkedBackground={(
        <CheckIcon
          size={12}
          ml={0.5}
        />
      )}
      {...props}
    />
  )
}

Switch.propTypes = propTypes

export default Switch
