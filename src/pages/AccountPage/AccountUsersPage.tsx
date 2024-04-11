import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, updateUser } from "../../api/accountApi";
import { updateUserProfile } from "../../features/accountManagement/accountSlice";
import { User } from "../../types";
import { AppDispatch, RootState } from "../../app/store";

const AccountUsersPage = () => {
  const { userInfo } = useSelector((state: RootState) => state.account);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [position, setPosition] = useState("");
  const [team, setTeam] = useState<number | null>(null);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await fetchAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleEditClick = (user: User) => {
    setEditUserId(user.id);
    setPosition(user.position || "");
    setTeam(user.team ?? null);
    console.log(user);
  };

  const handleUpdateProfile = async () => {
    if (editUserId === null) return;

    // 'position'을 'role'로 변경
    const updatedInfo = { role: position, team: team };

    try {
      await dispatch(
        updateUserProfile({ userId: editUserId, userInfo: updatedInfo })
      ).unwrap();
      alert("Profile updated successfully!");
      setEditUserId(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ cursor: "pointer" }}>
            {user.name} {user.team}팀 {user.role}
            <button onClick={() => handleEditClick(user)}>Edit</button>
          </li>
        ))}
      </ul>
      {editUserId && (
        <div>
          <label>
            직책:
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </label>
          <label>
            팀:
            <input
              type="number"
              value={team === null ? "" : team}
              onChange={(e) =>
                setTeam(e.target.value === "" ? null : Number(e.target.value))
              }
            />
          </label>
          <button onClick={handleUpdateProfile}>Update Profile</button>
        </div>
      )}
    </div>
  );
};

export default AccountUsersPage;
