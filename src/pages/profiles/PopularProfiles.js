import React, { useEffect, useState } from 'react'
import appStyles from '../../App.module.css'
import { Container } from 'react-bootstrap'
import { axiosReq } from '../../api/axiosDefaults'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import Asset from '../../components/Asset'
import Profile from './Profile'

const PopularProfiles = ({ mobile }) => {
  const [profileData, setProfileData] = useState({
    //
    pageProfile: { results: [] },
    PopularProfiles: { results: [] },

  })

  const { PopularProfiles } = profileData
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          'profiles/?ordering=-followers_count'
        );
        setProfileData(prevState => ({
          ...prevState,
          PopularProfiles: data,
        }))
      } catch (err) {
        console.log(err)
      }
    }

    handleMount();
  }, [currentUser])

  return (
    <Container className={`${appStyles.Content} ${mobile && 'd-lg-none text-center mb-3'} `}>
      {PopularProfiles.results.length ? (
        <>
          <p><strong>Most followed profiles:</strong></p>
          {mobile ? (
            <div className='d-flex justify-content-around'>
              {PopularProfiles.results.slice(0,4).map(profile => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ): (
            PopularProfiles.results.map(profile => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
          
        </>
      ) : (
        <Asset spinner />
      )}

    </Container>
  )
}

export default PopularProfiles