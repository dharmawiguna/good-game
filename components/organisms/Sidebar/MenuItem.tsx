import cx from "classnames";
import Image from "next/image";
import React from "react";

interface MenuItemProps {
  title: string;
  icon:
    | "ic-menu-overview"
    | "ic-menu-transactions"
    | "ic-menu-card"
    | "ic-menu-messages"
    | "ic-menu-rewards"
    | "ic-menu-settings"
    | "ic-menu-logout";
  active?: boolean;
}
export default function MenuItem(props: Partial<MenuItemProps>) {
  const { title, icon, active } = props;
  const classItem = cx({
    item: true,
    "mb-30": true,
    active: active,
  });

  return (
    <div className={classItem}>
      <div className="me-3">
        <Image
          src={`/icon/${icon}.svg`}
          alt="overview"
          width={25}
          height={25}
        />
      </div>
      <p className="item-title m-0">
        <a href="" className="text-lg text-decoration-none">
          {title}
        </a>
      </p>
    </div>
  );
}
