import { execa } from 'dockest'
import app from './app'

const { seedUser } = require('./data.json') // eslint-disable-line @typescript-eslint/no-var-requires

beforeAll(async () => {
  await execa('sequelize db:migrate:undo:all')
  await execa('sequelize db:migrate')
})

beforeEach(async () => {
  await execa('sequelize db:seed:undo:all')
  await execa('sequelize db:seed:all')
})

describe('postgres-1-sequelize', () => {
  it('should get first entry', async () => {
    const { firstEntry } = await app()

    expect(firstEntry).toEqual(expect.objectContaining(seedUser))
  })

  it('should be able to execute custom shell scripts', async () => {
    await execa('sequelize db:seed:undo:all')

    const { firstEntry } = await app()

    expect(firstEntry).toEqual(null)
  })
})
