import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function WorkoutDetails({ workout }) {
    const { dispatch } = useWorkoutsContext();
    const handelClick = async () => {
        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: 'DELETE',
        });
        const json = await response.json();
        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json });
        }
    }
    return (
        <div className='workout-details'>
            <h3>{workout.title}</h3>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p><strong>Load (LBS): </strong>{workout.load}</p>
            <p><strong>Created: </strong>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className='material-symbols-outlined' onClick={handelClick}>delete</span>
        </div>
    )
}
