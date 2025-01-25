import React from 'react'
import styles from '../../styles/Trip.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Card, Media } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Trip = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        trip,
        country,
        image,
        updated_at,
        tripPage
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

    return <Card className={styles.Trip}>
        <Card.Body>
            <Media className='align-items-center justify-content-between'>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} height={55} />
                    {owner}
                </Link>
                <div className='d-flex align-items-center'>
                    <span>{updated_at}</span>
                    {is_owner && tripPage && '...'}
                </div>
            </Media>
        </Card.Body>
        <Link to={`/trips/${id}`}>
            <Card.Img src={image} alt={trip} />
        </Link>
        <Card.Body>
            {trip && <Card.Title className='text-center'>{trip}</Card.Title>}
            {country && <Card.Text>{country}</Card.Text>}

        </Card.Body>
    </Card>
}

export default Trip