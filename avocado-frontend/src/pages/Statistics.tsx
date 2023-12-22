import Loader from "../components/Loader/Loader";
import ItemStatistics from "../components/Statistics/ItemStatistics";
import UserStatistics from "../components/Statistics/UserStatistics";
import { useStatistics } from "../hooks/useStatistics";

function Statistics() {
  const { registeredUsers, usersRanking, itemsRanking, loading } = useStatistics();

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <section className="flex space-x-24 pt-8">
          <UserStatistics
            registeredUsers={registeredUsers}
            users={usersRanking}
          />
          <ItemStatistics items={itemsRanking} />
        </section>
      )}
    </main>
  );
}

export default Statistics;
