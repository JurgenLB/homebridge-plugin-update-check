import { describe, expect, it } from 'vitest'

import { migratePlatformAliasInPluginConfigs } from './configMigration.js'

describe('config migration', () => {
  it('should migrate legacy platform alias in plugin config entries', () => {
    const pluginConfigs: Array<Record<string, unknown>> = [
      { platform: 'PluginUpdate', name: 'Legacy Updater' },
      { platform: 'OtherPlugin', name: 'Other' },
    ]

    const updated = migratePlatformAliasInPluginConfigs(pluginConfigs)

    expect(updated).toBe(1)
    expect(pluginConfigs[0].platform).toBe('HomebridgeUpdater')
    expect(pluginConfigs[1].platform).toBe('OtherPlugin')
  })

  it('should keep entries unchanged when no legacy alias exists', () => {
    const pluginConfigs: Array<Record<string, unknown>> = [
      { platform: 'HomebridgeUpdater', name: 'Updater' },
    ]

    const updated = migratePlatformAliasInPluginConfigs(pluginConfigs)

    expect(updated).toBe(0)
    expect(pluginConfigs[0].platform).toBe('HomebridgeUpdater')
  })
})
