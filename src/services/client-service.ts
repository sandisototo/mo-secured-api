import * as Logger from 'bunyan'
import { Client } from '../db/entity/Client'

import { LoggerFactory } from '../factories/logger-factory'
import { ClientRepository } from '../repositories/client-repository'

/**
 * Client Service handles the manipulation of contact related data
 */
class ClientService {
  /**
   * The logger for the contact service
   */
  private logger: Logger

  /**
   * @constructor
   */
  constructor(protected clientRepository: ClientRepository, loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.getNamedLogger('client-service')
  }

  /**
   * Get all clients
   */
  public getClients(): Promise<Client[]> {
    /**
     * Format the retrieved raw contact data and return a new array with the appropriately formatted contact data
     */
    const formatResponse = (rawClients: Client[]): Client[] => {
      if (!rawClients.length) {
        this.logger.warn('No clients could be found for the user')
        return []
      }

      this.logger.debug('Formatting retrieved clients for the user')
      return rawClients
    }

    /**
     * Tap and log the response
     */
    const tapResponse = (clients: Client[]): Client[] => {
      this.logger.debug('Successfully retrieved all clients', { clients, count: clients.length })
      return clients
    }

    /**
     * Tap and log error and rethrow to bubble up
     */
    const tapError = (error: Error): never => {
      this.logger.error('Error occurred whilst retrieving clients data', { message: error.message })
      throw error
    }

    this.logger.debug('Attempting to retrieve all clients')
    return this.clientRepository.getAllClients()
      .then(formatResponse)
      .then(tapResponse)
      .catch(tapError)
  }

  public addClient(client: Client): Promise<any> {

    /**
     * Tap and log the response
     */
    const tapResponse = (client: Client): Client => {
      this.logger.debug('Successfully added a Client:', { client })
      return client
    }

    /**
     * Tap and log error and rethrow to bubble up
     */
    const tapError = (error: Error): never => {
      this.logger.error('Error occurred whilst save a new client', {
        message: error.message,
        client
      })
      throw error
    }

    this.logger.debug('Attempting to save a new client...', { client })
    return this.clientRepository.save(client)
      .then(tapResponse)
      .catch(tapError)
  }

  /**
   * Get a specific contact's data
   */
  // public getContact(contactId: string): Promise<Contact> {
  //   /**
  //    * Format the retrieved raw contact data and return appropriately formatted contact
  //    */
  //   const formatResponse = (rawContact: RawContact): Contact => {
  //     if (!rawContact) {
  //       this.logger.error('No contact could be found with the ID specified', { contactId })
  //       throw new Error('Contact not found with specified ID')
  //     }

  //     this.logger.debug('Formatting retrieved client')
  //     return {
  //       email: rawContact.email,
  //       mobile: rawContact.mobile,
  //       userId: rawContact.userId,
  //       nickname: rawContact.nickname,
  //       lastname: rawContact.lastname,
  //       firstname: rawContact.firstname,
  //       mobileIDC: rawContact.mobileIDC
  //     }
  //   }

  //   /**
  //    * Tap and log the response
  //    */
  //   const tapResponse = (contact: Contact): Contact => {
  //     this.logger.debug('Successfully retrieved the specific contact', { contact, contactId })
  //     return contact
  //   }

  //   /**
  //    * Tap and log error and rethrow to bubble up
  //    */
  //   const tapError = (error: Error): never => {
  //     this.logger.error('Error occurred whilst retrieving the specific contact data', {
  //       message: error.message,
  //       contactId
  //     })
  //     throw error
  //   }

  //   this.logger.debug('Attempting to retrieve a specific contact', { contactId })
  //   return this.clientsRepository.getContactById(contactId)
  //     .then(formatResponse)
  //     .then(tapResponse)
  //     .catch(tapError)
  // }
}

export { ClientService }
