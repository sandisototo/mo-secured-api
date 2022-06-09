import { DataSource } from "typeorm";
import { Admin } from "../db/entity/Admin";
import { Book } from "../db/entity/Book";
import { Checkin } from "../db/entity/Checkin";
import { Client } from "../db/entity/Client";
import { FlagStatusType } from "../db/entity/FlagStatusType";
import { Role } from "../db/entity/Role";
import { UserType } from "../db/entity/UserType";

import { DatabaseConfiguration } from "../models/configuration/database-configuration";

/**
 * Database Connection Factory handles the generation of connections to a specified database
 */
class DatabaseConnectionFactory {
  /**
   * Get a database instance
   */
  public static getInstance(configuration: DatabaseConfiguration): DataSource {
    const extras: any = {
      entities: [Book, Client, Admin, UserType, Role, Checkin, FlagStatusType],
      synchronize: true,
      logging: false,
      subscribers: [],
      migrations: [],
    };

    const AppDataSource = new DataSource({
      ...configuration,
      ...extras,
    });

    return AppDataSource;
  }
}

export { DatabaseConnectionFactory };
