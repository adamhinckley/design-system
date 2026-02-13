/// <reference types="@vitest/browser-playwright" />
/// <reference types="@testing-library/jest-dom" />

import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "vitest" {
  interface Assertion<T = unknown> extends TestingLibraryMatchers<T, void> {
    _?: never;
  }
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<
    unknown,
    void
  > {
    _?: never;
  }
}
