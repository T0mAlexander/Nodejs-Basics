import { defineConfig } from 'vitest/config'
import TypescriptConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [TypescriptConfigPaths()],
  test: {
    environmentMatchGlobs: [
      ['./src/http/controllers/**', 'prisma']
    ]
  }
})