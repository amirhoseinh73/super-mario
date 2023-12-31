export class Matrix {
    grid: MatrixValue[][];
    constructor() {
        this.grid = [];
    }

    public forEach(callback: (tile: MatrixValue, x: number, y: number) => void) {
        this.grid.forEach((column, x) => {
            column.forEach((value, y) => {
                callback(value, x, y);
            });
        });
    }

    public delete(x: number, y: number) {
        const col = this.grid[x];

        if (col) delete col[y];
    }

    public get(x: number, y: number) {
        const col = this.grid[x];

        if (col) return col[y];
    }

    public set(x: number, y: number, value: MatrixValue) {
        if (!this.grid[x]) {
            this.grid[x] = [];
        }

        this.grid[x][y] = value;
    }
}

export class Vec2 {
    x!: number;
    y!: number;

    constructor(x: number, y: number) {
        this.set(x, y);
    }

    public copy(vec2: Vec2) {
        this.x = vec2.x;
        this.y = vec2.y;
    }

    public set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
