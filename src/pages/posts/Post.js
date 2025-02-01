import React from 'react'
import styles from '../../styles/Post.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';

const Post = (props) => {
    const {
        id, owner, profile_id, profile_image,
        comments_count, favourite_id, favourites_count, title,
        content, image, updated_at, postPage, setPosts,
        country
    } = props

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner
    const history = useHistory();

    // Allows a user to edit a post
    const handleEdit = () => {
        history.push(`/posts/${id}/edit`);
    };

    // Allows a user to delete a post
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/posts/${id}/`);
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    // Allows a user to favourite a post
    const handleFavourite = async () => {
        try {
            const { data } = await axiosRes.post('/favourites/', { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? {
                            ...post,
                            favourites_count: (Number(post.favourites_count) || 0) + 1,  // Ensure it's a number
                            favourite_id: data.id,
                        }
                        : post;
                })
            }))
        } catch (err) {
            console.log(err);
        }
    }
    
    // Allows a user to unfavourite a post
    const handleUnfavourite = async () => {
        try {
            await axiosRes.delete(`/favourites/${favourite_id}/`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, favourites_count: post.favourites_count - 1, favourite_id: null }
                        : post;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card className={styles.Post} >
            <Card.Body>
                <Media className='align-items-center justify-content-between' >
                    <Link to={`/profiles/${profile_id}`} >
                        <Avatar src={profile_image} height={55} />
                        {owner}
                    </Link>
                    <div className='d-flex align-items-center'>
                        <span>{updated_at}</span>
                        {is_owner && postPage && (<MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />)}

                    </div>
                </Media>
            </Card.Body>
            <Link to={`/posts/${id}`}>
                <div className={styles.imageWrapper}>
                    <Card.Img className={styles.postImage} src={image} alt={title} />
                </div>
            </Link>
            <Card.Body>
                {country && <Card.Text className={styles.Country}>Trip to: {country}</Card.Text>}
                {title && <Card.Title className='text-center'>{title}</Card.Title>}
                {content && <Card.Text>{content}</Card.Text>}
                <div className={styles.PostBar}>
                    {is_owner ? (
                        <OverlayTrigger placement='top' overlay={<Tooltip>You can't favourite your own post!</Tooltip>}>
                            <i className='far fa-heart' />
                        </OverlayTrigger>
                    ) : favourite_id ? (
                        <span onClick={handleUnfavourite}>
                            <i className={`fas fa-heart ${styles.Heart}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleFavourite}>
                            <i className={`far fa-heart ${styles.HeartOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger placement='top' overlay={<Tooltip>Log in to favourite a post</Tooltip>}>
                            <i className='far fa-heart' />
                        </OverlayTrigger>
                    )}
                    {isNaN(favourites_count) ? 0 : favourites_count}
                    <Link to={`/posts/${id}`}>
                        <i className='far fa-comments' />
                    </Link>
                    {comments_count}

                </div>
            </Card.Body>
        </Card>
    )
}

export default Post