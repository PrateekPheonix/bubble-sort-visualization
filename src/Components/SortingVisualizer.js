import React, { useState, useEffect } from 'react'
import { getbubbleSortAnime } from '../bubbleSort';
import './SortingVisualizer.css';

const SortingVisualizer = () => {

    const [array, setArray] = useState([]);



    const randomVal = (min, max) => {
        return Math.floor((Math.random() * (max - min + 1) + min) * 2);
    }
    const resetArray = () => {
        const array = [];
        for (let i = 0; i < 20; i++) {
            array.push(randomVal(0, 100));
        }
        setArray(array);
    }


    useEffect(() => {
        resetArray()
        // eslint-disable-next-line
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
                const color = i % 2 === 0 ? 'red' : 'lightseagreen';

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 500);

            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * 500);
            }
        }
    }
    console.log(array)

    return (
        <div className="array-container">
            <div className='graph-container'>
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                            backgroundColor: 'lightseagreen',
                            height: `${value}px`,
                        }}></div>
                ))}
            </div>
            <div className='button-container'>
                <div onClick={() => resetArray()} id="button">
                    <button class="button">Generate a new graph</button>
                </div>
                <div onClick={() => BubbleSort()} id="button">
                    <button class="button">Bubble Sort</button>
                </div>
            </div>
        </div>
    )
}

export default SortingVisualizer;