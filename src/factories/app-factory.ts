import * as express from 'express'
import * as helmet from 'helmet'
import * as HTTPContext from 'express-http-context'
var bodyParser = require('body-parser')

import { HealthController } from '../controllers/health-controller'
import { ClientController } from '../controllers/client-controller'
import { CorrelationIdMiddleware } from '../middleware/correlation-id-middleware'

/**
 * App Factory creates and initializes and new instance of the application
 */
class AppFactory {
  /**
   * Get a configured application instance
   */
  public static getInstance(clientController: ClientController,
                            healthController: HealthController): express.Express {
    const app: express.Express = express()
    app.use(bodyParser.urlencoded({
      extended: true
    }));

    app.use(helmet())
    app.use(HTTPContext.middleware)
    app.use(CorrelationIdMiddleware.getMiddleware())

    app.use('/health', healthController.getRoutes())
    app.use('/clients', clientController.getRoutes())

    return app
  }
}

export { AppFactory }
