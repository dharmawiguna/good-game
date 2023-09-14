import OverviewContent from "../../components/organisms/OverviewContent";
import Sidebar from "../../components/organisms/Sidebar";
import { JwtPayloadTypes, UserTypes } from "../../services/data-types";
import jwtDecode from "jwt-decode";

export default function Member() {
  return (
    <>
      <section className="overview overflow-auto">
        <Sidebar activeMenu="overview" />
        <OverviewContent />
      </section>
    </>
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
