import faker from 'faker';
import { sample } from 'lodash-es';
// utils
import { mockImgAvatar } from '../utils/mockImages';

const rolesArr = [
  'Leader',
  'Hr Manager',
  'UI Designer',
  'UX Designer',
  'UI/UX Designer',
  'Project Manager',
  'Backend Developer',
  'Full Stack Designer',
  'Front End Developer',
  'Full Stack Developer'
];

const roles = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: rolesArr[index],
  status: sample(['active', 'banned'])
}));

export default roles;
