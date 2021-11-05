import { USERS } from './users';
import { lorem } from 'faker';
enum TaskType {
  UPCOMING = 'UPCOMING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

const descs = [
  'Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada.',
  'Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis,ipsum.',
  'Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolorsagittis.',
  'In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felistristique.'
]

const getRandomInArray = (arr: any[]) => {
  if (!arr) return '';

  return arr[Math.round(Math.random() * (arr.length - 1))];
}

const generateTask = (taskStatus, taskIndex) => {
  return {
    title: lorem.words(),
    desc: getRandomInArray(descs),
    taskIndex,
    taskStatus,
    userId: getRandomInArray(USERS).id
  }
}

export const generateTasks = () => {
  const result = [];

  for (let i = 0, len = Math.round(Math.random() * 5) + 3; i < len; i++) {
    result.push(generateTask(TaskType.UPCOMING, i));
  }
  for (let i = 0, len = Math.round(Math.random() * 5) + 3; i < len; i++) {
    result.push(generateTask(TaskType.IN_PROGRESS, i));
  }
  for (let i = 0, len = Math.round(Math.random() * 5) + 3; i < len; i++) {
    result.push(generateTask(TaskType.COMPLETED, i));
  }
  return result;
}
