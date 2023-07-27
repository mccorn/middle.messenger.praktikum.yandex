import { expect } from "chai";


describe("Typescript + Babel usage suite", () => {
  it("should return string incorrectly", () => {
    expect(5).to.be.equal(15)
  });

	it("should return string correctly", () => {
    expect(5).to.be.equal(5)
  });
});
