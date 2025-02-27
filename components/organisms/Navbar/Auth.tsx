import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { JwtPayloadTypes, UserTypes } from "../../../services/data-types";

export default function Auth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    avatar: "",
  });
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: JwtPayloadTypes = jwtDecode(jwtToken);
      const userPayload: UserTypes = payload.player;
      const img = process.env.NEXT_PUBLIC_IMAGE;
      user.avatar = `${img}/${userPayload.avatar}`;
      setIsLogin(true);
      setUser(user);
    }
  }, []);

  const onLogout = () => {
    Cookies.remove("token");
    // setIsLogin(false);
    toast.success("Logout Successfully!");
    setTimeout(() => window.location.reload(), 3000);
  };
  if (isLogin) {
    return (
      <>
        <li className="nav-item my-auto dropdown d-flex">
          <div className="vertical-line d-lg-block d-none"></div>
          <div>
            <a
              className="dropdown-toggle ms-lg-40"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={user.avatar}
                className="rounded-circle"
                width="40"
                height="40"
                alt=""
              />
            </a>

            <ul
              className="dropdown-menu border-0"
              aria-labelledby="dropdownMenuLink"
            >
              <li>
                <Link
                  className="dropdown-item text-lg color-palette-2"
                  href="/member"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item text-lg color-palette-2"
                  href="#"
                >
                  Wallet
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item text-lg color-palette-2"
                  href="member/edit-profile"
                >
                  Account Settings
                </Link>
              </li>
              <li onClick={onLogout}>
                <a className="dropdown-item text-lg color-palette-2">Log Out</a>
              </li>
            </ul>
          </div>
        </li>
      </>
    );
  }
  return (
    <>
      <li className="nav-item my-auto">
        <Link
          href="/sign-in"
          className="btn btn-sign-in d-flex justify-content-center ms-lg-2 rounded-pill"
          role="button"
        >
          Sign In
        </Link>
      </li>
    </>
  );
}
