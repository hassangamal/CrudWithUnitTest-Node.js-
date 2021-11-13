const request = require("supertest");
const { ROLES } = require("../common/enums");
const app = require("../app");
const agent = request.agent(app);
/*
 * Test the /user route
 */
describe("Get user Endpoints", () => {
  it("get users", async () => {
    const res = await agent.get("/api/users");
    expect(res.statusCode).toEqual(200);
  });

  it("get user", async () => {
    const res = await agent.get("/api/user/2");
    expect(res.statusCode).toEqual(200);
  });
});

describe("Post Endpoints", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/user").send({
      userName: "hassan",
      password: "password",
      deposit: 100,
      role: ROLES[0],
    });
    expect(res.statusCode).toEqual(200);
  });

  it("should update a user", async () => {
    const res = await request(app).put("/api/user").send({
      id: 1,
      userName: "hassan",
      password: "password",
      deposit: 100,
      role: ROLES[0],
    });
    expect(res.statusCode).toEqual(200);
  });
});

describe("delete user Endpoints", () => {
  it("delete users", async () => {
    const res = await request(app).delete("/api/user/1");
    expect(res.statusCode).toEqual(200);
  });
});

describe("deposit and reset Endpoints", () => {
  it("should deposit a new user", async () => {
    const res = await request(app).post("/api/deposit").send({
      id: 3,
      deposit: 100,
    });
    expect(res.statusCode).toEqual(200);
  });

  it("should reset deposit for user", async () => {
    const res = await request(app).get("/api/reset/3");
    expect(res.statusCode).toEqual(200);
  });
});

/*
 * Test the /product  route
 */

describe("Get product Endpoints", () => {
  it("get products", async () => {
    const res = await agent.get("/api/products");
    expect(res.statusCode).toEqual(200);
  });

    it("get product", async () => {
      const res = await request(app).get("/api/product/2");
      expect(res.statusCode).toEqual(200);
    });
});

describe("Post Endpoints", () => {
  it("should create a new product", async () => {
    const res = await request(app).post("/api/product").send({
      amountAvailable: 10,
      productName: "t-shirt",
      sellerId: 1,
    });
    expect(res.statusCode).toEqual(200);
  });

  it("should update a product", async () => {
    const res = await request(app).put("/api/product").send({
      id: 2,
      amountAvailable: 10,
      productName: "t-shirt",
      sellerId: 1,
    });
    expect(res.statusCode).toEqual(200);
  });

  describe("delete product Endpoints", () => {
    it("delete products", async () => {
      const res = await request(app).post("/api/deleteProduct").send({
        productId: 2,
        sellerId: 1,
      });
      expect(res.statusCode).toEqual(200);
    });
  });
});

describe("Post Endpoints", () => {
  it("should buy a new product", async () => {
    const res = await request(app).post("/api/buy").send({
      productId: 3,
      amountOfProducts: 2,
    });
    expect(res.statusCode).toEqual(200);
  });
});
