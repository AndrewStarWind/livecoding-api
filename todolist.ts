import { Todo } from './todo.js';
import { ITodo } from './interface.js';

interface IList {
    add(text: string): void;
    remove(id: string): void;
    search(text: string): void;
}
export class TodoList implements IList {
    constainer: HTMLElement;
    constructor(container: HTMLElement) {
        this.constainer = container;
    }

    add(todoItem: ITodo): Todo {
        const myTodo = new Todo(todoItem);
        const template = Todo.template(myTodo);
        this.constainer.insertAdjacentHTML('beforeend', template);
        return myTodo;
    }

    remove(id: string): void {
        this.constainer.querySelector(`[data-id='${id}']`)?.remove();
    }
    search(searchStr: string) {

        if (searchStr.length < 2) {
            [...this.constainer.querySelectorAll('.hide')].forEach(($todo) => $todo.classList.remove('hide'));
            return;
        }

        [...this.constainer.querySelectorAll('.todo')].forEach(($todo) => {
            const todoText = $todo.querySelector('.todo__text')?.textContent;

            if (todoText?.includes(searchStr)) {
                $todo.classList.remove('hide');
            } else {
                $todo.classList.add('hide');
            }
        });
    }

    clearHtml(): void {
        this.constainer.innerHTML = '';
    }
}

