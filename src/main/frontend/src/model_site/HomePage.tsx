import { useUser } from '../UserProvider';

function HomePage() {
  const sessionUser = useUser();
  return (
    <>
      <h1>Hello {sessionUser?.userName ?? 'stranger'}!</h1>
    </>
  );
}

export default HomePage;
