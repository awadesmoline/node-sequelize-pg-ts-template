import { Service } from 'typedi';
import { Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import type { UserCreationAttributes, UserUpdateAttributes } from './userModel';
import { User } from './userModel';
import { BadRequestError, NotFoundError } from '../../common/errors';
import { Repos } from '../../common/interfaces';

@Service(Repos.UserRepository)
class UserRepository {
  async create(userDTO: UserCreationAttributes): Promise<User> {
    const user = await User.create(userDTO);

    if (!user) {
      throw new BadRequestError('Error Creating Account. Try again');
    }

    return user;
  }

  async createUserWithUsername(
    userDTO: Optional<UserCreationAttributes, 'username' | 'timezone'>,
  ): Promise<User> {
    const { ...rest } = userDTO;

    const username = userDTO.username || userDTO.email.split('@')[0];

    const isUsernameTaken = await this.checkUsernameExists(username);

    let user;

    if (isUsernameTaken) {
      user = await this.create({
        ...rest,
        username: `${username}-${uuidv4()}`,
      });

      user = await user.update({
        username: `${username}${user.id}`,
      });
    } else {
      user = await this.create({
        ...rest,
        username,
      });
    }

    return user;
  }

  async getById(id: number): Promise<User> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async getByUsername(username: string): Promise<User> {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async checkUsernameExists(username: string): Promise<boolean> {
    const user = await User.findOne({
      where: { username },
    });

    return !!user;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const user = await User.findOne({
      where: { email },
    });

    return !!user;
  }

  async update(id: number, userDTO: UserUpdateAttributes): Promise<User> {
    const {
      username,
      name,
      email,
      password,
      emailVerified,
      isAdmin,
      timezone,
    } = userDTO;
    let user = await User.findByPk(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    user = await user.update({
      username: username || user.username,
      name: name || user.name,
      email: email || user.email,
      password: password || user.password,
      emailVerified: emailVerified || user.emailVerified,
      isAdmin: isAdmin || user.isAdmin,
      timezone: timezone || user.timezone,
    });

    return user;
  }

  async getAll(
    page: number,
    limit: number,
  ): Promise<{ rows: User[]; count: number }> {
    return await User.findAndCountAll({
      order: [['createdAt', 'DESC']],
      offset: (page - 1) * limit,
      limit,
    });
  }

  async delete(id: number): Promise<boolean> {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
    }

    return true;
  }
}

export { UserRepository };
