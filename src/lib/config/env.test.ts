import { describe, expect, it } from "vitest";
import { appEnv } from "./env";

describe("appEnv", () => {
  it("defaults to singapore values", () => {
    expect(appEnv.currency).toBe("SGD");
    expect(appEnv.locale).toBe("en-SG");
    expect(appEnv.timezone).toBe("Asia/Singapore");
  });
});
