interface Team<T> {
    add(item: string): void;
    getNext(): string;
    size(): number;
}

class Player<T> implements Team<T> {
    public storage: string[] = [];

    constructor(private capacity: number = Infinity) {}

    add(item: string): void {
        if (this.size() === this.capacity) {
        throw Error("Queue has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
    }
    getNext(): string{
        let result = this.storage.shift();
        return result!
    }
    size(): number {
        return this.storage.length;
    }
}

export const Tbanglore = new Player()

Tbanglore.add("Kirat_Boli")
Tbanglore.add("NS_Sodhi")
Tbanglore.add("R_Rumrah")
Tbanglore.add("Shashi_Henra")

// console.log(Tbanglore.storage)