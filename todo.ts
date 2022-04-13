
import { ITodo } from './interface.js';


export class Todo {

    text: string;

    private id: string;

    constructor(todoItem: ITodo) {
        this.id = todoItem.id as string;
        this.text = todoItem.title;
    }

    static template(todo: Todo): string {
        return `
    <article class="todo" tabindex="0" data-id="${todo.id}">
        <span class="todo__text">${todo.text}</span>
        <div class="item-actions">
            <button type="button" class="item-actions__action">Complete</button>
            <button type="button" class="item-actions__action item-actions_type_delete">Delete</button>
        </div>
    </article>
    `;
    }


}
