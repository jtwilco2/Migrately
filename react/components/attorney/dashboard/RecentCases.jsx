import React, {forwardRef} from 'react';
import { Link } from 'react-router-dom';
import { Card, Table, Image, Dropdown } from 'react-bootstrap';
import ProgressChart from './ProgressChart';
import TaskData from './TaskData';
import PropTypes from "prop-types";



function RecentCases() {
	const CustomToggle = forwardRef(({ children, onClick }, ref) => (
		<Link
			to=""
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
		>
			{children}
		</Link>
	));

    const ActionMenu = () => {
		return (
			<Dropdown>
				<Dropdown.Toggle as={CustomToggle}>
					<i className="fe fe-more-vertical text-muted"></i>
				</Dropdown.Toggle>
				<Dropdown.Menu align="end">
					<Dropdown.Header>Settings</Dropdown.Header>
					<Dropdown.Item eventKey="1">Update</Dropdown.Item>
					<Dropdown.Item eventKey="2">Delete</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	};

	return (
		<Card className="h-100 mb-6">
			<Card.Header className="card-header">
				<h4 className="mb-0">Recent Cases</h4>
			</Card.Header>
			<div className="table-responsive">
				<Table className="table text-nowrap mb-0">
					<thead className="table-light">
						<tr>
							<th>Case Number</th>
							<th>Start Date</th>
							<th>Status</th>
							<th>Progress</th>
							<th>Paralegal</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
                    {TaskData.map((item, index) => {
							return (
								<tr key={index}>
									<td className="align-middle">{item.task}</td>
									<td className="align-middle">{item.enddate}</td>
									<td className="align-middle">
										<span
											className={`badge bg-light-${item.statuscolor} text-${item.statuscolor}`}
										>
											{item.status}
										</span>
									</td>
									<td className="align-middle">
										<ProgressChart value={item.progress} />
									</td>
									<td className="align-middle">
										<Image
											src={item.assignee}
											alt=""
											className="avatar avatar-xs rounded-circle"
										/>
									</td>
									<td className="align-middle">
										<ActionMenu />
									</td>
								</tr>
							);
						})}

					</tbody>
				</Table>
			</div>
		</Card>
	);
};
export default RecentCases;

RecentCases.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
  }
