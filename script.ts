const $todoList = document.querySelector('.todos') as HTMLElement;
const $form = document.querySelector('.todo-add-form') as HTMLFormElement;
const $formInput = $form.querySelector('.todo-input') as HTMLInputElement;
const $searchInput = document.querySelector('.header__search') as HTMLInputElement;;
import { TodoList } from './todolist.js';
import { ITodo } from './interface.js';
import Api from './api.js';

const myTodoList = new TodoList($todoList);
const renderList = (searchParam?: string): Promise<void> => {
    return Api.query(searchParam).then((todos: ITodo[]) => {
        myTodoList.clearHtml();
        todos.forEach((item: ITodo): void => {
            myTodoList.add(item);
        });
    });
}

$todoList.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('item-actions_type_delete')) {
        const todoItem = target.closest('.todo') as HTMLElement;
        const itemId = todoItem.dataset.id as string;

        Api.destroy(itemId).then(() => {
            myTodoList.remove(itemId);
        })
    }
});

$form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = $formInput.value;
    const todoItem: ITodo = {
        title: value,
        tags: []
    }

    try {
        const newItem = await Api.create(todoItem);

        myTodoList.add(newItem);
        $form.reset();
    } catch (err: Error) {
        alert(err)
    }
});

$searchInput.addEventListener('input', (event) => {
    const input = event.target as HTMLInputElement;
    const searchValue = input.value;

    renderList(searchValue);
});


renderList();