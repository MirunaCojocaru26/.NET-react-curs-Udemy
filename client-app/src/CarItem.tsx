import React from 'react';
import {Icar} from './demo'

interface IProps{
    car:Icar
}

const CarItem: React.FC<IProps> = ({car}) =>{
    return(
        <div>
            <h1>{car.color}</h1>
        </div>
    )
}

export default CarItem