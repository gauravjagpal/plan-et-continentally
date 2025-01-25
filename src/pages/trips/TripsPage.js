import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Trip from './Trip'
import Asset from '../../components/Asset'
import { useLocation } from "react-router";
import appStyles from "../../App.module.css";
import styles from "../../styles/TripsPage.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png"

function TripsPage({ message, filter = "" }) {
    const [trips, setTrips] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const currentUser = useCurrentUser();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const { data } = await axiosReq.get(`/trips/?${filter}search=${query}`)
                setTrips(data)
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchTrips();
        }, 1000)
        return () => {
            clearTimeout(timer);
        }
    }, [filter, query, pathname, currentUser])

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <Button 
                    href="/trips/create"
                    className={`${btnStyles.Button} ${btnStyles.Blue}`}
                    type="submit">
                    <i className='far fa-plus-square'></i>Add trip
                </Button>
                {hasLoaded ? (
                    <>
                        {trips.results.length ? (
                            <InfiniteScroll
                                children={
                                    trips.results.map(trip => (
                                        <Trip key={trip.id} {...trip} setTrips={setTrips} />
                                    ))
                                }
                                dataLength={trips.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!trips.next}
                                next={() => fetchMoreData(trips, setTrips)}
                            />

                        ) : (
                            <Container className={appStyles.Content}>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular profiles for desktop</p>
            </Col>
        </Row>
    );
}

export default TripsPage;