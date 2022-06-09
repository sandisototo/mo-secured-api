import { configuration } from './configuration'
import { AppFactory } from './factories/app-factory'
import { ExpressServer } from './services/express-server'
import { LoggerFactory } from './factories/logger-factory'
import { ClientService } from './services/client-service'
import { HealthController } from './controllers/health-controller'
import { ClientController } from './controllers/client-controller'
import { ClientRepository } from './repositories/client-repository'
import { DatabaseConnectionFactory } from './factories/database-connection-factory'
import { PassportService } from './services/passport-service'

/**
 * Start the HTTP service
 */
const startService = async () => {
  // Logging
  const loggerFactory = new LoggerFactory(configuration.logger)
  const processLogger = loggerFactory.getNamedLogger('mo-secured-api')

  // Database
  const database = await DatabaseConnectionFactory.getInstance(configuration.db)
    .initialize()

  // Repositories
  const clientRepository = new ClientRepository(database, configuration.db, loggerFactory)

  // Services
  const clientService = new ClientService(clientRepository, loggerFactory)
  // Passpport init
  const passportService = new PassportService(database, configuration.server, loggerFactory)
  passportService.init()


  // Controllers
  const healthController = new HealthController(database, loggerFactory)
  const clientController = new ClientController(clientService, configuration.server, loggerFactory)

  // Application
  const app = AppFactory.getInstance(clientController, healthController)
  const expressServer = new ExpressServer(app, loggerFactory, configuration.server)

  expressServer.run()
    .catch((error: Error) => processLogger.error('Process error', { message: error.message }))
}

Promise.resolve()
  .then(startService)
  .catch(console.error)
