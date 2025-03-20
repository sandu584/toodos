import AddTodo from "./components/AddTodo"
import Todos from "./components/Todos"


function App() {

	return (
		<div className="h-screen w-full flex flex-col justify-end bg-black text-white">
			<Todos/>
			<AddTodo/>
		</div>
	)
}

export default App
