// config shim
import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'py4f1t1q',
    dataset: 'production'
  },
  deployment: {
    autoUpdates: true,
  },
})
