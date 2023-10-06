import TaskServices from '../services/task.services';

export default class TaskController{

    public constructor(
        private readonly taskServices: TaskServices
    ){}
}