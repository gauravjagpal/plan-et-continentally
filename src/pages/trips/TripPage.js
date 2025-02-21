import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from '../../api/axiosDefaults'
import Trip from "./Trip";

function TripPage() {
    const { id } = useParams();
    const [trip, setTrip] = useState({ results: [] })

    // Function to fetch trip data when component mounts or the id changes
    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: trip }] = await Promise.all([
                    axiosReq.get(`/trips/${id}`),
                ])
                setTrip({results: [trip]})
                console.log(trip)
            } catch (err) {
                console.log(err)
            }
        }
        handleMount()
    }, [id])


    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2 mx-auto mt-5" lg={8}>
                <Trip {...trip.results[0]} setTrips={setTrip} tripPage />
            </Col>
        </Row>
    );
}

export default TripPage;