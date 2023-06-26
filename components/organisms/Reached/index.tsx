import ReachedItem from "../../molecules/ReachedItem";
import LineItem from "./LineItem";

export default function Reached() {
  return (
    <section className="reached pt-50 pb-50">
      <div className="container-fluid">
        <div className="d-flex flex-lg-row flex-column align-items-center justify-content-center gap-lg-0 gap-4">
          <ReachedItem result="290M+" desc="Players Top Up" />
          <LineItem />
          <ReachedItem result="12.500" desc="Games Available" />
          <LineItem />
          <ReachedItem result="99,9%" desc="Happy Players" />
          <LineItem />
          <ReachedItem result="4.7" desc="Rating Worldwide" />
        </div>
      </div>
    </section>
  );
}
