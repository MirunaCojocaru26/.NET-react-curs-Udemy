let data =42;
data =14;

export interface Icar {
    color: String;
    model: String;
    topSpeed?: number;
}

const car1:Icar = {
    color: 'blue',
    model: 'BMW'
}

const car2:Icar ={
    color: 'red',
    model: 'Mercedes',
    topSpeed :100
}

const multiply = (x: number,y: number): void =>{
    x*y;
}

export const cars = [car1,car2];