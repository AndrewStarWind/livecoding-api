import { ITodo } from './interface';


class Api {

   static query(searchParam?: string): Promise<ITodo[]> {
      return fetch(Api._url, {
         headers: {
            'Content-Type': 'application/json'
         },
         method: 'GET'
      }).then((res) => res.json()).then((collection: ITodo[]) => {
         if (searchParam && searchParam.length > 1) {
            return collection.filter((item) => {
               return item.title.includes(searchParam);
            })
         }
         return collection;
      });
   }

   static create(item: ITodo): Promise<ITodo> {
      return fetch(Api._url, {
         headers: {
            'Content-Type': 'application/json'
         },
         method: 'POST',
         body: JSON.stringify(item)
      }).then((res) => res.json());
   }

   static destroy(id: string): Promise<void> {
      return fetch(`${Api._url}${id}`, {
         headers: {
            'Content-Type': 'application/json'
         },
         method: 'DELETE'
      }).then((res) => res.json());
   }

   private static _url: string = 'http://localhost:3004/todos/';
}

export default Api;