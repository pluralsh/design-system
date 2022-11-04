import { Radio as HonorableRadio } from 'honorable'

// Imported into Honorable theme in theme.tsx
export const RadioHonorableStyles = {
  Root: [
    {
      padding: 8,
      color: 'action-link-inactive',
      '> span': {
        border: '1px solid border-input',
      },
      '& *': {
        fill: 'action-primary',
      },
      ':hover': {
        color: 'text',
        '> span': {
          backgroundColor: 'action-input-hover',
          border: '1px solid border-input',
        },
        '& *': {
          fill: 'action-primary-hover',
        },
      },
      ':focus': {
        color: 'text',
        '> span': {
          backgroundColor: 'action-input-hover',
          border: '1px solid border-outline-focused',
        },
      },
    },
    ({ checked }: any) => checked && {
      color: 'text',
      '> span': {
        border: '1px solid text',
      },
      ':hover': {
        '> span': {
          border: '1px solid text',
        },
      },
    },
    ({ small }: any) => small && {
      '> span': {
        borderWidth: '.75px',
      },
    },
  ],
  Control: [
    {
      width: 24,
      height: 24,
      borderRadius: '50%',
    },
    ({ small }: any) => small && {
      width: 16,
      height: 16,
    },
  ],
}

function Radio(props: any) {
  return (
    <HonorableRadio
      iconChecked={(
        <svg
          width={props.small ? '71%' : '74%'} // Not 75% to fix alignment in flex
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="16"
            height="16"
            rx="8"
            fill="currentColor"
          />
        </svg>
      )}
      iconUnchecked={null}
      {...props}
    />
  )
}

export default Radio
