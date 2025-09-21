import { shareProduct } from "@/utils/shareProduct";
import { Platform, Share } from "react-native";

// Mock Share API
jest.mock("react-native", () => ({
  Share: {
    share: jest.fn(),
  },
  Platform: {
    OS: "ios", // default to native
  },
}));

describe("shareProduct (native)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should share product on native platforms", async () => {
    const product = { id: 1, name: "Test Product" };
    await shareProduct(product);
    expect(Share.share).toHaveBeenCalledWith({
      message: expect.stringContaining("ibscart://product/1"),
      title: "Test Product",
    });
  });

  it("should not share if product is undefined", async () => {
    await shareProduct(undefined);
    expect(Share.share).not.toHaveBeenCalled();
  });
});

describe("shareProduct (web)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Platform.OS = "web";
  });

  it("should use navigator.share if available", async () => {
    const mockNavigatorShare = jest.fn();
    // @ts-ignore
    global.navigator.share = mockNavigatorShare;

    const product = { id: 2, name: "Web Product" };
    await shareProduct(product);

    expect(mockNavigatorShare).toHaveBeenCalledWith({
      title: "Web Product",
      text: expect.stringContaining("ibscart://product/2"),
      url: "ibscart://product/2",
    });
  });

  it("should alert if navigator.share is not available", async () => {
    // @ts-ignore
    global.navigator.share = undefined;
    global.alert = jest.fn();

    const product = { id: 3, name: "No Share Support" };
    await shareProduct(product);

    expect(global.alert).toHaveBeenCalledWith("Web sharing is not supported in this browser.");
  });
});
