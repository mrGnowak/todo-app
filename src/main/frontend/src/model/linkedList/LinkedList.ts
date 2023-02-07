import Node from "./node";
import { ILinkedList } from "./ILinkedList";

class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null = null;
    
    public insertInBegin(data: T): Node<T> {
      const node = new Node(data);
      if (!this.head) {
        this.head = node;
      } else {
        node.next = this.head;
        this.head = node;
      }
      return node;
    }
  
    public deleteNode(node: Node<T>): void {
        this.head = node.next;
      
    }
  
    public search(comparator: (data: T) => boolean): Node<T> | null {
      const checkNext = (node: Node<T>): Node<T> | null => {
        if (comparator(node.data)) {
          return node;
        }
        return node.next ? checkNext(node.next) : null;
      };
  
      return this.head ? checkNext(this.head) : null;
    }
  
    public traverse(): T[] {
      const array: T[] = [];
      if (!this.head) {
        return array;
      }
  
      const addToArray = (node: Node<T>): T[] => {
        array.push(node.data);
        return node.next ? addToArray(node.next) : array;
      };
      return addToArray(this.head);
    }
  
    public size(): number {
      return this.traverse().length;
    }
  }
  interface Post {
    title: string;
  }
  const linkedList = new LinkedList<Post>();
  
  linkedList.traverse() // [];
  
  linkedList.insertInBegin({ title: "Post C" });
  linkedList.insertInBegin({ title: "Post D" });
  
  linkedList.traverse() // [{ title : "Post D" }, { title : "Post C" }, { title : "Post A" }, { title : "Post B" }];
  linkedList.search(({ title }) => title === "Post A") // Node { data: { title: "Post A" }, prev: Node, next: Node};
  