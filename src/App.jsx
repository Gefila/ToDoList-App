import { useEffect, useState } from "react";
import "./index.css";

import Header from "./components/Header";
import Task from "./components/Task";
import Form from "./components/Form";
import Time from "./components/Time";

function App() {
	const [showModal, setShowModal] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [isEditTask, setEditTask] = useState(false);
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
			deadline: false
		},
		{
			id: 2,
			task: "Minum",
			description: "Minum air putih",
			date: "2022-10-05T14:48:00",
			status: false,
			priority: "medium",
			deadline: false
		},
		{
			id: 3,
			task: "Tidur",
			description: "Tidur jam 8 malam",
			date: "2024-10-05T14:48:00",
			status: false,
			priority: "high",
			deadline: true
		},
	]);

	useEffect(() => {console.log(tasks)}, [tasks]);

	function addTask(e) {
		e.preventDefault();
		if (!taskTitle) {
			alert("Task tidak boleh kosong");
			return;
		}
		if (isEditTask) {
			setTasks(
				tasks.map((task) =>
					task.id === editId
						? {
								...task,
								task: taskTitle,
								description,
								date: date,
								priority,
								deadline: !date ? false : true
						}
						: task
				)
			);
			setEditTask(false);
		} else {
			setTasks([
				...tasks,
				{
					id: +new Date(),
					task: taskTitle,
					description,
					date: date ? date : Date.now(),
					status: false,
					priority: priority === "1" ? "low" : priority,
					deadline: !date ? false : true
				},
			]);
		}
	}

	function deleteTask(id) {
		setTasks(tasks.filter((task) => task.id !== id));
	}

	function statusTask(id) {
		setTasks(
			tasks.map((task) => {
				if (task.id === id) {
					task.status = !task.status;
				}
				return task;
			})
		);
	}

	function editTask(id) {
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
				<Header setShowModal={() => setShowModal(true)} />
					<Time/>
				{/* MODAL */}
				{showModal && (
					<Form
						showModal={showModal}
						closeModal={closeModal}
						handleAddTask={addTask}
						taskTitle={taskTitle}
						setTaskTitle={setTaskTitle}
						description={description}
						setDescription={setDescription}
						date={date}
						setDate={setDate}
						priority={priority}
						setPriority={setPriority}
						isEditTask={isEditTask}
						isClosing={isClosing}
					></Form>
				)}

				{/* TASK */}
				<Task
					tasks={tasks}
					handleDeleteTask={deleteTask}
					handleStatusTask={statusTask}
					handleEditTask={editTask}
				></Task>
			</div>
		</div>
	);
}

export default App;
