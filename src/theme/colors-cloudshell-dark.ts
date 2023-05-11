import { type CSSProperties } from 'styled-components'

export const colorsCloudShellDark = {
  [`cloud-shell-mid-grey`]: '#C5C9D3',
  [`cloud-shell-dark-grey`]: '#747B8B',
  [`cloud-shell-dark-red`]: '#F2788D',
  [`cloud-shell-light-red`]: '#F599A8',
  [`cloud-shell-green`]: '#3CECAF',
  [`cloud-shell-dark-yellow`]: '#3CECAF',
  [`cloud-shell-light-yellow`]: '#FFF9C2',
  [`cloud-shell-blue`]: '#8FD6FF',
  [`cloud-shell-dark-lilac`]: '#BE5EEB',
  [`cloud-shell-light-lilac`]: '#D596F4',
  [`cloud-shell-dark-purple`]: '#7075F5',
  [`cloud-shell-light-purple`]: '#969AF8',
  [`cloud-shell-light-grey`]: '#969AF8',
} as const satisfies Record<string, CSSProperties['color']>
