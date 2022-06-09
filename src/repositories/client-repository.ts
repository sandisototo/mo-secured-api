import * as Logger from "bunyan";
import * as bcrypt from "bcrypt";

import { LoggerFactory } from "../factories/logger-factory";
import { DataSource, Repository } from "typeorm";
import { Client } from "../db/entity/Client";
import { DatabaseConfiguration } from "../models/configuration/database-configuration";

/**
 * Client Repository handles the retrieval and setting of data relating to clients within the database
 */
class ClientRepository {
  /**
   * The child logger used in this repository
   */
  private logger: Logger;
  /**
   * The database that will be queried
   */
  private readonly databaseName: string;
  /**
   * The collection that will be queried
   */
  private readonly collectionName: string;

  private clientRepository: Repository<Client>;

  /**
   * @constructor
   */
  constructor(
    protected database: DataSource,
    dbConfiguration: DatabaseConfiguration,
    loggerFactory: LoggerFactory
  ) {
    this.logger = loggerFactory.getNamedLogger("client-repository");
    this.clientRepository = this.database.getRepository(Client);

    this.databaseName = dbConfiguration.database;
    this.collectionName = "clients";
  }

  public async save(client: Client): Promise<Client> {
    const { email, password } = client;
    const tapResponse = (client: Client): Client => {
      this.logger.debug("Successfully saved a new client!", { client });
      return client;
    };
    const tapError = (error: any): never => {
      this.logger.error("Error occurred whilst trying to save a new client", {
        message: error.errmsg,
      });
      throw error;
    };

    this.logger.debug("Attempting to save a new client...", {
      database: this.databaseName,
    });

    const existingClient = await this.clientRepository.findOne({ where: { email } });
    console.log('existingClient---> existingClient-->', existingClient)

    if (existingClient) {
      return existingClient;
    } else {
    console.log('client---> Rep before save-->', client)
      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      client.password = hashedPassword;
    }

    return this.clientRepository.save(client).then(tapResponse).catch(tapError);
  }

  /**
   * Retrieve all clients data from the database
   */
  public getAllClients(): Promise<Client[]> {
    /**
     * Tap and log the response and return the raw contact data
     */
    const tapResponse = (clients: Client[]): Client[] => {
      this.logger.debug("Successfully retrieved clients data", {
        count: clients.length,
      });
      return clients;
    };

    /**
     * Tap and log the error and rethrow to let it bubble up
     */
    const tapError = (error: any): never => {
      this.logger.error("Error occurred whilst retrieving clients data", {
        message: error.errmsg,
      });
      throw error;
    };

    this.logger.debug("Attempting to retrieve all clients", {
      collection: this.collectionName,
      database: this.databaseName,
    });

    return this.clientRepository.find().then(tapResponse).catch(tapError);
  }

  /**
   * Retrieve a specific contact's details from the database
   */
  // public getContactById(id: string): Promise<RawContact> {
  //   const query: FilterQuery<RawContact> = {
  //     userId: id,
  //   };

  //   /**
  //    * Tap and log the response and return the raw contact data
  //    */
  //   const tapResponse = (result: RawContact): RawContact => {
  //     this.logger.debug("Successfully retrieved specific contact", { result });
  //     return result;
  //   };

  //   /**
  //    * Tap and log the error and rethrow to let it bubble up
  //    */
  //   const tapError = (error: MongoError): never => {
  //     this.logger.error("Error occurred whilst retrieving specific contact", {
  //       message: error.errmsg,
  //     });
  //     throw error;
  //   };

  //   this.logger.debug("Attempting to retrieve specific contact", {
  //     contactId: id,
  //   });
  //   return this.database
  //     .db(this.databaseName)
  //     .collection(this.collectionName)
  //     .findOne<RawContact>(query)
  //     .then(tapResponse)
  //     .catch(tapError);
  // }
}

export { ClientRepository };
