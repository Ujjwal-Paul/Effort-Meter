import { useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import { getTime } from './utils';


export default function Progress({ totalTime }) {
    const [mouseIn, setMouseIn] = useState(false);

    const percentage = Math.trunc(totalTime / (8 * 36));

    return (
        <div className="progress-container">
            <div className="progress-bar" onMouseEnter={() => setMouseIn(true)} onMouseLeave={() => setMouseIn(false)}>
                <CircularProgressbar
                    value={percentage}
                    styles={{
                        path: {
                            stroke: `#0a9396`,
                            strokeLinecap: 'butt',
                            transition: 'stroke-dashoffset 0.5s ease 0s',
                        },
                        trail: {
                            stroke: '#222',
                        },
                        text: {
                            fill: '#0a9396',
                            fontSize: '16px',
                        },
                    }}
                />

                <div className="text">
                    {mouseIn ?
                        <>
                            <p>{getTime(totalTime)}</p>
                            <p style={{ fontSize: 'min(24px, 6vw)' }}>out of 8hr</p>
                        </>
                        :
                        <>
                            <p>{`${percentage}%`}</p>
                            <p>Done</p>
                        </>
                    }
                </div>
            </div>
            
        </div>
    )
}