import { ComponentType } from 'react'

import AwsLogoIcon from '../icons/AwsLogoIcon'
import AzureLogoIcon from '../icons/AzureLogoIcon'
import { IconProps } from '../icons/createIcon'
import GoogleCloudLogoIcon from '../icons/GoogleCloudLogoIcon'

export const APP_PRICE = 3 // TODO: Update.

type Provider = {
  name: string
  id: string
  icon: ComponentType<IconProps>
  k8sPrice: number
  infraPrice: number
}

export const PROVIDERS: Provider[] = [
  {
    name: 'AWS',
    id: 'aws',
    icon: AwsLogoIcon,
    k8sPrice: 73,
    infraPrice: 165,
  },
  {
    name: 'GCP',
    id: 'gcp',
    icon: GoogleCloudLogoIcon,
    k8sPrice: 73,
    infraPrice: 221,
  },
  {
    name: 'Azure',
    id: 'azure',
    icon: AzureLogoIcon,
    k8sPrice: 72,
    infraPrice: 147,
  },
]
