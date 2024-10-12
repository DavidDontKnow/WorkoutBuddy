import React from 'react'
import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

export default function WorkoutForm() {
    const { dispatch } = useWorkoutsContext();

    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = { title, reps, load };

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setTitle('');
            setReps('');
            setLoad('');
            setError(null);
            setEmptyFields([]);
            console.log('New Workout Added:', json);
            dispatch({ type: 'CREATE_WORKOUT', payload: json });

        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h2>Create A New Workout</h2>
            <label>Workout Title:</label>
            <input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('Title') ? 'error' : ''}
            />
            <label>Reps:</label>
            <input
                type='number'
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('Reps') ? 'error' : ''}
            />
            <label>Load (LBS):</label>
            <input
                type='number'
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('Load') ? 'error' : ''}
            />
            <button type='submit'>Create Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}
