import {
  Div, Flex, FlexProps, Modal, P,
} from 'honorable'
import PropTypes from 'prop-types'
import { Ref, forwardRef } from 'react'

type ModalProps = FlexProps & {
  form?: boolean
  size?: 'medium' | 'large' | string
}

const propTypes = {
  form: PropTypes.bool,
  size: PropTypes.oneOf(['medium', 'large']),
}

const sizeToWidth: { [key in 'medium' | 'large']: number } = {
  medium: 480,
  large: 608,
}

function ModalRef({
  children,
  header,
  actions,
  form = false,
  open = false,
  size = form ? 'large' : 'medium',
  onClose,
  ...props
}: ModalProps,
ref: Ref<any>) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      form={form}
      ref={ref}
      fontSize={16}
      color="text"
      width={sizeToWidth[size]}
      maxWidth={sizeToWidth[size]}
      {...props}
    >
      <Div
        margin="large"
        marginBottom={actions ? 0 : 'large'}
      >
        {!!header && (
          <Flex
            ref={ref}
            align="center"
            justify="space-between"
            marginBottom="large"
          >
            <P
              overline
              color="text-xlight"
            >
              {header}
            </P>
            {/* {typeof onClose === 'function' && ( */}
            {/*  <Flex */}
            {/*    align="center" */}
            {/*    justify="center" */}
            {/*    padding="xsmall" */}
            {/*    margin={-12} */}
            {/*    borderRadius="medium" */}
            {/*    cursor="pointer" */}
            {/*    _hover={{ backgroundColor: 'fill-two-hover' }} */}
            {/*    onClick={onClose} */}
            {/*  > */}
            {/*     <CloseIcon */}
            {/*      size={14} */}
            {/*      color="text-light" */}
            {/*     /> */}
            {/*  </Flex> */}
            {/* )} */}
          </Flex>
        )}
        {children}
      </Div>
      {!!actions && (
        <Flex
          position="sticky"
          direction="column"
          bottom="0"
        >
          <Flex
            background="linear-gradient(180deg, transparent 0%, fill-one 100%);"
            height={16}
          />
          <Flex
            padding="large"
            align="center"
            justify="flex-end"
            backgroundColor="fill-one"
          >
            {actions}
          </Flex>
        </Flex>
      )}
    </Modal>
  )
}

const ModalProps = forwardRef(ModalRef)

ModalProps.propTypes = propTypes

export default ModalProps
