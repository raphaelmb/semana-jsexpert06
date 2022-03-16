import { jest, expect, describe, test, beforeEach } from "@jest/globals";
import TestUtil from "../_util/testUtil.js";
import { Controller } from "../../../server/controller.js";
import { Service } from "../../../server/service.js";

describe("#Controller - test suite for API Controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test("#getFileStream", async () => {
    const mockFileStream = TestUtil.generateReadableStream(["test"]);
    const expectedType = ".html";
    const mockFileName = "test.html";

    jest
      .spyOn(Service.prototype, Service.prototype.getFileStream.name)
      .mockResolvedValue({ stream: mockFileStream, type: expectedType });

    const controller = new Controller();
    const { stream, type } = await controller.getFileStream(mockFileName);

    expect(stream).toStrictEqual(mockFileStream);
    expect(type).toStrictEqual(expectedType);
  });
});
