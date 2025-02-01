import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Alert, Image } from "react-bootstrap";
import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png";
import styles from "../../styles/TripCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function TripCreateForm() {
  const [errors, setErrors] = useState({});
  const [tripData, setTripData] = useState({
    trip: "",
    activities: "",
    image: "",
    country: "",
  });
  const [countries, setCountries] = useState([]); // Store countries here
  const imageInput = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axiosReq.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  const handleChange = (event) => {
    setTripData({
      ...tripData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(tripData.image);
      setTripData({
        ...tripData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("trip", tripData.trip);
    formData.append("activities", tripData.activities);
    formData.append("country", tripData.country);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/trips/", formData);
      history.push(`/trips/${data.id}`);
    } catch (err) {
      console.error("Error creating trip:", err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="d-flex justify-content-center align-items-center mt-5">
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center align-items-center`}
          >
            {/* Image Upload */}
            <Form.Group className="text-center">
              {tripData.image ? (
                <figure>
                  <Image className={appStyles.Image} src={tripData.image} rounded />
                </figure>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset src={Upload} message="Click to upload an image" />
                </Form.Label>
              )}
              <Form.Control
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Container>

          {/* Trip Fields */}
          <Container className={appStyles.Content}>
            <Form.Group>
              <Form.Label>Trip to:</Form.Label>
              <Form.Control
                type="text"
                name="trip"
                value={tripData.trip}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.trip?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            {/* Country Selector */}
            <Form.Group>
              <Form.Label>Country*</Form.Label>
              <Form.Control
                as="select"
                name="country"
                value={tripData.country}
                onChange={handleChange}
              >
                <option value="">Select a country</option>
                {countries.map((countryObj, idx) => (
                  <option key={idx} value={countryObj.cca2}>
                    {countryObj.name.common}
                  </option>
                ))}
              </Form.Control>
              {errors?.country?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form.Group>

            {/* Activities */}
            <Form.Group>
              <Form.Label>Activities</Form.Label>
              <Form.Control
                as="textarea"
                name="activities"
                rows={3}
                value={tripData.activities}
                onChange={handleChange}
              />
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
              Create
            </Button>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default TripCreateForm;
