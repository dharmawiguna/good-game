import type { Meta, StoryObj } from "@storybook/react";
import GameItem from "../../../../components/molecules/GameItem";

const meta: Meta<typeof GameItem> = {
  title: "Components/Molecules/GameItem",
  component: GameItem,
};
export default meta;
type Story = StoryObj<typeof GameItem>;

export const Default: Story = {
  args: {
    title: "Mobile Legend",
    category: "mobile",
    thumbnail: "/img/Thumbnail-1.png",
  },
};
