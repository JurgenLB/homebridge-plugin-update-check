# homebridge-plugin-update-check

[![npm](https://img.shields.io/npm/v/@homebridge-plugins/homebridge-plugin-update-check) ![npm](https://img.shields.io/npm/dt/@homebridge-plugins/homebridge-plugin-update-check)](https://www.npmjs.com/package/@homebridge-plugins/homebridge-plugin-update-check) [![verified-by-homebridge](https://badgen.net/badge/homebridge/verified/purple)](https://github.com/homebridge/homebridge/wiki/Verified-Plugins)

A [Homebridge](https://github.com/nfarina/homebridge) plugin that reports update availability as sensors and can optionally run automatic updates.

## Features

- Works with both HomeKit Accessory Protocol (HAP) and Matter at runtime
- Exposes an update availability sensor
- Exposes an optional failure sensor for automatic update/restart failures
- Checks for updates to Node.js (LTS), Homebridge, Homebridge UI, plugins, and Docker images
- Supports optional auto-updates for Node.js, Homebridge, Homebridge UI, and plugins
- Intentionally does not auto-update Docker containers (check-only)

## Installation

1. Install Homebridge using the [official instructions](https://github.com/homebridge/homebridge/wiki).
2. Install this plugin using: `sudo npm install -g @homebridge-plugins/homebridge-plugin-update-check`.
3. Update your configuration file. See sample config.json snippet below.

### Configuration

Configuration sample:

```json
"platforms": [
    {
        "platform": "PluginUpdate",
        "name": "Plugin Update",
        "sensorType": "contact",
        "failureSensorType": "motion",
        "checkNodeUpdates": true,
        "checkNpmUpdates": true,
        "checkHomebridgeUpdates": true,
        "checkHomebridgeUIUpdates": true,
        "checkPluginUpdates": true,
        "checkDockerUpdates": false,
        "initialCheckDelay": 10,
        "autoUpdateNode": false,
        "autoUpdateNpm": false,
        "autoUpdateHomebridge": false,
        "autoUpdateHomebridgeUI": false,
        "autoUpdatePlugins": false,
        "allowDirectNpmUpdates": false,
        "autoRestartAfterUpdates": false,
        "respectDisabledPlugins": true,
        "enableMatter": true
    }
]
```

#### Fields

All sensor type options are:

- `motion`
- `contact`
- `occupancy`
- `humidity`
- `light`
- `air`
- `leak`
- `smoke`
- `dioxide`
- `monoxide`

`failureSensorType` also supports `none` to disable the failure sensor.

| Field | Description | Default |
| --- | --- | --- |
| `platform` | Must always be `PluginUpdate` | Required |
| `name` | Accessory name shown in Home app | `Plugin Update` |
| `sensorType` | Sensor type for the main update sensor | `motion` |
| `failureSensorType` | Sensor type for auto-update failure status, or `none` to disable | `motion` |
| `checkNodeUpdates` | Check for newer Node.js LTS versions | `false` |
| `checkNpmUpdates` | Check for newer npm versions when npm is installed | `false` |
| `checkHomebridgeUpdates` | Check for Homebridge server updates | `true` |
| `checkHomebridgeUIUpdates` | Check for Homebridge Config UI updates | `true` |
| `checkPluginUpdates` | Check for installed plugin updates | `true` |
| `checkDockerUpdates` | Check for newer Docker image versions when running in Docker | `false` |
| `initialCheckDelay` | Delay in seconds before the first check after startup | `10` |
| `autoUpdateNode` | Automatically run Node.js updates using `hb-service update-node` when supported | `false` |
| `autoUpdateNpm` | Automatically update npm when a newer version is available | `false` |
| `autoUpdateHomebridge` | Automatically update Homebridge | `false` |
| `autoUpdateHomebridgeUI` | Automatically update Homebridge Config UI | `false` |
| `autoUpdatePlugins` | Automatically update plugins | `false` |
| `allowDirectNpmUpdates` | Allow direct npm update commands when UI API is unavailable | `false` |
| `autoRestartAfterUpdates` | Restart Homebridge after successful auto-updates | `false` |
| `respectDisabledPlugins` | Respect hidden update notifications configured in Homebridge UI | `true` |
| `enableMatter` | Enable Matter support when available in Homebridge | `true` |

## How It Works

- The plugin checks selected update sources on a schedule.
- If any enabled source has updates, the main sensor is set to active.
- If automatic updates are enabled and an update/restart fails, the failure sensor is set to active.
- If no auto-update options are enabled, the failure sensor is automatically not exposed.

## Automatic Updates

When automatic updates are enabled, the plugin will:

1. Attempt to create a backup before updates when Homebridge UI is available.
2. Perform configured updates (Node.js, Homebridge, Homebridge UI, plugins).
3. Optionally restart Homebridge if `autoRestartAfterUpdates` is enabled.
4. Surface failures through the failure sensor.

Automatic updates are disabled by default. Enable them only if your environment has appropriate permissions and you are comfortable with unattended updates.

If Homebridge UI is not configured, automatic updates require `allowDirectNpmUpdates: true`.

If npm is not installed in your environment, npm checks and npm auto-update are skipped safely.

## Docker Notes

Docker update checks are notification-only. The plugin does not attempt in-container self-updates by design, to avoid interrupting or corrupting the running container.
