import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import { addLocation } from "../firebase/database";
import { useState } from "react";
import { app } from "../../firebase";
import { getAuth } from "firebase/auth";

const RegisterLocation = () => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const auth = getAuth(app);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleChangeLocation = (event) => {
    setLocation(event.currentTarget.value);
  };
  const onSubmit = () => {
    addLocation(user.uid, location);
    navigate(`/${auth.currentUser.uid}`);
    reset();
  };

  if (!user) {
    return <Navigate to="/signin" />;
  } else {
    return (
      <div>
        <h1>地点登録</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>登録地点 (住所可)</label>
            <input
              {...register("location", {
                required: {
                  value: true,
                  message: "登録したい地点を入力してください",
                },
              })}
              name="location"
              placeholder="location"
              onChange={(event) => handleChangeLocation(event)}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div>
            <button type="submit">登録</button>
          </div>
        </form>
      </div>
    );
  }
};

export { RegisterLocation };
