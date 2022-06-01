import React, { useState, useEffect } from 'react'
import { getbubbleSortAnime } from '../bubbleSort';
import './SortingVisualizer.css';

const SortingVisualizer = () => {

    const ANIMATION_SPEED_MS = 500;
    const NUMBER_OF_ARRAY_BARS = 20;
    const PRIMARY_COLOR = 'turquoise';
    const SECONDARY_COLOR = 'red';

    const [array, setArray] = useState([]);

    const randomVal = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    const resetArray = () => {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomVal(0, 100));
        }
        setArray(array);
    }


    useEffect(() => {
        resetArray()
    }, []);



    const BubbleSort = () => {
        const animations = getbubbleSortAnime(array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = animations[i][2];
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }
    console.log(array)

    return (
        <div>
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                            backgroundColor: PRIMARY_COLOR,
                            height: `${value}px`,
                        }}></div>
                ))}
                <button onClick={() => resetArray()} id="button-container">Generate New Array</button>
                <button onClick={() => BubbleSort()}>Bubble  sort the array</button>
            </div>
        </div>
    )
}

export default SortingVisualizer;