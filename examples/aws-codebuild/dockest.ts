import Dockest, { runners, logLevel } from 'dockest'

const dockest = new Dockest({
  opts: {
    logLevel: logLevel.DEBUG,
  },
})

dockest.attachRunners([
  new runners.GeneralPurposeRunner({
    service: 'website',
    build: './app',
    ports: [
      {
        target: 9000,
        published: 9000,
      },
    ],
    responsivenessTimeout: 5,
    connectionTimeout: 5,
  }),
])

dockest.run()