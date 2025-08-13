import type { Meta, StoryObj } from "@storybook/nextjs";
import React, { useEffect } from "react";
import WigglyRigPro, { WigglyRigProProps } from "./WigglyRigPro";

const meta: Meta<WigglyRigProProps> = {
  title: "Wiggly/WigglyRigPro",
  component: WigglyRigPro,
  args: {
    size: 160,
    idle: true,
    colorRig: "#2b2f36",
    colorOil: "#0b0b0b",
    droplets: 14,
    // physics defaults
    angleCenterDeg: -90,
    angleSpreadDeg: 40,
    powerMin: 60,
    powerMax: 120,
    sizeMin: 3,
    sizeMax: 8,
    durationMin: 650,
    durationMax: 1200,
    delayMax: 120,
    forceReducedMotion: null,
  },
  argTypes: {
    size: { control: { type: "range", min: 100, max: 240, step: 2 } },
    idle: { control: "boolean" },
    colorRig: { control: "color" },
    colorOil: { control: "color" },
    droplets: { control: { type: "range", min: 1, max: 48, step: 1 } },
    angleCenterDeg: {
      control: { type: "range", min: -135, max: -45, step: 1 },
    },
    angleSpreadDeg: { control: { type: "range", min: 0, max: 140, step: 1 } },
    powerMin: { control: { type: "range", min: 10, max: 200, step: 1 } },
    powerMax: { control: { type: "range", min: 10, max: 300, step: 1 } },
    sizeMin: { control: { type: "range", min: 1, max: 20, step: 1 } },
    sizeMax: { control: { type: "range", min: 1, max: 24, step: 1 } },
    durationMin: { control: { type: "range", min: 120, max: 2000, step: 10 } },
    durationMax: { control: { type: "range", min: 120, max: 3000, step: 10 } },
    delayMax: { control: { type: "range", min: 0, max: 1000, step: 10 } },
    forceReducedMotion: {
      control: { type: "radio" },
      options: [null, true, false],
      mapping: { "null (system)": null, true: true, false: false },
      labels: {
        null: "system",
        true: "force reduce",
        false: "force motion",
      },
    },
  },
};

export default meta;

type Story = StoryObj<WigglyRigProProps>;

export const Playground: Story = {};

export const AutoEruptEverySecond: Story = {
  render: (args) => <AutoEruptWrapper {...args} />,
  args: { idle: false },
};

function AutoEruptWrapper(args: WigglyRigProProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current?.querySelector("button");
    if (!el) return;
    const id = window.setInterval(
      () => (el as HTMLButtonElement).click(),
      1000
    );
    return () => window.clearInterval(id);
  }, []);
  return (
    <div ref={ref}>
      <WigglyRigPro {...args} />
    </div>
  );
}
