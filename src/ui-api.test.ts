import type { MockedFunction } from 'vitest'

import fs, { readFileSync } from 'node:fs'
import path from 'node:path'

import axios from 'axios'
import jwt from 'jsonwebtoken'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { UiApi } from './ui-api.js'

vi.mock('axios')
vi.mock('jsonwebtoken')
vi.mock('node:fs')
vi.mock('node:path')

describe('uiApi', () => {
  const hbStoragePath = '/fake/path'
  const secretKey = 'fake-secret-key'
  const token = 'fake-token'

  beforeEach(() => {
    vi.clearAllMocks()

    vi.spyOn(path, 'resolve').mockImplementation((...args) => args.join('/'))
    vi.spyOn(fs, 'readFileSync').mockImplementation((filePath: fs.PathOrFileDescriptor) => {
      if (typeof filePath === 'string' && filePath.includes('config.json')) {
        return JSON.stringify({
          platforms: [
            {
              platform: 'homebridge-config-ui-x.config',
              host: 'localhost',
              port: 8581,
            },
          ],
        })
      } else if (typeof filePath === 'string' && filePath.includes('.uix-secrets')) {
        return JSON.stringify({ secretKey })
      }
      return ''
    })

    vi.spyOn(jwt, 'sign').mockReturnValue(token)
  })

  it('should initialize correctly', () => {
    const uiApi = new UiApi(hbStoragePath)
    expect(uiApi.isConfigured()).toBe(true)
  })

  it('should return homebridge version', async () => {
    const uiApi = new UiApi(hbStoragePath)
    const mockResponse = {
      data: {
        name: 'homebridge',
        installedVersion: '1.0.0',
        latestVersion: '1.1.0',
        updateAvailable: true,
      },
    };
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue(mockResponse)

    const result = await uiApi.getHomebridge()
    expect(result).toEqual(mockResponse.data)
  })

  it('should return plugins', async () => {
    const uiApi = new UiApi(hbStoragePath)
    const mockResponse = {
      data: [
        {
          name: 'plugin1',
          installedVersion: '1.0.0',
          latestVersion: '1.1.0',
          updateAvailable: true,
        },
      ],
    };
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValue(mockResponse)

    const result = await uiApi.getPlugins()
    expect(result).toEqual(mockResponse.data)
  })

  it('should return empty array if not configured', async () => {
    vi.spyOn(fs, 'readFileSync').mockImplementation(() => {
      return JSON.stringify({
        platforms: [],
      })
    })

    const uiApi = new UiApi(hbStoragePath)
    const result = await uiApi.getPlugins()
    expect(result).toEqual([])
  })

  it('should generate token', () => {
    const uiApi = new UiApi(hbStoragePath)
    const generatedToken = uiApi.getToken()
    expect(generatedToken).toBe(token)
  })
})
