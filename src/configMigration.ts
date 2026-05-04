import type { API } from 'homebridge'

import { PLUGIN_NAME, PLATFORM_NAME } from './settings.js'
import { UiApi } from './ui-api.js'

const LEGACY_PLATFORM_NAME = 'PluginUpdate'

export function migratePlatformAliasInPluginConfigs(configs: Array<Record<string, unknown>>): number {
  if (!Array.isArray(configs)) {
    return 0
  }

  let updated = 0
  for (const platformConfig of configs) {
    if (platformConfig?.platform === LEGACY_PLATFORM_NAME) {
      platformConfig.platform = PLATFORM_NAME
      updated++
    }
  }

  return updated
}

export async function migrateLegacyPlatformAlias(api: API): Promise<void> {
  const hbStoragePath = (api.user as any)?.storagePath?.()
  if (!hbStoragePath) {
    return
  }

  const silentLog = {
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
  }

  try {
    const uiApi = new UiApi(hbStoragePath, silentLog as any)
    if (!uiApi.isConfigured()) {
      return
    }

    const pluginConfigs = await uiApi.getPluginConfig(PLUGIN_NAME)
    const updated = migratePlatformAliasInPluginConfigs(pluginConfigs)
    if (!updated) {
      return
    }

    await uiApi.updatePluginConfig(PLUGIN_NAME, pluginConfigs)
    await uiApi.savePluginConfig(PLUGIN_NAME)
  } catch {
    // Ignore migration errors so plugin startup is never blocked.
  }
}
