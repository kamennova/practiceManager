import { DeviceSize } from "./components/basic/adaptive/query";

export const Font = {
    Small: {
      [DeviceSize.Small]: 13,
      [DeviceSize.Medium]: 14,
      [DeviceSize.Big]: 16,
    },
    Normal: {
        [DeviceSize.Small]: 13,
        [DeviceSize.Medium]: 14,
        [DeviceSize.Big]: 16,
    },
    Medium: {
        [DeviceSize.Small]: 16,
        [DeviceSize.Medium]: 17,
        [DeviceSize.Big]: 21,
    },
    Big: {
        [DeviceSize.Small]: 18,
        [DeviceSize.Medium]: 20,
        [DeviceSize.Big]: 24,
    },
    Largest: {
        [DeviceSize.Small]: 22,
        [DeviceSize.Medium]: 32,
        [DeviceSize.Big]: 52,
    }
};
