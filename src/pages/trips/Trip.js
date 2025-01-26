import React from 'react'
import styles from '../../styles/Trip.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Card, Media } from 'react-bootstrap';
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
        image,
        updated_at,
        tripPage
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner
    const history = useHistory();

    const handleEdit = () => {
            history.push(`/trips/${id}/edit`);
        };
    
        const handleDelete = async () => {
            try {
                await axiosRes.delete(`/trips/${id}/`);
                history.goBack();
            } catch (err) {
                console.log(err);
            }
        };

    return <Card className={styles.Trip}>
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
            {trip && <Card.Title className='text-center'>{trip}</Card.Title>}
            {country && <Card.Text>{country}</Card.Text>}

        </Card.Body>
    </Card>
}

export default Trip