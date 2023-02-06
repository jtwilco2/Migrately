import { v4 as uuid } from 'uuid';

// import media files
import Avatar1 from 'assets/images/avatar/avatar-1.jpg';
import Avatar2 from 'assets/images/avatar/avatar-2.jpg';
import Avatar3 from 'assets/images/avatar/avatar-3.jpg';

export const TaskData = [
	{
		id: uuid(),
		task: 'Wong Kim Ark, 169 U.S. 649',
		assignee: Avatar1,
		progress: 90,
		enddate: 'July 27, 2021',
		status: 'In Mediation',
		statuscolor: 'info'
	},
	{
		id: uuid(),
		task: 'Shaughnessy, 345 U.S. 206',
		assignee: Avatar2,
		progress: 75,
		enddate: 'Aug 15, 2021',
		status: 'Active',
		statuscolor: 'primary'
	},
	{
		id: uuid(),
		task: 'Graham, 403 U.S. 365',
		assignee: Avatar3,
		progress: 86,
		enddate: 'Aug 16, 2021',
		status: 'Active',
		statuscolor: 'primary'
	},
	{
		id: uuid(),
		task: 'Delgado, 466 U.S. 210',
		assignee: Avatar1,
		progress: 40,
		enddate: 'Aug 18, 2021',
		status: 'In Review',
		statuscolor: 'danger'
	},
	{
		id: uuid(),
		task: 'Kleindienst, 408 U.S. 753',
		assignee: Avatar2,
		progress: 35,
		enddate: 'Aug 18, 2021',
		status: 'In Review',
		statuscolor: 'danger'
	},
];

export default TaskData;
