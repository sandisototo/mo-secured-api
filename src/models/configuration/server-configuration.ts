/**
 * Representation of the server specific configuration required
 */
interface ServerConfiguration {
  /**
   * Port on which the server should run
   */
  port: string,
  secret: string
}

export { ServerConfiguration }
