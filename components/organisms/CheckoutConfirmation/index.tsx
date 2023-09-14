import { useState } from "react";
import { SetCheckout } from "../../../services/player";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function CheckoutConfirmation() {
  const [checkbox, setCheckbox] = useState(false);
  const router = useRouter();
  const onSubmit = async () => {
    const dataItemFromLocal = localStorage.getItem("data-item");
    const dataTopupFromLocal = localStorage.getItem("data-topup");

    const dataItem = JSON.parse(dataItemFromLocal!);
    const dataTopup = JSON.parse(dataTopupFromLocal!);

    const data = {
      voucher: dataItem._id,
      nominal: dataTopup.nominalItem._id,
      payment: dataTopup.paymentItem.payment._id,
      bank: dataTopup.paymentItem.bank._id,
      name: dataTopup.bankAccountName,
      accountUser: dataTopup.verifyID,
    };

    const response = await SetCheckout(data);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success("Checkout Successfully!");
      setTimeout(() => router.push("/complete-checkout"), 2500);
    }
  };
  return (
    <>
      <label className="checkbox-label text-lg color-palette-1">
        I have transferred the money
        <input
          type="checkbox"
          checked={checkbox}
          onChange={() => setCheckbox(!checkbox)}
        />
        <span className="checkmark"></span>
      </label>
      <div className="d-md-block d-flex flex-column w-100 pt-50">
        <button
          className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
          type="button"
          onClick={onSubmit}
          disabled={!checkbox}
        >
          Confirm Payment
        </button>
      </div>
    </>
  );
}
