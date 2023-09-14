import jwtDecode from "jwt-decode";
import TransactionDetailContent from "../../../components/organisms/TransactionDetailContent";
import {
  HistoryTransactionTypes,
  JwtPayloadTypes,
  UserTypes,
} from "../../../services/data-types";
import { getMemberTransactionDetail } from "../../../services/member";

interface TransactionDetailProps {
  transactionDetail: HistoryTransactionTypes;
}
export default function TransactionDetail(props: TransactionDetailProps) {
  const { transactionDetail } = props;

  return (
    <section className="transactions-detail overflow-auto">
      <TransactionDetailContent data={transactionDetail} />
    </section>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
  params: {
    idTrx: string;
  };
}
export async function getServerSideProps({ req, params }: GetServerSideProps) {
  const { token } = req.cookies;
  const { idTrx } = params;
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
  const response = await getMemberTransactionDetail(idTrx, jwtToken);
  return {
    props: {
      transactionDetail: response.data,
    },
  };
}
