export default function Header({ setShowModal }) {
	return (
		<div className="w-full">
			<div className="py-3 bg-indigo-700 w-full text-center rounded-t-md">
				<h1 className="text-white">ToDoList App</h1>
			</div>
			<div className="flex w-full">
				<button
					className="bg-indigo-400 px-4 py-2 rounded-bl-md w-9/12 hover:bg-indigo-500"
					onClick={setShowModal}
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
		</div>
	);
}