import { useEffect, useState } from "react";
import {
	FaCalendarAlt,
	FaEdit,
	FaRegCheckSquare,
	FaRegSquare,
	FaTrashAlt,
} from "react-icons/fa";

export default function Task({
	tasks,
	handleStatusTask,
	handleEditTask,
	handleDeleteTask,
}) {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	function checkDeadline(date) {
		return new Date(date) < time;
	}

	return (
		<div className="w-full mt-2 flex flex-col items-center justify-start">
			{tasks.map((task) => (
				<div
					className="flex flex-col bg-blue-950 pl-3 pr-6 py-2 justify-start items-start rounded-lg border-2 relative mb-8 w-[90%]"
					key={task.id}
				>
					<div
						className={`flex items-center justify-between w-full ${
							task.status ? "line-through" : ""
						}`}
					>
						<p className="text-2xl break-all">{task.task}</p>
					</div>
					<p className="text-sm mt-1 text-justify min-h-7 w-full break-all">
						{task.description}
					</p>

					<div className="flex flex-col items-center gap-2 bg-slate-800 px-2 py-3 rounded-md border-2 absolute -right-5 transform top-1/2 -translate-y-1/2">
						{task.status ? (
							<FaRegCheckSquare onClick={() => handleStatusTask(task.id)} />
						) : (
							<FaRegSquare onClick={() => handleStatusTask(task.id)} />
						)}
						<FaEdit size={"1.1rem"} onClick={() => handleEditTask(task.id)} />
						<FaTrashAlt onClick={() => handleDeleteTask(task.id)} />
					</div>
					<div className="flex justify-between w-full items-center">
						<div className="flex gap-1">
							<FaCalendarAlt
								size={"1.2rem"}
								color={task.deadline ? "#ff303b" : ""}
							/>
							<p
								className={`text-[0.8rem] ${
									checkDeadline(task.date) && task.deadline
										? "line-through text-red-600"
										: ""
								}`}
							>
								{new Date(task.date).toLocaleString("id-ID", {
									weekday: "long",
									year: "numeric",
									month: "short",
									day: "2-digit",
									hour: "2-digit",
									minute: "2-digit",
									hour12: false,
									timeZone: "Asia/Jakarta",
									timeZoneName: "short",
								})}
							</p>
						</div>
						<p
							className={`text-sm text-center text-white rounded-md p-1 border w-1/4 font-bold ${
								task.priority === "low"
									? "bg-green-500"
									: task.priority === "medium"
									? "bg-amber-500"
									: "bg-red-500"
							}`}
						>
							{task.priority}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
