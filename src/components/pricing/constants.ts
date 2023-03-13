import AwsLogoIcon from '../icons/AwsLogoIcon'
import AzureLogoIcon from '../icons/AzureLogoIcon'
import GoogleCloudLogoIcon from '../icons/GoogleCloudLogoIcon'

export const providers = [
  {
    name: 'AWS',
    id: 'aws',
    icon: AwsLogoIcon,
    k8sPrice: 73,
    infraPrice: 15,
    appPrice: 3,
  },
  {
    name: 'GCP',
    id: 'gcp',
    icon: GoogleCloudLogoIcon,
    k8sPrice: 72,
    infraPrice: 15,
    appPrice: 3,
  },
  {
    name: 'Azure',
    id: 'azure',
    icon: AzureLogoIcon,
    k8sPrice: 89.71,
    infraPrice: 15,
    appPrice: 3,
  },
]
