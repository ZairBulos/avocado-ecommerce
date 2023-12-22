import { UserRanking } from "../../types/Statistics";

function UserStatistics({
  registeredUsers,
  users,
}: {
  registeredUsers: number;
  users: UserRanking[];
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">User Statistics</h2>

      <div className="bg-brown-400 text-white flex items-center justify-between p-4 rounded-md">
        <h3 className="text-xl font-semibold">New profiles created</h3>
        <p className="text-xl font-semibold">{registeredUsers}</p>
      </div>

      <div className="bg-white p-4 border border-gray-400 rounded-md">
        <h3 className="text-xl font-semibold text-center border-b border-gray-400">
          Top 5 Users
        </h3>
        <ul className="space-y-2 mt-2">
          {users.map((userRanking, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <p>#{idx + 1} {userRanking.user}. {userRanking.purchases} purchases</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserStatistics;
