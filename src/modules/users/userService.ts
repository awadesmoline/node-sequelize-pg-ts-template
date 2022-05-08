import { Service, Inject } from 'typedi';
import { Repos } from '../../common/interfaces';
import { UserRepository } from './userRepo';

@Service()
class UserService {
  constructor(
    @Inject(Repos.UserRepository) private userRepository: UserRepository,
  ) {}
}

export { UserService };
