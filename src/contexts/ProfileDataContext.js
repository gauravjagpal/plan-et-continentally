import React, { createContext, useState, useContext, useEffect } from 'react';
import { useCurrentUser } from './CurrentUserContext';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { followHelper } from '../utils/utils';



export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
    // Initialize state for profile data
    const [profileData, setProfileData] = useState({
        //
        pageProfile: { results: [] },
        PopularProfiles: { results: [] },
    
      })
    
      const currentUser = useCurrentUser();

      const handleFollow = async (clickedProfile) => {
        try {
          const {data} = axiosRes.post('/followers/', {
            followed: clickedProfile.id
          });

          setProfileData(prevState => ({
            ...prevState,
            pageProfile: {
              results: prevState.pageProfile.resultsmap((profile) => followHelper(profile, clickedProfile, data.id)),
            },
            PopularProfiles: {
              ...prevState.PopularProfiles,
              results: prevState.PopularProfiles.results.map((profile) => followHelper(profile, clickedProfile, data.id)),
            },
          }));
        } catch(err) {
          console.log(err);
        }
      }
    
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
        <ProfileDataContext.Provider value={profileData}>
            <SetProfileDataContext.Provider value={{ setProfileData, handleFollow }}>
                {children}
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    );
};
