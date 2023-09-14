import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { JwtPayloadTypes, UserTypes } from "../../../services/data-types";
import jwtDecode from "jwt-decode";

export default function Profile() {
  const [user, setUser] = useState({
    avatar: "",
    name: "",
    email: "",
  });

  const img = process.env.NEXT_PUBLIC_IMAGE;

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: JwtPayloadTypes = jwtDecode(jwtToken);
      const userPayload: UserTypes = payload.player;
      setUser(userPayload);
    }
  }, []);
  return (
    <div className="user text-center pb-50 pe-30">
      <img
        src={`${img}/${user.avatar}`}
        width="90"
        height="90"
        className="img-fluid mb-20 rounded-circle"
        style={{ borderRadius: "100%" }}
      />
      <h2 className="fw-bold text-xl color-palette-1 m-0">{user.name}</h2>
      <p className="color-palette-2 m-0" style={{ fontSize: "13px" }}>
        {user.email}
      </p>
    </div>
  );
}
