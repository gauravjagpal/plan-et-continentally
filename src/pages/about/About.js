import React from 'react'
import { Col } from 'react-bootstrap';

const About = () => {
    return (
        <Col className="py-3 pt-md-4 p-0 p-md-2 mx-auto" md={7} lg={8}>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">About Plan-et Continentally (Beta)</h1>
                <p className="mb-4">
                    <strong>Plan-et Continentally</strong> is a social media platform designed to
                    inspire travelers by allowing users to post photos of their
                    holidays, share travel experiences, and gather ideas for future trips.
                </p>
                <p>
                    <strong>Register now for early access!</strong>
                </p>

                <h2 className="text-2xl font-bold mt-6 mb-2">How to engage:</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Create and edit personal travel posts.</li>
                    <li>Follow other users for travel inspiration.</li>
                    <li>Favorite posts to save for later viewing.</li>
                    <li>Engage with other users through comments and follows.</li>
                    <li>Add private trip planning notes visible only to the user</li>
                </ul>

                <h2 className="text-2xl font-bold mt-6 mb-2">Future Features</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Share posts with friends via links.</li>
                    <li>Search and filter options by continent and city.</li>
                    <li>
                        Features coming soon!

                        <ul className="pl-4" style={{ listStyleType: "none" }}>
                            <li><strong>Phase 1:</strong> Share posts with friends via links.</li>
                            <li><strong>Phase 2:</strong> Let friends who have the link collab and edit trips.</li>
                            <li><strong>Phase 3:</strong> Make trips public for all viewers.</li>
                        </ul>
                    </li>
                    <li>Accommodation suggestions and recommendations.</li>
                </ul>
            </div>
        </Col>);
};

export default About