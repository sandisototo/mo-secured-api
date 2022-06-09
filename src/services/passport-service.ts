import Logger = require("bunyan");
import passport = require("passport");
import { ExtractJwt, Strategy } from "passport-jwt";
import { DataSource, Repository } from "typeorm";

import { Client } from "../db/entity/Client";
import { LoggerFactory } from "../factories/logger-factory";
import { ServerConfiguration } from "../models/configuration/server-configuration";

class PassportService {
  private logger: Logger;
  private clientRepository: Repository<Client>;

  /**
   * @constructor
   */
  constructor(
    protected database: DataSource,
    private configuration: ServerConfiguration,
    loggerFactory: LoggerFactory
  ) {
    this.logger = loggerFactory.getNamedLogger("passport-service");
    this.clientRepository = this.database.getRepository(Client);
  }

  public init() {
    const secret = this.configuration.secret;
    if (!secret) {
      this.logger.debug("Error while trying to get a secret key");
      throw new Error("process.env.SECRET_KEY is undefined");
    }

    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    };

    passport.use(
      "jwt-authentication",
      new Strategy(options, async (payload, done) => {
        const client = await this.clientRepository.findOne({
          where: {
            id: payload.id,
          },
        });

        if (client) {
          done(null, client);
        } else {
          done(null, false);
        }
      })
    );
  }
}
export { PassportService };
