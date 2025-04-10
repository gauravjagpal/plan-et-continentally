import styles from './App.module.css';
import NavBar from "./components/NavBar";
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom'
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import PostEditForm from './pages/posts/PostEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import TripCreateForm from './pages/trips/TripCreateForm';
import TripPage from './pages/trips/TripPage';
import TripsPage from './pages/trips/TripsPage';
import TripEditForm from './pages/trips/TripEditForm';
import About from './pages/about/About';


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (

    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <PostsPage message="No results. Adjust Search Criteria." />} />
          <Route exact path="/feed" render={() =>
            <PostsPage message="No results. Adjust Search Criteria or Follow A User."
              filter={`owner__followed__owner__profile=${profile_id}&`} />} />
          <Route exact path="/favourites" render={() =>
            <PostsPage message="No results. Adjust Search Criteria or Favourite a Post."
              filter={`favourites__owner__profile=${profile_id}&ordering=-favourites__created_at&`} />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/profiles/:id/" render={() => <ProfilePage />} />
          <Route exact path="/trips/create" render={() => <TripCreateForm />} />
          <Route
            exact path="/trips/mytrips"
            render={() => (
              <TripsPage message='No results. Adjust Search Criteria.'
                filter={`owner__profile=${profile_id}&`} />
            )} />
          <Route exact path="/trips/:id/edit" render={() => <TripEditForm />} />
          <Route exact path="/trips/:id" render={() => <TripPage />} />
          <Route
            exact path="/profiles/:id/edit/username" render={() => <UsernameForm />}
          />
          <Route
            exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />}
          />
          <Route
            exact path="/profiles/:id/edit" render={() => <ProfileEditForm />}
          />
          <Route exact path="/about" render={() => <About />} />
          <Route render={() => <p>Page not found!</p>} />

        </Switch>
      </Container>
    </div>

  );
}

export default App;