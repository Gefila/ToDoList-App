export default function Form({
	showModal,
	closeModal,
	handleAddTask,
	taskTitle,
	setTaskTitle,
	description,
	setDescription,
	date,
	setDate,
	priority,
	setPriority,
	isEditTask,
	isClosing,
}) {
	return (
		<div className="fixed backdrop-blur-sm top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 ">
			<div
				className={`bg-indigo-500 xl:w-1/2 w-9/12 rounded-lg ${
					showModal ? "scale-in-center" : ""
				} ${isClosing ? "scale-out-center" : ""}`}
			>
				<h1 className="text-center py-3 text-lg font-bold">
					{!isEditTask ? "Masukkan" : "Edit"} TODO
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
							value={
								Number.isInteger(date)
									? new Date(date).toISOString().slice(0, 19)
									: date
							}
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
							{!isEditTask ? "Add Task" : "Edit Task"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
