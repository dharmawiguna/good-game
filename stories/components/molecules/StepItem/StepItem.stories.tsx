// CARA 1
import type { Meta, StoryObj } from "@storybook/react";
import StepItem from "../../../../components/molecules/StepItem";

const meta: Meta<typeof StepItem> = {
  title: "Components/Molecules/StepItem",
  component: StepItem,
};
export default meta;
type Story = StoryObj<typeof StepItem>;

export const Default: Story = {
  args: {
    title: "1. Start",
    icon: "step1",
    desc1: "Pilih salah satu game",
    desc2: "yang ingin kamu top up",
  },
};

// CARA 2

// import { Meta, Story } from "@storybook/react";
// import StepItem, {
//   StepItemProps,
// } from "../../../../components/molecules/StepItem";

// export default {
//   title: "Components/Molecules/StepItem",
//   component: StepItem,
// } as Meta;

// // const Template = (args: StepItemProps) => <StepItem {...args} />;
// const Template: Story<StepItemProps> = (args) => <StepItem {...args} />;

// export const Default = Template.bind({});
// Default.args = {
//   title: "1. Start",
//   icon: "step1",
//   desc1: "Pilih salah satu game",
//   desc2: "yang ingin kamu top up",
// };
