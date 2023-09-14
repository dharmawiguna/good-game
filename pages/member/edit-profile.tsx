import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import Input from "../../components/atoms/Input";
import Sidebar from "../../components/organisms/Sidebar";
import { JwtPayloadTypes, UserTypes } from "../../services/data-types";
import jwtDecode from "jwt-decode";
import { setUpdateProfile } from "../../services/member";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface UserStateProps {
  id: string;
  name: string;
  email: string;
  avatar: any;
  image: any;
}
export default function EditProfile() {
  const [user, setUser] = useState<UserStateProps>({
    email: "",
    name: "",
    image: "",
    avatar: "",
    id: "",
  });

  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<any>(null);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: JwtPayloadTypes = jwtDecode(jwtToken);
      const userPayload: UserTypes = payload.player;
      setUser(userPayload);
    }
  }, []);
  const img = process.env.NEXT_PUBLIC_IMAGE;

  const onSubmit = async () => {
    const data = new FormData();

    data.append("image", user.image);
    data.append("name", user.name);
    const response = await setUpdateProfile(data, user.id);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success("Update Profile Successfully!");
      Cookies.remove("token");
      setTimeout(() => router.push("/sign-in"), 2500);
    }
  };

  return (
    <section className="edit-profile overflow-auto">
      <Sidebar activeMenu="settings" />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form action="">
              <div className="photo d-flex">
                <div className="image-upload">
                  <label htmlFor="avatar">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt=""
                        width={90}
                        height={90}
                        style={{ borderRadius: "100%" }}
                      />
                    ) : (
                      <Image
                        src={`${img}/${user.avatar}`}
                        alt=""
                        width={90}
                        height={90}
                        style={{ borderRadius: "100%" }}
                      />
                    )}
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      const img = event?.target?.files![0];
                      setImagePreview(URL.createObjectURL(img));
                      setUser({ ...user, image: img });
                    }}
                  />
                </div>
              </div>
              <div className="pt-30">
                <Input
                  label="Full Name"
                  value={user.name}
                  onChange={(event) =>
                    setUser({ ...user, name: event.target.value })
                  }
                />
              </div>
              <div className="pt-30">
                <Input label="Email Address" value={user.email} disabled />
              </div>
              {/* <div className="pt-30">
                <Input label="Phone Number" />
              </div> */}
              <div className="button-group d-flex flex-column pt-50">
                <button
                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                  type="button"
                  onClick={onSubmit}
                >
                  Save My Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, "base64").toString("ascii");
  const payload: JwtPayloadTypes = jwtDecode(jwtToken);
  const userPayload: UserTypes = payload.player;
  const img = process.env.NEXT_PUBLIC_IMAGE;
  userPayload.avatar = `${img}/${userPayload.avatar}`;
  return {
    props: {
      user: userPayload,
    },
  };
}
