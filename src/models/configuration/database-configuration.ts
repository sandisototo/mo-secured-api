/**
 * Representation of the database specific configuration required
 */
interface DatabaseConfiguration {
  /**
   * The url to the database for the connection
   */
  url: string;
  /**
   * The name of the database to access
   */
  database: string;
  /**
   * The type of database engine that will be used
   */
  type: string;
  /**
   * Username credential for database access
   */
  username: string;
  /**
   * Password credential for database access
   */
  password: string;

  /**
   * Host credential for database access
   */
  host: string;

  /**
   * Port credential for database access
   */
  port: string;
}

export { DatabaseConfiguration };
