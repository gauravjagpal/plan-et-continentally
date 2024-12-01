import React from 'react'
import styles from '../../styles/Post.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import axios from 'axios';
import { axiosRes } from '../../api/axiosDefaults';

const Post = (props) => {
    const {
        id, owner, profile_id, profile_image,
        comments_count, favourite_id, favourites_count, title,
        content, image, updated_at, postPage, setPosts
    } = props

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

    const handleFavourite = async () => {
        try {
            const { data } = await axiosRes.post('/favourites/', { post: id })
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, favourites_count: post.favourites_count + 1, favourite_id: data.id }
                        : post;
                })
            }));
        } catch (err) {
            console.log(err);
        }
    }

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
                    </Link>
                    <div className='d-flex align-items-center'>
                        <span>{updated_at}</span>
                        {is_owner && postPage && "..."}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/posts/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
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
                    {favourites_count}
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