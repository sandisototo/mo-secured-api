import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import { Controller } from "../types/controller";
import { LoggerFactory } from "../factories/logger-factory";
import { ClientService } from "../services/client-service";
import { Client } from "../db/entity/Client";
import { ServerConfiguration } from "../models/configuration/server-configuration";

/**
 * Clients controller handles requests relating to the clients
 */
class ClientController extends Controller {
  /**
   * @constructor
   */
  constructor(
    protected clientService: ClientService,
    protected serverConfiguration: ServerConfiguration,
    loggerFactory: LoggerFactory
  ) {
    super(loggerFactory.getNamedLogger("client-controller"));
  }

  /**
   * @inheritDoc
   */
  public setRoutes(): void {
    this.logger.info("Setting up routes for controller");
    this.router.get("/", this.getClients.bind(this));
    this.router.post("/", this.addClient.bind(this));
  }

  /**
   * Get all the clients
   */
  public getClients(request: Request, response: Response): Promise<Response> {
    /**
     * Send the response back to the client
     */
    const sendResponse = (clients: object) =>
      response.json(clients).status(200);

    /**
     * Handles thrown errors and return appropriate status and payload
     */
    const handleError = (error: Error) => {
      const payload = {
        message: error.message,
      };

      return response.json(payload).status(400);
    };

    this.logger.debug("Getting all clients");
    return this.clientService
      .getClients()
      .then(sendResponse)
      .catch(handleError);
  }

  /**
   * Adds a new record of a client
   */
  public addClient(request: Request, response: Response): Promise<Response> {
    console.log('req.body---> Cont', request.body)
    /**
     * Send the response back to the client
     */
    const sendResponse = (client: Client) => {
      const token = jwt.sign(client, this.serverConfiguration.port);
      return response.json(token).status(200);
    };

    /**
     * Send the error response back to the client
     */
    const tapError = (error: Error) => {
      this.logger.error("Error occurred whilst save a new client", {
        message: error.message,
      });
      response.statusCode = 400;
      return response.json(error.message);
    };

    const client: Client = request.body;
    if (!client) {
      tapError(Error("Payload cannot be empty!"));
      return;
    }

    console.log("client---> Cont", client);

    this.logger.debug("Attempting to save a client...", { client });
    return this.clientService
      .addClient(client)
      .then(sendResponse)
      .catch(tapError);
  }

  /**
   * Get a specific client
   */
  // public getClient(request: Request, response: Response): Promise<Response> {
  //   const { clientId } = request.params

  //   /**
  //    * Send the response back to the client
  //    */
  //   const sendResponse = (clients: object) => response.json(clients)
  //     .status(200)

  //   /**
  //    * Handles thrown errors and return appropriate status and payload
  //    */
  //   const handleError = (error: Error) => {
  //     const payload = {
  //       message: error.message
  //     }

  //     return response.json(payload)
  //       .status(400)
  //   }

  //   this.logger.debug('Getting a specific client', { clientId })
  //   return this.clientService.getClient(clientId)
  //     .then(sendResponse)
  //     .catch(handleError)
  // }
}

export { ClientController };
