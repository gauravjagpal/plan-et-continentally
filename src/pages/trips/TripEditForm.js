import React, { useRef, useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import styles from "../../styles/TripCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom";


const TripEditForm = () => {
  const [errors, setErrors] = useState({});

  const [tripData, setTripData] = useState({
    trip: "",
    activities: "",
    image: "",
    country: ""
  });

  const [countries, setCountries] = useState([]); // State to store countries
  const { trip, activities, image, country } = tripData;


  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/trips/${id}/`)
        const { trip, country, activities, image, is_owner } = data;

        is_owner ? setTripData({ trip, country, activities, image }) : history.push("/");
      } catch (err) {
        console.log(err)
      }
    };

    handleMount();
  }, [history, id]);

  // Fetch countries from API on component mount
  useEffect(() => {

    const fetchCountries = async () => {
      try {
        const response = await axiosReq.get("https://restcountries.com/v3.1/all");
        const sortedCountries = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Handle form field changes
  const handleChange = (event) => {
    setTripData({
      ...tripData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle image file changes
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setTripData({
        ...tripData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

   // Handle form submission to update trip data
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Append form data
    formData.append("trip", trip);
    formData.append("activities", activities);
    formData.append("country", country);
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/trips/${id}/`, formData);
      history.push(`/trips/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };


  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Trip</Form.Label>
        <Form.Control type="text" name="trip" value={trip} onChange={handleChange} />
      </Form.Group>
      {errors?.trip?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Country</Form.Label>
        <Form.Control as="select" name="country" value={country} onChange={handleChange}>
          <option value={country}>{country}</option>
          {countries.map((countryObj, idx) => (
            <option key={idx} value={countryObj.name.common}>
              {countryObj.name.common}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Activities</Form.Label>
        <Form.Control as="textarea" name="activities" rows={6} value={activities} onChange={handleChange} />
      </Form.Group>
      {errors?.activities?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Update
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Activities} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">

              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label className={`${btnStyles.Button} ${btnStyles.Blue} btn`} htmlFor="image-upload" >
                  Change the image
                </Form.Label>
              </div>

              <Form.File id="image-upload" accept="image/*" onChange={handleChangeImage} ref={imageInput} />

            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Activities}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default TripEditForm;