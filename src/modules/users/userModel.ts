import type { Optional, Sequelize } from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { Models } from '../../app/setup/models';

interface UserAttributes {
  id: number;
  name?: string;
  email: string;
  username: string;
  emailVerified: boolean;
  password?: string;
  isAdmin: boolean;
  timezone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'isAdmin' | 'emailVerified' | 'timezone'
>;

export type UserUpdateAttributes = Omit<
  Partial<UserAttributes>,
  'id' | 'createdAt'
>;

export type UserOuput = Omit<UserAttributes, 'password'>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name: string;
  public email!: string;
  public emailVerified!: boolean;
  public isAdmin!: boolean;
  public timezone!: string;
  public username!: string;
  public password: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public toJSON(): UserOuput {
    const values = { ...this.get() };

    delete values.password;
    return values;
  }

  public static associate(db: Models): void {
    const { User } = db;
  }

  public static initialize(sequelize: Sequelize): void {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
        username: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        emailVerified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        timezone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        modelName: 'user',
        sequelize,
      },
    );
  }
}
