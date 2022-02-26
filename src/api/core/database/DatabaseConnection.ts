import { createConnection, Connection } from 'typeorm';

/**
 * @interface IConnectOptions
 */
export interface IConnectOptions {
  /**
   * @default false
   */
  saveConnectionClass?: boolean;
}

/**
 * @class DatabaseConnection
 */
export class DatabaseConnection {
  private static instance: DatabaseConnection;

  public static connection: Connection;

  /**
   * @private constructor
   */
  private constructor() {}

  public static getInstance(): DatabaseConnection {
    const hasNotDatabaseInstance = !this.instance;

    if (hasNotDatabaseInstance) {
      this.instance = new DatabaseConnection();
    }

    return this.instance;
  }

  /**
   * @description - Start database connection
   */
  static async connect({ saveConnectionClass = false }: IConnectOptions = {}) {
    try {
      const connection = await createConnection();

      /** Connection save  */
      if (saveConnectionClass) this['connection'] = connection;

      return connection;
    } catch (error) {
      console.log(error);

      return process.exit(1);
    }
  }

  /**
   * @description Exists typeORM database connection
   */
  static hasConnectionIntoClass(): boolean {
    return typeof this.connection !== 'undefined';
  }
}
