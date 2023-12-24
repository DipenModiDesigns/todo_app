<template>
    <toast v-bind:notFoundError="notFoundError" v-if="notFoundError != null" />
	<section class="py-20 text-center text-white">
		<div class="container">
			<h1 class="text-[30px] mb-5">Here you can create and manage To-Do</h1>
			<div class="bg-gray-800 max-w-5xl w-full mx-auto rounded-xl shadow-lg px-5 py-6">
				<div class="addTodoItem">
					<form action="addToDo" ref="addTodoForm" @submit.prevent="addToDo()"
						class="flex items-stretch justify-center">
						<div class="control">
							<input v-model="inputVal" type="text"
								class="rounded-lg outline-none focus:ring-0 border-primary-500 focus:border-primary-700 bg-transparent text-white border-r-0 rounded-r-none px-3.5 leading-4"
								placeholder="Add item" />
						</div>
						<div class="control flex gap-x-4 mb-5">
							<button
								class="text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 rounded-l-none border-primary-500 bg-primary-600 hover:bg-primary-700 focus:outline-none"
								type="submit">
								Add Task
							</button>
							<button
								class="text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 border-red-500 bg-red-600 hover:bg-red-700 focus:outline-none"
								type="button" @click="clearCompleted()">
								Clear Completed
							</button>
						</div>
					</form>
					<ul v-if="todos && this.previewEnabled == false">
						<li v-for="todo in todos" :key="todo.id">
							<a href="javascript:void(0)" @click="toggleTodo(todo)"
								class="py-3 px-5 bg-gray-700 text-left hover:bg-gray-900 transition-all flex gap-4 items-center"
								:class="{
									'bg-gray-900 line-through': todo.status == true,
								}"><input type="checkbox" id="" :checked="todo.status == true" class="checkboxDesign" />
								{{ todo.text }}</a>
						</li>
					</ul>
					<ul v-if="previewTodos && this.previewEnabled == true">
						<li v-for="previewTodo in previewTodos" :key="previewTodo.id">
							<a href="javascript:void(0)" @click="toggleTodo(previewTodo)"
								class="py-3 px-5 bg-gray-700 text-left hover:bg-gray-900 transition-all flex gap-4 items-center"
								:class="{
									'bg-gray-900 line-through': previewTodo.status == true,
								}"><input type="checkbox" id="" :checked="previewTodo.status == true" class="checkboxDesign" />
								{{ previewTodo.text }}</a>
						</li>
					</ul>
					<div class="flex gap-x-5 mt-5 justify-center">
						<button
							class="text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 border-primary-500 bg-primary-600 hover:bg-primary-700 focus:outline-none"
							type="button" @click="showView('all')">
							Show All
						</button>
						<button
							class="text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 border-primary-500 bg-primary-600 hover:bg-primary-700 focus:outline-none line-through"
							type="button" @click="showView('completed')">
							Show Completed
						</button>
						<button
							class="text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 border-primary-500 bg-primary-600 hover:bg-primary-700 focus:outline-none"
							type="button" @click="showView('remaining')">
							Show Remaining
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import toast from "../components/toast.vue";

export default {
	name: "TodoItems",
	data() {
		return {
			inputVal: "",
			todos: [],
			previewTodos: [],
			previewEnabled: false,
			notFoundError: "",
		};
	},
	components: {
		toast,
	},
	created() {
		document.title = "Todo Items";

		// retrieving our data and converting it back into an array
		let retrievedData = localStorage.getItem("todos");
		// console.log("retrievedData =>", JSON.parse(retrievedData));
		this.todos = JSON.parse(retrievedData);
		this.notFoundError = null;
	},
	mounted() { },
	watch: {},
	methods: {
		addToDo() {
			if (this.inputVal.trim() !== "") {
				let newItem = this.inputVal.trim("");
				let results = false;
				this.notFoundError = null;

				if (this.todos != null) {
					results = this.todos.some(function (entry) {
						return entry.text === newItem;
					});
				}

				if (!results) {
					this.todos = this.todos ?? [];
					this.todos.push({
						text: newItem,
						status: false,
					});
				} else {
					this.notFoundError = "This item exists already.";
				}
				this.$refs.addTodoForm.reset();
				localStorage.todos = JSON.stringify(this.todos);
			} else {
				// alert("Please add text")
				this.notFoundError = "Please add valid text / list";
			}

			this.inputVal = "";
		},
		toggleTodo(todo) {
            if (this.todos != null) {
                todo.status = !todo.status;
                localStorage.todos = JSON.stringify(this.todos);
            } else {
				// alert("Please add text")
				this.notFoundError = "Please add valid text / list";
			}
		},
		showView(view) {
			if (this.todos != null) {
                if (view == 'completed') {
                    this.previewEnabled = true;
                    this.previewTodos = this.todos.filter(todo => todo.status);
                } else if (view == 'remaining') {
                    this.previewEnabled = true;
                    this.previewTodos = this.todos.filter(todo => !todo.status);
                } else {
                    this.previewEnabled = false;
                    this.previewTodos = [];
                    this.todos = this.todos;
                }
            } else {
				// alert("Please add text")
				this.notFoundError = "Please add valid text / list";
			}
		},
		clearCompleted() {
            if (this.todos != null) {
                this.todos = this.todos.filter(todo => !todo.status);
                localStorage.todos = JSON.stringify(this.todos);   
            } else {
				// alert("Please add text")
				this.notFoundError = "Please add valid text / list";
			}
		},
	},
};
</script>
