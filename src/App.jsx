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
	const [isEditing, setIsEditing] = useState(false);
	const [task, setTask] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [priority, setPriority] = useState("");

	const [tasks, setTasks] = useState([
		{
			id: 1,
			task: "Makan",
			description: "Makan siang jam 12",
			date: "2021-09-01T12:00",
			status: false,
			priority: "low",
		},
		{
			id: 2,
			task: "Minum",
			description: "Minum air putih",
			date: "2021-09-01T12:00",
			status: false,
			priority: "medium",
		},
		{
			id: 3,
			task: "Tidur",
			description: "Tidur jam 8 malam",
			date: "2021-09-01T12:00",
			status: false,
			priority: "high",
		},
	]);

	function handleAddTask(e) {
		e.preventDefault();
		setTasks([
			...tasks,
			{
				id: +new Date(),
				task,
				description,
				date: date ? date : "No Date",
				status: false,
				priority,
			},
		]);
		console.log(tasks);
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

	function closeModal() {
		setIsClosing(true);
		setTimeout(() => {
			setShowModal(false);
			setIsClosing(false);
		}, 250);
	}

	return (
		<div className="w-full min-h-screen bg-indigo-950 p-5 text-white flex justify-center items-start">
			<div className="flex justify-center flex-col items-center bg-indigo-900 p-3 w-full xl:w-1/2 rounded-lg">
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
								Masukkan TODO
							</h1>
							<form className="px-5 pb-5 flex flex-col gap-3">
								<div className="flex flex-col">
									<label htmlFor="" className="text-xl">
										Task
									</label>
									<input
										type="text"
										placeholder="Masukkan Task"
										className="input"
										onChange={(e) => setTask(e.target.value)}
									/>
								</div>
								<div className="flex flex-col">
									<label htmlFor="" className="text-xl">
										Deskripsi
									</label>
									<textarea
										name=""
										id=""
										placeholder="Masukkan Deskripsi"
										className="input"
										maxLength={150}
										onChange={(e) => setDescription(e.target.value)}
									></textarea>
								</div>
								<div className="flex flex-col">
									<label htmlFor="" className="text-xl">
										Date
									</label>
									<input
										type="datetime-local"
										placeholder="Masukkan Deskripsi"
										className="input"
										onChange={(e) => setDate(e.target.value)}
									/>
								</div>
								<div className="flex flex-col">
									<label htmlFor="" className="text-xl">
										Task Priority
									</label>
									<select
										name=""
										id=""
										className="input"
										onChange={(e) => setPriority(e.target.value)}
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
										Add Task
									</button>
								</div>
							</form>
						</div>
					</div>
				)}

				{/* TASK */}
				<div className="w-full mt-2">
					{tasks.map((task) => (
						<div
							className="flex flex-col bg-blue-950 px-3 py-2 justify-start items-start rounded-lg border-2 relative mb-8"
							key={task.id}
						>
							<div
								className={`flex items-start justify-between w-full ${
									task.status ? "line-through" : ""
								}`}
							>
								<p className="text-2xl">{task.task}</p>
								<p className="">{task.date}</p>
							</div>
							<p className="text-sm mt-1 text-justify min-h-12">
								{task.description}
							</p>
							<div className="flex items-center gap-2 bg-slate-800 px-2 py-3 rounded-md absolute left-1/2 transform -translate-x-1/2 -bottom-5 border-2">
								{task.status ? (
									<FaRegCheckSquare onClick={() => handleStatusTask(task.id)} />
								) : (
									<FaRegSquare onClick={() => handleStatusTask(task.id)} />
								)}
								<FaEdit size={"1.1rem"} />
								<FaTrashAlt onClick={() => handleDeleteTask(task.id)} />
							</div>
							<div className="flex justify-end w-full">
								<p
									className={`text-sm text-center bg-${
										task.priority === "low"
											? "green"
											: task.priority === "medium"
											? "yellow"
											: "red"
									}-500 text-white rounded-md p-1 border w-1/4 font-bold`}
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
