import type { PluginUpdatePlatformConfig } from './configTypes.js'

import { describe, expect, it } from 'vitest'

describe('pluginUpdatePlatformConfig', () => {
  it('should allow valid platform name and identifier', () => {
    const config: PluginUpdatePlatformConfig = {
      name: 'Example Platform',
      platform: 'ExamplePlatform',
    }
    expect(config.name).toBe('Example Platform')
    expect(config.platform).toBe('ExamplePlatform')
  })

  it('should allow optional sensorType property', () => {
    const config: PluginUpdatePlatformConfig = {
      name: 'Example Platform',
      platform: 'ExamplePlatform',
      sensorType: 'temperature',
    }
    expect(config.sensorType).toBe('temperature')
  })

  it('should allow optional initialCheckDelay property', () => {
    const config: PluginUpdatePlatformConfig = {
      name: 'Example Platform',
      platform: 'ExamplePlatform',
      initialCheckDelay: 30,
    }
    expect(config.initialCheckDelay).toBe(30)
  })

  it('should allow all properties to be set', () => {
    const config: PluginUpdatePlatformConfig = {
      name: 'Example Platform',
      platform: 'ExamplePlatform',
      sensorType: 'humidity',
      checkHomebridgeUpdates: true,
      checkHomebridgeUIUpdates: true,
      checkPluginUpdates: true,
      checkDockerUpdates: true,
      checkNpmUpdates: true,
      initialCheckDelay: 15,
      autoUpdateNpm: false,
      autoUpdateHomebridge: true,
      autoUpdateHomebridgeUI: false,
      autoUpdatePlugins: true,
      allowDirectNpmUpdates: false,
    }
    expect(config.platform).toBe('ExamplePlatform')
    expect(config.sensorType).toBe('humidity')
    expect(config.checkHomebridgeUpdates).toBe(true)
    expect(config.checkHomebridgeUIUpdates).toBe(true)
    expect(config.checkPluginUpdates).toBe(true)
    expect(config.checkDockerUpdates).toBe(true)
    expect(config.checkNpmUpdates).toBe(true)
    expect(config.initialCheckDelay).toBe(15)
    expect(config.autoUpdateNpm).toBe(false)
    expect(config.autoUpdateHomebridge).toBe(true)
    expect(config.autoUpdateHomebridgeUI).toBe(false)
    expect(config.autoUpdatePlugins).toBe(true)
    expect(config.allowDirectNpmUpdates).toBe(false)
  })

  it('should allow auto-update properties to be set independently', () => {
    const config: PluginUpdatePlatformConfig = {
      name: 'Example Platform',
      platform: 'ExamplePlatform',
      autoUpdateHomebridge: true,
      autoUpdateHomebridgeUI: false,
      autoUpdatePlugins: true,
      autoUpdateNpm: false,
    }
    expect(config.name).toBe('Example Platform')
    expect(config.autoUpdateHomebridge).toBe(true)
    expect(config.autoUpdateHomebridgeUI).toBe(false)
    expect(config.autoUpdatePlugins).toBe(true)
    expect(config.autoUpdateNpm).toBe(false)
  })

  it('should allow npm update properties to be set independently', () => {
    const config: PluginUpdatePlatformConfig = {
      name: 'Example Platform',
      platform: 'ExamplePlatform',
      checkNpmUpdates: true,
      autoUpdateNpm: true,
    }
    expect(config.checkNpmUpdates).toBe(true)
    expect(config.autoUpdateNpm).toBe(true)
  })

  it('should allow allowDirectNpmUpdates property to be set', () => {
    const config: PluginUpdatePlatformConfig = {
      name: 'Example Platform',
      platform: 'ExamplePlatform',
      allowDirectNpmUpdates: true,
    }
    expect(config.allowDirectNpmUpdates).toBe(true)
  })

  it('should allow autoRestartAfterUpdates property to be set', () => {
    const config: PluginUpdatePlatformConfig = {
      name: 'Example Platform',
      platform: 'ExamplePlatform',
      autoRestartAfterUpdates: true,
    }
    expect(config.autoRestartAfterUpdates).toBe(true)
  })

  it('should allow enableMatter property to be set', () => {
    const config: PluginUpdatePlatformConfig = {
      name: 'Example Platform',
      platform: 'ExamplePlatform',
      enableMatter: false,
    }
    expect(config.enableMatter).toBe(false)
  })
})
