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
					<div className="fixed backdrop-blur-sm top-0 left-0 right-0 bottom-0 flex items-center justify-center">
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
									/>
								</div>
								<div className="flex flex-col">
									<label htmlFor="" className="text-xl">
										Deskripsi
									</label>
									<input
										type="text"
										placeholder="Masukkan Deskripsi"
										className="input"
									/>
								</div>
								<div className="flex flex-col">
									<label htmlFor="" className="text-xl">
										Date
									</label>
									<input
										type="datetime-local"
										placeholder="Masukkan Deskripsi"
										className="input"
									/>
								</div>
								<div className="flex flex-col">
									<label htmlFor="" className="text-xl">
										Task Priority
									</label>
									<select name="" id="" className="input">
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
									<button className="bg-indigo-700 px-4 py-2 w-full rounded-md hover:bg-indigo-800">
										Add Task
									</button>
								</div>
							</form>
						</div>
					</div>
				)}

			</div>
		</div>
	);
}

export default App;
