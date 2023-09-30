import { User } from './user.model';

export const findUserId = async () => {
  //last user find in mongodb database
  const lastUserId = await User.findOne({}, { id: 1, _id: 1 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUserId?.id;
};
//generate new user and increment id
export const generateUserId = async () => {
  const currentUserId = (await findUserId()) || (0).toString().padStart(5, '0');
  const incrementedId = (parseInt(currentUserId) + 1)
    .toString()
    .padStart(5, '0');
  return incrementedId;
};
