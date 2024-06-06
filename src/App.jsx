import { useState } from "react";
import "./index.css";
import {
	FaEdit,
	FaRegCheckSquare,
	FaRegSquare,
	FaTrashAlt,
} from "react-icons/fa";

function App() {
	const [showModal, setShowModal] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [editTask, setEditTask] = useState(false);
	const [editId, setEditId] = useState("");
	const [taskTitle, setTaskTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [priority, setPriority] = useState("1");

	const [tasks, setTasks] = useState([
		{
			id: 1,
			task: "Makan",
			description: "Makan siang jam 12",
			date: "2011-10-05T14:48:00",
			status: false,
			priority: "low",
		},
		{
			id: 2,
			task: "Minum",
			description: "Minum air putih",
			date: "2022-10-05T14:48:00",
			status: false,
			priority: "medium",
		},
		{
			id: 3,
			task: "Tidur",
			description: "Tidur jam 8 malam",
			date: "2022-10-05T14:48:00",
			status: false,
			priority: "high",
		},
	]);

	function handleAddTask(e) {
		e.preventDefault();
		if (!taskTitle) {
			alert("Task tidak boleh kosong");
			return;
		}
		if (editTask) {
			setTasks(
				tasks.map((task) =>
					task.id === editId
						? {
								...task,
								task: taskTitle,
								description,
								date: date,
								priority,
						}
						: task
				)
			);
			setEditTask(false);
			console.log("Task Edited");
		} else {
			setTasks([
				...tasks,
				{
					id: +new Date(),
					task: taskTitle,
					description,
					date: date ? date : Date.now(),
					status: false,
					priority,
				},
			]);
			console.log("Task Added");
		}
	}

	function handleDeleteTask(id) {
		setTasks(tasks.filter((task) => task.id !== id));
	}

	function handleStatusTask(id) {
		setTasks(
			tasks.map((task) => {
				if (task.id === id) {
					task.status = !task.status;
				}
				return task;
			})
		);
	}

	function handleEditTask(id) {
		setEditTask(true);
		setShowModal(true);
		const task = tasks.find((task) => task.id === id);
		setTaskTitle(task.task);
		setDescription(task.description);
		setDate(task.date);
		setPriority(task.priority);
		setEditId(id);
	}

	function closeModal() {
		setIsClosing(true);
		setTimeout(() => {
			setShowModal(false);
			setIsClosing(false);
			setEditTask(false);

			setTaskTitle("");
			setDescription("");
			setDate("");
			setPriority("");
		}, 250);
	}

	return (
		<div className="w-full min-h-screen bg-indigo-950 p-5 text-white flex justify-center items-start">
			<div className="flex justify-center flex-col items-center bg-indigo-900 p-3 w-full lg:w-4/12 rounded-lg">
				<div className="py-3 bg-indigo-700 w-full text-center rounded-t-md">
					<h1 className="text-white">ToDoList App</h1>
				</div>
				<div className="flex w-full">
					<button
						className="bg-indigo-400 px-4 py-2 rounded-bl-md w-9/12 hover:bg-indigo-500"
						onClick={() => setShowModal(true)}
					>
						Add Task
					</button>
					<select
						name=""
						id=""
						className="text-black px-3 py-2 rounded-br-md w-1/4"
					>
						<option value="1" selected disabled>
							Filter Task
						</option>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</select>
				</div>
				{showModal && (
					<div className="fixed backdrop-blur-sm top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 ">
						<div
							className={`bg-indigo-500 xl:w-1/2 w-9/12 rounded-lg ${
								closeModal ? "scale-in-center" : ""
							} ${isClosing ? "scale-out-center" : ""}`}
						>
							<h1 className="text-center py-3 text-lg font-bold">
								{!editTask ? "Masukkan" : "Edit"} TODO
							</h1>
							<form className="px-5 pb-5 flex flex-col gap-3">
								<div className="flex flex-col">
									<label htmlFor="task" className="text-xl">
										Task
									</label>
									<input
										id="task"
										type="text"
										placeholder="Masukkan Task"
										className="input"
										onChange={(e) => setTaskTitle(e.target.value)}
										value={taskTitle}
									/>
								</div>
								<div className="flex flex-col">
									<label htmlFor="description" className="text-xl">
										Description
									</label>
									<textarea
										id="description"
										placeholder="Masukkan Deskripsi"
										className="input"
										maxLength={150}
										onChange={(e) => setDescription(e.target.value)}
										value={description}
									></textarea>
								</div>
								<div className="flex flex-col">
									<label htmlFor="date" className="text-xl">
										Date (Optional)
									</label>
									<input
										id="date"
										type="datetime-local"
										placeholder="Masukkan Deskripsi"
										className="input"
										onChange={(e) => setDate(e.target.value)}
										value={date}
									/>
								</div>
								<div className="flex flex-col">
									<label htmlFor="priority" className="text-xl">
										Task Priority
									</label>
									<select
										id="priority"
										className="input"
										onChange={(e) => setPriority(e.target.value)}
										value={priority}
									>
										<option value="1" selected disabled>
											Select Task Priority
										</option>
										<option value="low">Low</option>
										<option value="medium">Medium</option>
										<option value="high">High</option>
									</select>
								</div>
								<div className="flex mt-5 gap-4">
									<button
										className="bg-indigo-400 px-4 py-2 w-full rounded-md hover:bg-indigo-200 hover:text-blue-950"
										onClick={closeModal}
										type="button"
									>
										Cancel
									</button>
									<button
										className="bg-indigo-700 px-4 py-2 w-full rounded-md hover:bg-indigo-800"
										type="submit"
										onClick={(e) => {
											handleAddTask(e);
											closeModal();
										}}
									>
										{!editTask ? "Add Task" : "Edit Task"}
									</button>
								</div>
							</form>
						</div>
					</div>
				)}

				{/* TASK */}
				<div className="w-full mt-2 flex flex-col items-center justify-start">
					{tasks.map((task) => (
						<div
							className="flex flex-col bg-blue-950 pl-3 pr-6 py-2 justify-start items-start rounded-lg border-2 relative mb-8 w-[90%]"
							key={task.id}
						>
							<div
								className={`flex items-start justify-between w-full ${
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
								<FaEdit
									size={"1.1rem"}
									onClick={() => handleEditTask(task.id)}
								/>
								<FaTrashAlt onClick={() => handleDeleteTask(task.id)} />
							</div>
							<div className="flex justify-between w-full items-center">
								<p className="text-[0.8rem]">
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
			</div>
		</div>
	);
}

export default App;
