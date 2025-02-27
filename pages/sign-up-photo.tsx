import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { setSignUp } from "../services/auth";
import { GetGameCategory } from "../services/player";
import { CategoryTypes } from "../services/data-types";

export default function SignUpPhoto() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [favorite, setFavorite] = useState("");
  const [image, setImage] = useState<any>("");
  const [imagePreview, setImagePreview] = useState<any>("/icon/upload.svg");
  const [localForm, setLocalForm] = useState({
    name: "",
    email: "",
  });

  const getGameCategoryAPI = useCallback(async () => {
    const data = await GetGameCategory();
    setCategories(data.data);
    setFavorite(data.data[0]._id);
  }, [GetGameCategory]);

  useEffect(() => {
    getGameCategoryAPI();
  }, []);

  useEffect(() => {
    const getLocalForm = localStorage.getItem("user-form");
    setLocalForm(JSON.parse(getLocalForm!));
  }, []);

  const onSubmit = async () => {
    const getLocalForm = await localStorage.getItem("user-form");
    const userForm = JSON.parse(getLocalForm!);

    const data = new FormData();

    data.append("image", image);
    data.append("email", userForm.email);
    data.append("name", userForm.name);
    data.append("password", userForm.password);
    data.append("username", userForm.name);
    data.append("phoneNumber", "08123471982");
    data.append("role", "user");
    data.append("status", "Y");
    data.append("favorite", favorite);

    const result = await setSignUp(data);
    if (result?.error) {
      toast.error(result.message);
    } else {
      toast.success("Register Succesfully!");
      localStorage.removeItem("user-form");
      setTimeout(() => router.push("/sign-up-success"), 2500);
    }
  };
  return (
    <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
      <div className="container mx-auto">
        <form action="">
          <div className="form-input d-md-block d-flex flex-column">
            <div>
              <div className="mb-20">
                <div className="image-upload text-center">
                  <label htmlFor="avatar">
                    <Image
                      src={imagePreview}
                      alt="upload"
                      width={120}
                      height={120}
                      style={{
                        objectFit: "cover",
                        borderRadius: "100%",
                      }}
                    />
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      const img = event?.target?.files![0];
                      setImagePreview(URL.createObjectURL(img));
                      setImage(img);
                    }}
                  />
                </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">
                {localForm?.name}
              </h2>
              <p className="text-lg text-center color-palette-1 m-0">
                {localForm?.email}
              </p>
              <div className="pt-50 pb-50">
                <label
                  htmlFor="category"
                  className="form-label text-lg fw-medium color-palette-1 mb-10"
                >
                  Favorite Game
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-select d-block w-100 rounded-pill text-lg"
                  aria-label="Favorite Game"
                  value={favorite}
                  onChange={(event) => setFavorite(event.target.value)}
                >
                  {categories.map((category: CategoryTypes) => {
                    return (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="button-group d-flex flex-column mx-auto">
              <button
                type="button"
                className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                onClick={onSubmit}
              >
                Create My Account
              </button>
              <a
                href="/sign-up"
                className="btn btn-back fw-medium text-lg text-white rounded-pill mb-16"
                role="button"
              >
                Back
              </a>
              {/* <!-- <button type="submit" className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                            role="button">Create My Account</button> --> */}
              <a
                className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15"
                href="#"
                role="button"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
