import {useEffect, useState} from "react";
import style from './Graph.module.css';
import {Spinner} from 'evergreen-ui';
//npm install evergreen-ui

export default function Graph(props) {
    const [isLoading, setIsLoading] = useState(true);

    const graphConfig = {
        type: props.type,
        data: {
            labels: props.labels,
            datasets: [
                {
                    label: props.label,
                    data: props.data
                }
            ]
        }
    }

    const encodedGraphConfig = encodeURIComponent(JSON.stringify(graphConfig));
    const apiUrl = `https://quickchart.io/chart?c=${encodedGraphConfig}`;

    const graphGenerator = async () => {
        const data = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.blob())
            .then((imageBlob) => {
                const imageUrl = URL.createObjectURL(imageBlob);
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.width = 500;

                // Create a unique container for each chart
                const graphContainer = document.querySelector(`#${props.id}`);
                graphContainer.innerHTML = '';
                graphContainer.appendChild(imgElement);

                setIsLoading(false);
            })
    }

    useEffect(() => {
        graphGenerator()
    }, [props.data, props.id])

    return (
        <>             
            {isLoading && <Spinner />}
            <div id={props.id} className={style.graph}></div>
        </>
    )
}