import { ComponentType } from 'react'

import AwsLogoIcon from '../icons/AwsLogoIcon'
import AzureLogoIcon from '../icons/AzureLogoIcon'
import { IconProps } from '../icons/createIcon'
import GoogleCloudLogoIcon from '../icons/GoogleCloudLogoIcon'

export const APP_PRICE = 10 // TODO: Update.
export const CLUSTER_PRICE = 399
export const USER_PRICE = 49

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

type ProviderCostEstimation = {
  total: number
  k8s: number
  infra: number
  app: number
}

export function estimateProviderCost(provider: Provider, apps: number): ProviderCostEstimation {
  if (!provider) {
    return {
      total: 0, k8s: 0, infra: 0, app: 0,
    }
  }

  const { k8sPrice = 0, infraPrice = 0 } = provider
  const k8s = Math.round(k8sPrice)
  const infra = Math.round(infraPrice)
  const app = Math.round(apps * APP_PRICE)

  return {
    total: k8s + infra + app,
    k8s,
    infra,
    app,
  }
}
