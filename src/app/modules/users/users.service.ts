import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_pass as string
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('Could not create user')
  }
  return createdUser
}

export default {
  createUser,
}
