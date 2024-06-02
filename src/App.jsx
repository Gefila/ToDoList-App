import { useState } from "react";
import "./index.css";

function App() {
	const [showModal, setShowModal] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	function closeModal() {
		setIsClosing(true);
		setTimeout(() => {
			setShowModal(false);
			setIsClosing(false);
		}, 250);
	}

	return (
		<div className="w-full h-screen bg-indigo-950 p-5 text-white flex justify-center items-start">
			<div className="flex justify-center flex-col items-center bg-indigo-900 p-3 w-full xl:w-1/2">
				<div className="py-3 bg-indigo-800 w-full text-center">
					<h1 className="text-white">ToDoList App</h1>
				</div>
				<button
					className="bg-indigo-400 px-4 py-2 w-full"
					onClick={() => setShowModal(true)}
				>
					Add Task
				</button>
				{showModal && (
					<div className="fixed backdrop-blur-sm top-0 left-0 right-0 bottom-0 flex items-center justify-center">
						<div
							className={`bg-indigo-500 xl:w-1/2 w-9/12 rounded-lg ${
								closeModal ? "scale-in-center" : ""
							} ${isClosing ? "scale-out-center" : ""}`}
						>
							<h1 className="text-center py-3 text-lg font-bold">Masukkan TODO</h1>
							<form className="px-5 pb-5 flex flex-col gap-3">
								<div className="flex flex-col">
									<label htmlFor="" className="text-xl">
										Task
									</label>
									<input
										type="text"
										placeholder="Masukkan Task"
										className="px-3 py-2 rounded-md text-black"
									/>
								</div>
								<div className="flex flex-col">
									<label htmlFor="" className="text-xl">
										Deskripsi
									</label>
									<input
										type="text"
										placeholder="Masukkan Deskripsi"
										className="px-3 py-2 rounded-md text-black"
									/>
								</div>
								<div className="flex flex-col">
									<label htmlFor="" className="text-xl">
										Date
									</label>
									<input
										type="datetime-local"
										placeholder="Masukkan Deskripsi"
										className="px-3 py-2 rounded-md text-black"
									/>
								</div>
								<div className="flex flex-col">
									<label htmlFor="" className="text-xl">
										Task Priority
									</label>
									<select name="" id="" className="text-black px-3 py-2 rounded-md">
										<option value="1" selected disabled>Select Task Priority</option>
										<option value="low">Low</option>
										<option value="medium">Medium</option>
										<option value="high">High</option>
									</select>
								</div>
								<div className="flex mt-5 gap-4">
									<button
										className="bg-indigo-400 px-4 py-2 w-full rounded-md"
										onClick={closeModal}
										type="button"
									>
										Cancel
									</button>
									<button className="bg-indigo-700 px-4 py-2 w-full rounded-md">
										Add Task
									</button>
								</div>
							</form>
						</div>
					</div>
				)}

				<div>Task</div>
			</div>
		</div>
	);
}

export default App;
