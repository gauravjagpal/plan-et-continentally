import React, { useState } from 'react'
import styles from '../../styles/Trip.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Alert, Card, Media } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';

const Trip = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        trip,
        country,
        activities,
        image,
        updated_at,
        tripPage
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner
    const history = useHistory();
    const [successMessage, setSuccessMessage] = useState('');

    // Allows user to edit trip
    const handleEdit = () => {
        history.push(`/trips/${id}/edit`);
    };

    // Allows user to delete a trip
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/trips/${id}/`);
            setSuccessMessage("Trip deleted successfully! You will now be redirected to your trips page");  // Show success message
            setTimeout(() => {
                setSuccessMessage('');
                history.push('/trips/mytrips');
            }, 3000);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {successMessage && (
                <Alert variant="success" className="text-center">
                    {successMessage}
                </Alert>
            )}
            <Card className={styles.Trip}>
                <Card.Body>
                    <Media className='align-items-center justify-content-between'>
                        <Link to={`/profiles/${profile_id}`}>
                            <Avatar src={profile_image} height={55} />
                            {owner}
                        </Link>
                        <div className='d-flex align-items-center'>
                            <span>{updated_at}</span>
                            {is_owner && tripPage && (<MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />)}
                        </div>
                    </Media>
                </Card.Body>
                <Link to={`/trips/${id}`}>
                    <div className={styles.imageWrapper}>
                        <Card.Img className={styles.tripImage} src={image} alt={trip} />
                    </div>
                </Link>
                <Card.Body>
                    {country && <Card.Text className={styles.Country}>Trip to: {country}</Card.Text>}
                    {trip && <Card.Title className='text-center'>{trip}</Card.Title>}
                    {activities && <Card.Text>{activities}</Card.Text>}
                </Card.Body>
            </Card>
        </>
    );
}

export default Trip